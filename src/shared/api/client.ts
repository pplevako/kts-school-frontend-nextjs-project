import { API_BASE } from '@/config/api';

export class ApiRequestError extends Error {
  url: string;
  status?: number;

  constructor(message: string, url: string, status?: number) {
    super(message);
    this.name = 'ApiRequestError';
    this.url = url;
    this.status = status;
  }
}

export async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${endpoint}`;

  const response = await fetch(url, {
    next: { revalidate: 60 },
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new ApiRequestError(
      `API request failed: ${response.status} ${response.statusText}`,
      url,
      response.status
    );
  }

  return await response.json();
}
