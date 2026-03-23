const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

export class ApiError extends Error {
  status: number;
  fieldErrors?: Record<string, string[]>;

  constructor(status: number, message: string, fieldErrors?: Record<string, string[]>) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

interface RequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  body?: unknown;
  params?: Record<string, string | number | boolean | undefined>;
  headers?: Record<string, string>;
  isMultipart?: boolean;
}

export async function apiClient<T>(config: RequestConfig): Promise<T> {
  const { method, path, body, params, headers = {}, isMultipart } = config;

  const url = new URL(path, BASE_URL || window.location.origin);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, String(value));
      }
    });
  }

  const token = localStorage.getItem('app_access_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const clienteId = localStorage.getItem('cliente_id');
  if (clienteId) {
    headers['X-Cliente-Id'] = clienteId;
  }

  if (!isMultipart && body) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(url.toString(), {
    method,
    headers,
    body: isMultipart ? (body as FormData) : body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('app_access_token');
      localStorage.removeItem('access_token');
      window.dispatchEvent(new CustomEvent('auth:logout'));
    }

    let message = 'Erro na requisição';
    let fieldErrors: Record<string, string[]> | undefined;

    try {
      const errorBody = await response.json();
      message = errorBody.message || errorBody.erro || message;
      fieldErrors = errorBody.fieldErrors || errorBody.errors;
    } catch {
      // response sem JSON
    }

    throw new ApiError(response.status, message, fieldErrors);
  }

  if (response.status === 204 || response.headers.get('content-length') === '0') {
    return undefined as T;
  }

  return response.json();
}
