import { NextResponse } from "next/server";

import { getProduct, waitlistProductIds } from "@/content/products";
import { isMailerConfigured, sendMail } from "@/lib/mailer";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { escapeHtml, validateWaitlist, type WaitlistInput } from "@/lib/validation";

export const runtime = "nodejs";
/** Nunca deve ser cacheada nem pré-renderizada. */
export const dynamic = "force-dynamic";

const RATE_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 };

export async function POST(request: Request) {
  const limit = rateLimit(clientKey(request, "waitlist"), RATE_LIMIT);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, reason: "rate-limited" },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let raw: Partial<WaitlistInput>;
  try {
    raw = (await request.json()) as Partial<WaitlistInput>;
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid-json" }, { status: 400 });
  }

  // Honeypot: robôs preenchem o campo escondido. Devolve 200 de propósito —
  // um erro explícito ensinaria o robô a contornar a armadilha. Nada é enviado.
  if (typeof raw.website === "string" && raw.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const { ok, value, errors } = validateWaitlist(raw, waitlistProductIds);
  if (!ok) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  // Verificado antes de tentar enviar: assim a resposta distingue
  // "faltou configurar" de "o provedor recusou".
  if (!isMailerConfigured()) {
    console.warn(
      "[waitlist] Envio bloqueado: defina RESEND_API_KEY, CONTACT_TO_EMAIL e CONTACT_FROM_EMAIL.",
    );
    return NextResponse.json({ ok: false, reason: "not-configured" }, { status: 503 });
  }

  const product = getProduct(value.productId);
  const productName = product?.name ?? value.productId;

  const result = await sendMail({
    subject: `[Lista de espera] ${productName} — ${value.name}`,
    replyTo: value.email,
    text: [
      `Produto: ${productName}`,
      `Nome: ${value.name}`,
      `E-mail: ${value.email}`,
      `Consentimento de contato: sim`,
      "",
      value.message || "(sem mensagem)",
    ].join("\n"),
    html: `
      <h2>Nova inscrição na lista de espera</h2>
      <p><strong>Produto:</strong> ${escapeHtml(productName)}</p>
      <p><strong>Nome:</strong> ${escapeHtml(value.name)}</p>
      <p><strong>E-mail:</strong> ${escapeHtml(value.email)}</p>
      <p><strong>Consentimento de contato:</strong> sim</p>
      <hr />
      <p style="white-space:pre-wrap">${escapeHtml(value.message || "(sem mensagem)")}</p>
    `,
  });

  if (!result.ok) {
    const status = result.reason === "not-configured" ? 503 : 502;
    return NextResponse.json({ ok: false, reason: result.reason }, { status });
  }

  return NextResponse.json({ ok: true });
}
