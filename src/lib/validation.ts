/**
 * Validação compartilhada entre cliente e servidor.
 *
 * Escrita à mão de propósito: as regras cabem em ~150 linhas e evitam somar uma
 * biblioteca de schema ao bundle do navegador só para validar dois formulários.
 * O servidor SEMPRE revalida — o cliente aqui é conveniência, não confiança.
 */

export type FieldErrors<T extends string> = Partial<Record<T, string>>;

export interface ValidationResult<TValue, TField extends string> {
  ok: boolean;
  value: TValue;
  errors: FieldErrors<TField>;
}

const TAB = 0x09;
const LINE_FEED = 0x0a;
const DELETE = 0x7f;

/**
 * Verdadeiro para códigos de controle C0/DEL, exceto tab e quebra de linha —
 * os únicos que um campo de texto multilinha pode legitimamente conter.
 * Nota: carriage return (0x0D) cai aqui, o que já normaliza CRLF para LF.
 */
function isControlChar(code: number): boolean {
  if (code === TAB || code === LINE_FEED) return false;
  return code < 0x20 || code === DELETE;
}

/** Remove caracteres de controle e normaliza espaços em branco. */
export function sanitizeText(input: unknown, maxLength: number): string {
  if (typeof input !== "string") return "";
  let stripped = "";
  for (const char of input) {
    if (!isControlChar(char.codePointAt(0) ?? 0)) stripped += char;
  }
  return stripped.trim().slice(0, maxLength);
}

/**
 * Neutraliza cabeçalhos injetados em campos de uma linha que acabam em
 * assunto/nome de remetente (CRLF injection).
 */
export function sanitizeHeaderValue(input: unknown, maxLength: number): string {
  return sanitizeText(input, maxLength).replace(/[\r\n]+/g, " ");
}

/**
 * Checagem de e-mail deliberadamente conservadora: pega os erros de digitação
 * reais sem rejeitar endereços válidos incomuns. A confirmação de verdade é o
 * e-mail chegar (ou não).
 */
const EMAIL_RE = /^[^\s@,;:<>()[\]\\]+@[^\s@.,;:<>()[\]\\]+(\.[^\s@.,;:<>()[\]\\]+)+$/;

export function isValidEmail(value: string): boolean {
  return value.length <= 254 && EMAIL_RE.test(value);
}

export const LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 254 },
  subject: { min: 3, max: 120 },
  message: { min: 10, max: 2000 },
  waitlistMessage: { max: 600 },
} as const;

// ---------------------------------------------------------------------------
// Lista de espera
// ---------------------------------------------------------------------------

export type WaitlistField = "name" | "email" | "message" | "consent" | "productId";

export interface WaitlistInput {
  productId: string;
  name: string;
  email: string;
  message: string;
  consent: boolean;
  /** Honeypot: preenchido só por bot. */
  website?: string;
}

export function validateWaitlist(
  raw: Partial<WaitlistInput>,
  allowedProductIds: readonly string[],
): ValidationResult<WaitlistInput, WaitlistField> {
  const value: WaitlistInput = {
    productId: sanitizeHeaderValue(raw.productId, 64),
    name: sanitizeHeaderValue(raw.name, LIMITS.name.max),
    email: sanitizeHeaderValue(raw.email, LIMITS.email.max).toLowerCase(),
    message: sanitizeText(raw.message, LIMITS.waitlistMessage.max),
    consent: raw.consent === true,
    website: sanitizeHeaderValue(raw.website, 100),
  };

  const errors: FieldErrors<WaitlistField> = {};

  if (!allowedProductIds.includes(value.productId)) {
    errors.productId = "Produto inválido.";
  }
  if (value.name.length < LIMITS.name.min) {
    errors.name = "Informe seu nome (mínimo 2 caracteres).";
  }
  if (!value.email) {
    errors.email = "Informe seu e-mail.";
  } else if (!isValidEmail(value.email)) {
    errors.email = "Esse e-mail não parece válido.";
  }
  if (value.message.length > LIMITS.waitlistMessage.max) {
    errors.message = `A mensagem pode ter no máximo ${LIMITS.waitlistMessage.max} caracteres.`;
  }
  if (!value.consent) {
    errors.consent = "É necessário concordar em receber as novidades por e-mail.";
  }

  return { ok: Object.keys(errors).length === 0, value, errors };
}

// ---------------------------------------------------------------------------
// Contato
// ---------------------------------------------------------------------------

export type ContactField = "name" | "email" | "subject" | "message";

export interface ContactInput {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string;
}

export function validateContact(
  raw: Partial<ContactInput>,
): ValidationResult<ContactInput, ContactField> {
  const value: ContactInput = {
    name: sanitizeHeaderValue(raw.name, LIMITS.name.max),
    email: sanitizeHeaderValue(raw.email, LIMITS.email.max).toLowerCase(),
    subject: sanitizeHeaderValue(raw.subject, LIMITS.subject.max),
    message: sanitizeText(raw.message, LIMITS.message.max),
    website: sanitizeHeaderValue(raw.website, 100),
  };

  const errors: FieldErrors<ContactField> = {};

  if (value.name.length < LIMITS.name.min) {
    errors.name = "Informe seu nome (mínimo 2 caracteres).";
  }
  if (!value.email) {
    errors.email = "Informe seu e-mail.";
  } else if (!isValidEmail(value.email)) {
    errors.email = "Esse e-mail não parece válido.";
  }
  if (value.subject.length < LIMITS.subject.min) {
    errors.subject = "Informe um assunto (mínimo 3 caracteres).";
  }
  if (value.message.length < LIMITS.message.min) {
    errors.message =
      "Escreva um pouco mais para que possamos ajudar (mínimo 10 caracteres).";
  }

  return { ok: Object.keys(errors).length === 0, value, errors };
}

/** Escapa texto do usuário antes de interpolar no corpo HTML do e-mail. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
