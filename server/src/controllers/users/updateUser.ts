import { Request, Response } from 'express';
import { supabase } from '../../config/supabase';
import { AppUser } from '../../models/user.model';

/**
 * Actualiza la información de un usuario específico.
 * Permite modificar `full_name`, `avatar_url` y `role`.
 * Actualiza la tabla `public.users`, lo cual dispara triggers para sincronizar roles.
 * Normalmente restringido a administradores.
 * 
 * @example
 * curl -X PATCH http://localhost:4000/api/users/<USER_ID> \
 *   -H "Content-Type: application/json" \
 *   -H "Authorization: Bearer <ADMIN_ACCESS_TOKEN>" \
 *   -d '{
 *     "full_name": "Nuevo Nombre",
 *     "role": "admin"
 *   }'
 */
export async function updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { full_name, avatar_url, role } = req.body;

    const updates: Partial<AppUser> = {};

    // 1. Construir objeto de actualizaciones dinámicamente
    // Solo agregamos los campos que vinieron en el body
    if (full_name !== undefined) updates.full_name = full_name;
    if (avatar_url !== undefined) updates.avatar_url = avatar_url;
    if (role !== undefined) updates.role = role;

    // 2. Si no hay nada que actualizar, retornamos error
    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ error: 'No fields to update' });
    }

    // 3. Ejecutar la actualización en Supabase
    const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    // 4. Manejar errores (ej. id no existe)
    if (error) {
        return res.status(400).json({ error: error.message });
    }

    // 5. Retornar el usuario actualizado
    res.json(data);
}
