interface TryParseIntOptions {
  allowNaN?: boolean;
  allowInf?: boolean;
}

export function tryParseInt(str: string, {allowNaN, allowInf}: TryParseIntOptions = {}): {success: boolean, value: number} {
  if (!str) {
    return {success: false, value: 0};
  }
  const parsed = parseInt(str);
  let success = true;
  if (!allowNaN && isNaN(parsed)) {
    success = false;
  }
  if (!allowInf && !isFinite(parsed)) {
    success = false;
  }

  return {
    success: success,
    value: parsed,
  }
}
