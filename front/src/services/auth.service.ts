import type { LoginResponse, NewUserPayload, NewUserResponse, ApiError } from '../types/types';

const API_URL = 'http://localhost:4000/api/auth';

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      const error = data as ApiError;
      throw new Error(error.message || 'Error en la autenticación');
    }

    return data as LoginResponse;
  },

  createNewUser: async (
    payload: NewUserPayload,
    token: string | null,
  ): Promise<NewUserResponse> => {
    if (!token) {
      throw new Error('No hay sesión activa');
    }

    const response = await fetch(`${API_URL}/new-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      const error = data as ApiError; // Assuming ApiError shape for error responses
      throw new Error(error.message || 'Error al crear el usuario'); // data.message might be direct
    }

    // The endpoint returns a message and potentially user data
    return data as NewUserResponse;
  },
};
