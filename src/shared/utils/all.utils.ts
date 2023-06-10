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

export function sizeBetween(value: string | number, min: number, max: number) {
  if (isString(value)) {
    return String(value).length >= min && String(value).length <= max;
  }
  if (isValidNumber(value)) {
    return Number(value) >= min && Number(value) <= max;
  }
  return false;
}

export function isIsoFormat(date: string): boolean {
  const isoDate = new Date(date).toISOString();
  return isoDate === date;
}

export function isValidIsoDate(date: string): boolean {
  return isIsoFormat(date);
}

export function isValidDate(date: string): boolean {
  const now = new Date();
  const dateToCompare = new Date(date);
  if (dateToCompare.toString() === 'Invalid Date') {
    return false;
  }
  const isBeforeNow = dateToCompare < now;
  return isBeforeNow;
}
