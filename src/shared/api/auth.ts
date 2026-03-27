import { apiRequest, authenticatedRequest } from './client';

export type RegisterData = {
  username: string;
  email: string;
  password: string;
};

export type LoginData = {
  identifier: string;
  password: string;
};

export type AuthResponse = {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
};

export type User = {
  id: number;
  username: string;
  email: string;
};

export const registerUser = async (data: RegisterData): Promise<AuthResponse> => {
  return apiRequest<AuthResponse>('/auth/local/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  return apiRequest<AuthResponse>('/auth/local', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const getCurrentUser = async (token: string): Promise<User> => {
  return authenticatedRequest<User>('/users/me', token);
};
