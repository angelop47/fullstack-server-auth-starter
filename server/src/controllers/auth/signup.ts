import { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '../../config/supabase';
import { env } from '../../config/env';

/**
 * Registra un nuevo usuario en Supabase Auth.
 * Guarda metadatos adicionales como `full_name`.
 * Retorna el usuario creado y, dependiendo de la configuración de Supabase (confirmación de email), la sesión inicial.
 * 
 * @example
 * curl -X POST http://localhost:4000/api/auth/signup \
 *   -H "Content-Type: application/json" \
 *   -d '{
 *     "email": "juan@ejemplo.com",
 *     "password": "password123",
 *     "full_name": "Juan Perez"
 *   }'
 */
export async function signup(req: Request, res: Response) {
    const { email, password, full_name } = req.body;

    // 1. Validación básica de campos requeridos
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    // 2. Crear usuario en Supabase Auth
    // IMPORTANTE: Usamos un cliente temporal para no iniciar sesión en el cliente global (Admin)
    const tempSupabase = createClient(env.supabaseUrl, env.supabaseAnonKey);

    // 'options.data' permite guardar metadatos extra como full_name en la tabla auth.users
    const { data, error } = await tempSupabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name,
            },
        },
    });

    // 3. Manejar errores de registro (ej. email ya registrado, contraseña débil)
    if (error) {
        return res.status(400).json({ error: error.message });
    }

    // 4. Retornar éxito
    // Nota: Si 'Confirm email' está activado en Supabase, session será null hasta que el usuario confirme su correo.

    if (data.session) {
        const isProduction = process.env.NODE_ENV === 'production';

        res.cookie('access_token', data.session.access_token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: 'strict',
            maxAge: data.session.expires_in * 1000,
        });

        res.cookie('refresh_token', data.session.refresh_token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
    }

    res.status(201).json({
        user: {
            id: data.user?.id,
            email: data.user?.email,
            full_name,
        },
        // session: data.session, // No devolvemos la sesión en el cuerpo
    });
}
