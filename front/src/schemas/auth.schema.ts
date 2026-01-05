import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email('Debe ser un email válido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const newUserSchema = z.object({
    full_name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: z.string().email('Debe ser un email válido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export type NewUserFormData = z.infer<typeof newUserSchema>;
