import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/auth.service';
import type { LoginResponse } from '../types/types';

export const useUserQuery = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: authService.getCurrentUser,
        staleTime: 1000 * 60 * 5, // 5 minutos
        retry: false,
    });
};

export const useLoginMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) =>
            authService.login(email, password),
        onSuccess: (data: LoginResponse) => {
            // Login exitoso: actualizamos la caché del usuario
            queryClient.setQueryData(['user'], data.user);
        },
    });
};

export const useLogoutMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: authService.logout,
        onSuccess: () => {
            // Logout exitoso: limpiamos el usuario de la caché
            queryClient.setQueryData(['user'], null);
            // Opcional: invalidar para asegurar limpieza total
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
    });
};
