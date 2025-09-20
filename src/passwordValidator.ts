// Reglas: longitud 8–20 e incluir ≥1 mayúscula, ≥1 minúscula y ≥1 dígito.

const hasUpper = (s: string) => /[A-Z]/.test(s);
const hasLower = (s: string) => /[a-z]/.test(s);
const hasDigit = (s: string) => /\d/.test(s);

/**
 * Devuelve true si la contraseña es válida:
 * - 8 ≤ length ≤ 20
 * - Al menos 1 mayúscula, 1 minúscula y 1 dígito
 * Nota: aceptamos `unknown` para poder testear entradas no-string en runtime.
 */
export function isValidPassword(pwd: unknown): boolean {
  if (typeof pwd !== 'string') return false;

  const len = pwd.length;
  const L = len >= 8 && len <= 20;
  const U = hasUpper(pwd);
  const l = hasLower(pwd);
  const D = hasDigit(pwd);

  // Tabla de decisión: Válida ⇔ L ∧ U ∧ l ∧ D
  return L && U && l && D;
}
