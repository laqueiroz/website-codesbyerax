import { NextResponse } from "next/server";

import { isMailerConfigured, sendMail } from "@/lib/mailer";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import {
  escapeHtml,
  isValidEmail,
  LIMITS,
  sanitizeHeaderValue,
  sanitizeText,
} from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RATE_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 };

/**
 * Lista fechada de campos aceitos. Qualquer outra chave enviada no corpo é
 * descartada — antes, todo campo recebido ia parar no e-mail sem limite.
 */
const FIELDS = {
  name: { label: "Nome", max: LIMITS.name.max, multiline: false },
  email: { label: "E-mail", max: LIMITS.email.max, multiline: false },
  role: { label: "Perfil", max: 120, multiline: false },
  version: { label: "Versão", max: 60, multiline: false },
  rating: { label: "Avaliação", max: 120, multiline: false },
  useful: { label: "Recurso mais útil", max: 120, multiline: false },
  problem: { label: "Problema encontrado", max: 3000, multiline: true },
  improve: { label: "O que melhorar", max: 3000, multiline: true },
  consent: { label: "Consentimento", max: 200, multiline: false },
} as const;

type FeedbackField = keyof typeof FIELDS;

export async function POST(request: Request) {
  const limit = rateLimit(clientKey(request, "feedback"), RATE_LIMIT);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, reason: "rate-limited" },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let raw: Record<string, unknown>;
  try {
    const parsed: unknown = await request.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
    raw = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid-json" }, { status: 400 });
  }

  // Honeypot: responde 200 sem enviar nada.
  if (typeof raw.website === "string" && raw.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  // Valores que não são texto viram "" (antes, um número derrubava escapeHtml).
  const value = {} as Record<FeedbackField, string>;
  for (const key of Object.keys(FIELDS) as FeedbackField[]) {
    const { max, multiline } = FIELDS[key];
    value[key] = multiline ? sanitizeText(raw[key], max) : sanitizeHeaderValue(raw[key], max);
  }
  value.email = value.email.toLowerCase();

  const errors: Partial<Record<FeedbackField, string>> = {};
  if (value.name.length < LIMITS.name.min) errors.name = "Informe seu nome.";
  if (!isValidEmail(value.email)) errors.email = "E-mail inválido.";
  if (value.improve.length < 2) errors.improve = "Conte o que podemos melhorar.";
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  if (!isMailerConfigured()) {
    console.warn(
      "[feedback] Envio bloqueado: defina RESEND_API_KEY, CONTACT_TO_EMAIL e CONTACT_FROM_EMAIL.",
    );
    return NextResponse.json({ ok: false, reason: "not-configured" }, { status: 503 });
  }

  const entries = (Object.keys(FIELDS) as FeedbackField[])
    .filter((key) => value[key])
    .map((key) => [FIELDS[key].label, value[key]] as const);

  const result = await sendMail({
    subject: "[Feedback] Vínculo Tutoria",
    replyTo: value.email,
    text: entries.map(([label, text]) => `${label}: ${text}`).join("\n"),
    html: `<h2>Feedback do Vínculo Tutoria</h2>${entries
      .map(
        ([label, text]) =>
          `<p><strong>${escapeHtml(label)}:</strong> <span style="white-space:pre-wrap">${escapeHtml(text)}</span></p>`,
      )
      .join("")}`,
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, reason: result.reason }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
