import "server-only";

import { Resend } from "resend";

/**
 * Envio de e-mail transacional via Resend.
 *
 * Regra central: nada é simulado. Se as credenciais faltarem, `sendMail`
 * devolve `{ ok: false, reason: "not-configured" }` e a rota responde 503 com
 * uma mensagem de configuração pendente. Em nenhum caminho um envio não
 * realizado é apresentado ao visitante como concluído.
 */

export interface MailerConfig {
  apiKey: string;
  to: string;
  from: string;
}

export type SendResult =
  | { ok: true; id: string | null }
  | { ok: false; reason: "not-configured" | "provider-error" };

export function getMailerConfig(): MailerConfig | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();

  if (!apiKey || !to || !from) return null;
  return { apiKey, to, from };
}

export function isMailerConfigured(): boolean {
  return getMailerConfig() !== null;
}

export interface MailPayload {
  subject: string;
  html: string;
  text: string;
  /** Endereço do visitante, usado só como Reply-To. */
  replyTo?: string;
}

export async function sendMail(payload: MailPayload): Promise<SendResult> {
  const config = getMailerConfig();
  if (!config) return { ok: false, reason: "not-configured" };

  try {
    const resend = new Resend(config.apiKey);
    const { data, error } = await resend.emails.send({
      from: config.from,
      to: [config.to],
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
      ...(payload.replyTo ? { replyTo: payload.replyTo } : {}),
    });

    if (error) {
      // Detalhe do provedor fica no log do servidor; o visitante vê só o genérico.
      console.error("[mailer] Resend recusou o envio:", error);
      return { ok: false, reason: "provider-error" };
    }

    return { ok: true, id: data?.id ?? null };
  } catch (error) {
    console.error("[mailer] Falha inesperada no envio:", error);
    return { ok: false, reason: "provider-error" };
  }
}
