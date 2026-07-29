/**
 * Rate limiting básico, em memória.
 *
 * Escopo honesto: uma janela deslizante por instância do servidor. Isso segura
 * envio repetido e scripts ingênuos, que é o problema real de um formulário de
 * contato. NÃO é proteção distribuída — em várias instâncias (Vercel escala
 * horizontalmente) cada uma mantém seu próprio contador.
 *
 * Se o volume de spam justificar, troque por um store compartilhado
 * (Upstash Redis / Vercel KV) mantendo esta mesma assinatura.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

/** Evita crescimento ilimitado do Map em processos de vida longa. */
const MAX_BUCKETS = 5000;

export interface RateLimitOptions {
  /** Requisições permitidas dentro da janela. */
  limit: number;
  /** Duração da janela em milissegundos. */
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  /** Segundos até a janela reabrir. */
  retryAfter: number;
}

export function rateLimit(
  key: string,
  { limit, windowMs }: RateLimitOptions,
): RateLimitResult {
  const now = Date.now();

  if (buckets.size > MAX_BUCKETS) {
    for (const [bucketKey, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(bucketKey);
    }
  }

  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, retryAfter: 0 };
  }

  if (existing.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfter: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  return {
    allowed: true,
    remaining: limit - existing.count,
    retryAfter: 0,
  };
}

/**
 * Melhor identificador disponível para o cliente. Cabeçalhos de proxy são
 * falsificáveis, por isso servem apenas como chave de throttling — nunca como
 * autenticação.
 */
export function clientKey(request: Request, scope: string): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  return `${scope}:${ip}`;
}

/** Apenas para testes: zera o estado entre casos. */
export function __resetRateLimit(): void {
  buckets.clear();
}
