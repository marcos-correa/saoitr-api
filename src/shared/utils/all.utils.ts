export function hasAllKeysOfType<T, K extends keyof T>(
  obj: Record<string, any>,
  keys: K[],
): obj is Record<K, T[K]> {
  for (const key of keys) {
    if (!(key in obj)) {
      return false;
    }
  }
  return true;
}

export function isValidNumber(number: any): boolean {
  let _number = Number(number);
  if (isNaN(_number)) {
    return false;
  }
  return true;
}

export function isString(value: any): boolean {
  return typeof value === 'string';
}

export function sizeBetween(value: string, min: number, max: number) {
  return value.length >= min && value.length <= max;
}
