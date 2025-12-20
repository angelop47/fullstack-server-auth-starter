import { Request, Response } from 'express';
import { supabase } from '../../config/supabase';

/**
 * Obtiene la lista de todos los usuarios registrados.
 * Consulta la tabla `public.users` (gestionada por triggers) para obtener datos de perfil.
 * Normalmente restringido a administradores (ver routes).
 * 
 * @example
 * curl -X GET http://localhost:4000/api/users \
 *   -H "Authorization: Bearer <ADMIN_ACCESS_TOKEN>"
 */
export async function getUsers(req: Request, res: Response) {
    // 1. Consultar la tabla pública 'users'
    // Seleccionamos campos específicos para no exponer datos sensibles si los hubiera
    const { data, error } = await supabase
        .from('users')
        .select('id, email, full_name, avatar_url, role')
        .order('full_name', { ascending: true });

    // 2. Manejar errores de la base de datos
    if (error) {
        return res.status(400).json({ error: error.message });
    }

    // 3. Retornar la lista de usuarios
    res.json(data);
}