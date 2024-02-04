export interface Reason {
  reason: string;
}

export type ValidationResult<T> = {
  isValid: true;
  result: T;
  reasons: [],
} | {
  isValid: false,
  result: undefined,
  reasons: Reason[];
};

export function validate<T>(obj: any, is: (obj: any) => Reason[]): ValidationResult<T> {
  const reasons = is(obj);
  if (reasons.length) {
    return {
      isValid: false,
      result: undefined,
      reasons,
    };
  }

  return {
    isValid: true,
    result: obj,
    reasons: [],
  };
}
