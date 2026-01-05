import { Request, Response } from 'express';
import { supabase } from '../../config/supabase';

/**
 * Inicia sesión con email y contraseña.
 * Utiliza Supabase Auth para validar credenciales y obtener tokens (access_token, refresh_token).
 * Retorna los datos del usuario junto con los tokens de sesión.
 * 
 * @example
 * curl -X POST http://localhost:4000/api/auth/login \
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

    // 4. Obtener información adicional del perfil usuario desde la tabla public.users
    const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();

    // 5. Retornar información del usuario y setear cookies
    // data.user contiene la info del usuario
    // data.session contiene los tokens (access_token, refresh_token)

    // Si NODE_ENV no está definido, asumimos producción (seguro) para evitar errores en despliegues.
    // Solo usamos 'lax' si explícitamente estamos en 'development'.
    const isDevelopment = process.env.NODE_ENV === 'development';
    const cookieOptions = {
        httpOnly: true,
        // En desarrollo (localhost sin https) secure: false. En cualquier otro caso (prod/undefined): true
        secure: !isDevelopment,
        // En desarrollo 'lax' (mismo dominio). En prod (cross-origin): 'none'
        sameSite: isDevelopment ? 'lax' : 'none' as 'lax' | 'none' | 'strict',
        maxAge: data.session.expires_in * 1000,
    };

    res.cookie('access_token', data.session.access_token, cookieOptions);

    res.cookie('refresh_token', data.session.refresh_token, {
        ...cookieOptions,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 días aprox
    });

    res.json({
        user: {
            id: data.user.id,
            email: data.user.email,
            role: data.user.app_metadata?.role ?? 'user',
            full_name: profile?.full_name,
            avatar_url: profile?.avatar_url,
        },
    });
}
