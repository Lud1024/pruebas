# Validación de Contraseñas — README

Este documento resume el **enunciado**, las **clases de equivalencia**, los **valores frontera** y, especialmente, la **Tabla de Decisión** para el caso de *Validación de contraseñas*.

---

## Enunciado (resumen)
Una contraseña es **válida** si y solo si:
- Longitud entre **8 y 20** caracteres (inclusive). *(Condición **L**)*
- Contiene **al menos una mayúscula**. *(Condición **U**)*
- Contiene **al menos una minúscula**. *(Condición **l**)*
- Contiene **al menos un dígito**. *(Condición **D**)*

> Regla general: **VÁLIDA ⇔ L ∧ U ∧ l ∧ D**

---

## Clases de Equivalencia (con ejemplos)

- **CE1 — Inválida (Demasiado corta)**: longitud `< 8`  
  - *Ejemplo:* `Abc1234` (7)
- **CE2 — Válida (Longitud 8–20 y cumple composición)**: `8–20` y tiene mayúscula, minúscula y dígito  
  - *Ejemplos:* `Abcdef12` (8), `MiClave2025` (10), `Abcdefghij12345678` (20)
- **CE3 — Inválida (Demasiado larga)**: longitud `> 20`  
  - *Ejemplo:* `Abcdefghij1234567890x` (21)
- **CE4 — Inválida (Falta mayúscula)** dentro de 8–20  
  - *Ejemplo:* `abcdef12`
- **CE5 — Inválida (Falta minúscula)** dentro de 8–20  
  - *Ejemplo:* `ABCDEFG1`
- **CE6 — Inválida (Falta dígito)** dentro de 8–20  
  - *Ejemplo:* `Abcdefgh`
- **CE7 — Inválida (Tipo/ vacío)**: `""`, `null`, `undefined`, `12345`

> **Conjunto mínimo sugerido (por clases)**:  
`Abc1234`, `Abcdef12`, `Abcdefghij1234567890x`, `abcdef12`, `ABCDEFG1`, `Abcdefgh`, `""`

---

## Valores Frontera (longitud)

| Caso | Cadena                       | Long. | Esperado |
|:----:|------------------------------|:-----:|:--------:|
| F-1  | `Abc1234`                    |  7    | Inválida |
| F-2  | `Abcdef12`                   |  8    |  Válida  |
| F-3  | `Abcdef123`                  |  9    |  Válida  |
| F-4  | `Abcdefghij1234567`          |  19   |  Válida  |
| F-5  | `Abcdefghij12345678`         |  20   |  Válida  |
| F-6  | `Abcdefghij1234567890x`      |  21   | Inválida |

*(En los casos válidos de la tabla se asume presencia de mayúscula, minúscula y dígito.)*

---

## Tabla de Decisión (principal)

Condiciones:
- **L** = Longitud entre 8 y 20 (incl.).  
- **U** = Contiene ≥1 mayúscula.  
- **l** = Contiene ≥1 minúscula.  
- **D** = Contiene ≥1 dígito.

> **Regla de decisión**: La contraseña es **VÁLIDA** solo si `L ∧ U ∧ l ∧ D`. De lo contrario, es **INVÁLIDA**.

| #  | L | U | l | D | Resultado  | Ejemplo sugerido                 |
|:--:|:-:|:-:|:-:|:-:|:-----------|:----------------------------------|
| 1  | F | * | * | * | Inválida   | `Abc1234` (7)                    |
| 2  | T | F | * | * | Inválida   | `abcdef12`                       |
| 3  | T | T | F | * | Inválida   | `ABCDEFG1`                       |
| 4  | T | T | T | F | Inválida   | `Abcdefgh`                       |
| 5  | T | T | T | T | **Válida** | `Abcdef12`, `MiClave2025`        |
| 6  | F | F | * | * | Inválida   | `abcd12` (6)                     |
| 7  | F | T | F | * | Inválida   | `ABCDEFG` (7, sin dígito)        |
| 8  | F | T | T | F | Inválida   | `Abcdefg` (7, sin dígito)        |
| 9  | T | F | F | * | Inválida   | `aaaaaa12`                       |
| 10 | T | F | T | F | Inválida   | `abcdeFGH` (sin dígito)          |
| 11 | T | T | F | F | Inválida   | `ABCDEFGH` (sin min. ni dígito)  |
| 12 | F | F | F | * | Inválida   | `abcd` (4)                       |
| 13 | F | F | T | F | Inválida   | `abcdefg` (7)                    |
| 14 | F | T | F | F | Inválida   | `ABCDEFG` (7)                    |
| 15 | F | F | F | F | Inválida   | `""` (0)                       |
| 16 | F | T | T | T | Inválida   | `Abcdefghij1234567890x` (21)     |


