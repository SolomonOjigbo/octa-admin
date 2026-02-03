// utils/getChangedFields.ts
export function getChangedFields<T extends Record<string, any>>(
  original: T,
  updated: T
): Partial<T> {
  const changed: Partial<T> = {};

  (Object.keys(updated) as (keyof T)[]).forEach((key) => {
    if (updated[key] !== original[key]) {
      changed[key] = updated[key];
    }
  });

  return changed;
}
