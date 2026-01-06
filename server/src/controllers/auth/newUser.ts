import { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import { env } from '../../config/env';

/**
 * Crea un nuevo usuario (Endpoint para Admins).
 * A diferencia de `signup`, este endpoint NO inicia sesión automáticamente
 * ni retornan cookies de sesión, para preservar la sesión del administrador.
 * 
 * @example
 * curl -X POST http://localhost:4000/api/auth/new-user \
 *   -H "Content-Type: application/json" \
 *   -H "Authorization: Bearer <ADMIN_TOKEN>" \
 *   -d '{
 *     "email": "nuevo@ejemplo.com",
 *     "password": "password123",
 *     "full_name": "Nuevo Usuario"
 *   }'
 */
export async function newUser(req: Request, res: Response) {
    const { email, password, full_name } = req.body;

    // 1. Validación básica de campos requeridos
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    // 2. Crear usuario en Supabase Auth
    // Usamos cliente temporal anon para crear el usuario sin loguear al admin como ese usuario
    // (aunque al no devolver cookies, lo importante es no usar el cliente global)
    const tempSupabase = createClient(env.supabaseUrl, env.supabaseAnonKey);

    const { data, error } = await tempSupabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name,
            },
        },
    });

    // 3. Manejar errores de registro
    if (error) {
        return res.status(400).json({ error: error.message });
    }

    // 4. Retornar éxito SIN setear cookies
    // Solo devolvemos la info del usuario creado
    res.status(201).json({
        message: 'User created successfully',
        user: {
            id: data.user?.id,
            email: data.user?.email,
            full_name,
        },
    });
}
