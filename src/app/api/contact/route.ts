import { NextResponse } from "next/server";

import { isMailerConfigured, sendMail } from "@/lib/mailer";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { escapeHtml, validateContact, type ContactInput } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RATE_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 };

export async function POST(request: Request) {
  const limit = rateLimit(clientKey(request, "contact"), RATE_LIMIT);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, reason: "rate-limited" },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let raw: Partial<ContactInput>;
  try {
    raw = (await request.json()) as Partial<ContactInput>;
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid-json" }, { status: 400 });
  }

  if (typeof raw.website === "string" && raw.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const { ok, value, errors } = validateContact(raw);
  if (!ok) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  if (!isMailerConfigured()) {
    console.warn(
      "[contact] Envio bloqueado: defina RESEND_API_KEY, CONTACT_TO_EMAIL e CONTACT_FROM_EMAIL.",
    );
    return NextResponse.json({ ok: false, reason: "not-configured" }, { status: 503 });
  }

  const result = await sendMail({
    subject: `[Contato] ${value.subject}`,
    replyTo: value.email,
    text: [
      `Nome: ${value.name}`,
      `E-mail: ${value.email}`,
      `Assunto: ${value.subject}`,
      "",
      value.message,
    ].join("\n"),
    html: `
      <h2>Nova mensagem pelo site</h2>
      <p><strong>Nome:</strong> ${escapeHtml(value.name)}</p>
      <p><strong>E-mail:</strong> ${escapeHtml(value.email)}</p>
      <p><strong>Assunto:</strong> ${escapeHtml(value.subject)}</p>
      <hr />
      <p style="white-space:pre-wrap">${escapeHtml(value.message)}</p>
    `,
  });

  if (!result.ok) {
    const status = result.reason === "not-configured" ? 503 : 502;
    return NextResponse.json({ ok: false, reason: result.reason }, { status });
  }

  return NextResponse.json({ ok: true });
}
