export interface User {
    id: string;
    email: string;
    role: string;
}

export interface LoginResponse {
    user: User;
    access_token: string;
    refresh_token: string;
}

export interface ApiError {
    message: string;
}