import type { LoginResponse, NewUserPayload, NewUserResponse, ApiError, User } from '../types/types';

const API_URL = 'http://localhost:4000/api/auth';

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include', // Importante para recibir cookies
    });

    const data = await response.json();

    if (!response.ok) {
      const error = data as ApiError;
      throw new Error(error.message || 'Error en la autenticación');
    }

    // Ya no retornamos tokens, solo el usuario
    return data as LoginResponse;
  },

  logout: async (): Promise<void> => {
    await fetch(`${API_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
    });
  },

  getCurrentUser: async (): Promise<User | null> => {
    try {
      const response = await fetch(`${API_URL}/me`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        return null; // Si falla (401), no hay usuario
      }

      const data = await response.json();
      return data.user; // Asumiendo que /me retorna { user: ... }
    } catch (error) {
      return null;
    }
  },

  createNewUser: async (
    payload: NewUserPayload,
  ): Promise<NewUserResponse> => {
    // Ya no necesitamos pasar el token manualmente, el navegador lo envía en la cookie
    const response = await fetch(`${API_URL}/new-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      const error = data as ApiError;
      throw new Error(error.message || 'Error al crear el usuario');
    }

    return data as NewUserResponse;
  },
};
