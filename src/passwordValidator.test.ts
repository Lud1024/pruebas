import { isValidPassword } from './passwordValidator';

// === Clases de equivalencia (y ejemplos) ===
test('CE1: Demasiado corta (<8)', () => {
  expect(isValidPassword('Abc1234')).toBe(false); // 7
});

test('CE2: Válida (8–20 y cumple composición)', () => {
  expect(isValidPassword('Abcdef12')).toBe(true);              // 8
  expect(isValidPassword('MiClave2025')).toBe(true);           // 10
  expect(isValidPassword('Abcdefghij1234567890')).toBe(true);  // 20
});

test('CE3: Demasiado larga (>20)', () => {
  expect(isValidPassword('Abcdefghij1234567890x')).toBe(false); // 21
});

test('CE4: Falta mayúscula (8–20)', () => {
  expect(isValidPassword('abcdef12')).toBe(false);
});

test('CE5: Falta minúscula (8–20)', () => {
  expect(isValidPassword('ABCDEFG1')).toBe(false);
});

test('CE6: Falta dígito (8–20)', () => {
  expect(isValidPassword('Abcdefgh')).toBe(false);
});

test('CE7: Tipo/ vacío', () => {
  expect(isValidPassword('')).toBe(false);
  // Casts para simular inputs no-string y evitar warnings del compilador
  expect(isValidPassword(null as unknown as any)).toBe(false);
  expect(isValidPassword(12345678 as unknown as any)).toBe(false);
});

// === Valores frontera (longitud) ===
test('Frontera 7 → Inválida', () => {
  expect(isValidPassword('Abc1234')).toBe(false);
});
test('Frontera 8 → Válida', () => {
  expect(isValidPassword('Abcdef12')).toBe(true);
});
test('Frontera 9 → Válida', () => {
  expect(isValidPassword('Abcdef123')).toBe(true);
});
test('Frontera 19 → Válida', () => {
  expect(isValidPassword('Abcdefghij123456789')).toBe(true); // 19
});
test('Frontera 20 → Válida', () => {
  expect(isValidPassword('Abcdefghij1234567890')).toBe(true); // 20
});
test('Frontera 21 → Inválida', () => {
  expect(isValidPassword('Abcdefghij1234567890x')).toBe(false); // 21
});

// === Reglas clave de la tabla de decisión ===
test('L = F (corta) ⇒ Inválida', () => {
  expect(isValidPassword('Abc1234')).toBe(false); // 7
});
test('U = F ⇒ Inválida', () => {
  expect(isValidPassword('abcdef12')).toBe(false);
});
test('l = F ⇒ Inválida', () => {
  expect(isValidPassword('ABCDEFG1')).toBe(false);
});
test('D = F ⇒ Inválida', () => {
  expect(isValidPassword('Abcdefgh')).toBe(false);
});
test('L ∧ U ∧ l ∧ D = T ⇒ Válida', () => {
  expect(isValidPassword('MiClave2025')).toBe(true);
});
test('Longitud >20 (L = F) con resto T ⇒ Inválida', () => {
  expect(isValidPassword('Abcdefghij1234567890x')).toBe(false);
});
