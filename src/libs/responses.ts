export function success({
  status,
  message,
  data,
}: {
  status?: number;
  message?: string;
  data?: object;
}) {
  return {
    status: status || 200,
    message: message || "Success: The operation was completed successfully.",
    data: data || {},
  };
}

export function error({
  status,
  message,
  data,
}: {
  status?: number;
  message?: string;
  data?: unknown;
}) {
  return {
    status: status || 500,
    message: message || "Oops! Something went wrong. Please try again later.",
    error: data || {},
  };
}
