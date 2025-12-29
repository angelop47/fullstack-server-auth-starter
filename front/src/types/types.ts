export interface User {
  id: string;
  email: string;
  role: string;
  full_name?: string;
  avatar_url?: string;
}

export interface LoginResponse {
  user: User;
}

export interface ApiError {
  message: string;
}

export interface NewUserPayload {
  email: string;
  password: string;
  full_name: string;
}

export interface NewUserResponse {
  message: string;
  user?: any; // Dependiendo de qué devuelva tu API de Node
}
