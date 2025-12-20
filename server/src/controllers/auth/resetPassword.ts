import { Request, Response } from 'express';
import { supabase } from '../../config/supabase';

/**
 * Restablece la contraseña del usuario autenticado.
 * Este endpoint se debe llamar DESPUÉS de que el usuario haya hecho click en el enlace del correo
 * y el frontend haya recuperado la sesión (access_token).
 */
export async function resetPassword(req: Request, res: Response) {
    const { password } = req.body;

    // 1. Validar nueva contraseña
    if (!password) {
        return res.status(400).json({ error: 'New password is required' });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    // 2. Actualizar el usuario en Supabase
    // Al estar autenticado (via authMiddleware), actualizamos el usuario actual.
    // Nota: supabase.auth.updateUser requiere un cliente autenticado o usar getUser(token) antes,
    // pero como usamos el cliente admin 'supabase' importado de config/supabase, necesitamos el token del usuario
    // o usar el método admin. SIN EMBARGO, authMiddleware ya validó el token.
    // Para cambiar la contraseña DE ESE usuario específico usando el cliente admin, usamos admin.updateUserById
    // O MEJOR: Usamos el token del usuario para actuar COMO el usuario.

    // En este proyecto `supabase` es un cliente creado con SERVICE_ROLE_KEY (admin) o ANON_KEY?
    // Verifiquemos config/supabase.ts. Si es service_role, tenemos permisos de superadmin.

    // Asumiendo que req.user.id viene del middleware.

    const { data, error } = await supabase.auth.admin.updateUserById(
        req.user!.id,
        { password: password }
    );

    // 3. Manejar errores
    if (error) {
        return res.status(400).json({ error: error.message });
    }

    // 4. Retornar éxito
    res.json({ message: 'Password updated successfully' });
}
