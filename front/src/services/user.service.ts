import type { User } from '../types/types';

const API_URL = import.meta.env.VITE_API_URL + '/api/users';

export const userService = {
    getUsers: async (): Promise<User[]> => {
        const response = await fetch(`${API_URL}`, {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error al obtener usuarios');
        }

        return response.json();
    },
};
