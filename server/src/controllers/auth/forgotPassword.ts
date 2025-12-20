import { Request, Response } from 'express';
import { supabase } from '../../config/supabase';

/**
 * Inicia el flujo de recuperación de contraseña.
 * Envía un correo electrónico al usuario con un enlace para restablecer su contraseña.
 * El enlace debe apuntar a una URL del frontend configurada en Supabase (Site URL / Redirect URLs).
 * 
 * @example
 * curl -X POST http://localhost:4000/auth/forgot-password \
 *   -H "Content-Type: application/json" \
 *   -d '{
 *     "email": "juan@ejemplo.com"
 *   }'
 */
export async function forgotPassword(req: Request, res: Response) {
    const { email } = req.body;

    // 1. Validar que se envíe el email
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    // 2. Solicitar envío de correo de recuperación a Supabase
    const options: { redirectTo?: string } = {};
    if (process.env.FRONTEND_URL) {
        options.redirectTo = `${process.env.FRONTEND_URL}/reset-password`;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, options);

    // 3. Manejar errores
    if (error) {
        return res.status(400).json({ error: error.message });
    }

    // 4. Retornar éxito (siempre 200 OK para no enumerar usuarios, aunque Supabase devuelve error si no existe o rate limit)
    // Nota: Supabase devuelve error si el rate limit se excede o si hay configuración específica, pero por defecto es seguro.
    res.json({ message: 'If the email exists, a password reset link has been sent.' });
}
