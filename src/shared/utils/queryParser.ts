export function parseNumberParam(
  value: string | undefined,
  defaultValue?: number
): number | undefined {
  if (!value) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
}

export function parseArrayParam<T extends string>(value: T | T[] | undefined): T[] {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  // Handle comma-separated values
  return value.split(',').filter(Boolean) as T[];
}
