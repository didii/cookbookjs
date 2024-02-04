export interface ApiError {
  type: string;
  message: string;
  correlationId: string;
  data?: Record<string, any>;
}

export namespace ApiError {
  export function create(apiError: ApiError) {
    return apiError;
  }
}
