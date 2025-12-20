import { Request, Response } from 'express';
import { supabase } from '../../config/supabase';

/**
 * Inicia sesión con email y contraseña.
 * Utiliza Supabase Auth para validar credenciales y obtener tokens (access_token, refresh_token).
 * Retorna los datos del usuario junto con los tokens de sesión.
 * 
 * @example
 * curl -X POST http://localhost:4000/auth/login \
 *   -H "Content-Type: application/json" \
 *   -d '{
 *     "email": "juan@ejemplo.com",
 *     "password": "password123"
 *   }'
 */
export async function login(req: Request, res: Response) {
    const { email, password } = req.body;

    // 1. Validar que se envíen email y contraseña
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    // 2. Intentar iniciar sesión usando Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    // 3. Manejar errores de autenticación (credenciales inválidas, etc.)
    if (error) {
        return res.status(401).json({ error: error.message });
    }

    // 4. Retornar información del usuario y tokens de sesión
    // data.user contiene la info del usuario
    // data.session contiene los tokens (access_token, refresh_token)
    res.json({
        user: {
            id: data.user?.id,
            email: data.user?.email,
            role: data.user?.app_metadata?.role ?? 'user',
        },
        access_token: data.session?.access_token,
        refresh_token: data.session?.refresh_token,
    });
}
