type ClassValue = string | number | null | undefined | false | ClassValue[];

/**
 * Concatenador mínimo de classes. Substitui clsx/classnames — a única coisa
 * usada delas aqui é achatar e filtrar valores falsy.
 */
export function cn(...values: ClassValue[]): string {
  const out: string[] = [];

  for (const value of values) {
    if (!value && value !== 0) continue;
    if (Array.isArray(value)) {
      const nested = cn(...value);
      if (nested) out.push(nested);
    } else {
      out.push(String(value));
    }
  }

  return out.join(" ");
}
