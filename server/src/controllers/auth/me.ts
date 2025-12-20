import { Request, Response } from 'express';

/**
 * Obtiene la información del usuario autenticado actual.
 * El usuario ya está disponible en `req.user` gracias al middleware de autenticación.
 * 
 * @example
 * curl -X GET http://localhost:4000/auth/me \
 *   -H "Authorization: Bearer <ACCESS_TOKEN>"
 */
export function me(req: Request, res: Response) {
    // Retornamos directamente el usuario que fue adjuntado por el authMiddleware
    // Esto evita tener que consultar la BD de nuevo si solo necesitamos info básica del token
    res.json({
        id: req.user?.id,
        email: req.user?.email,
        role: req.user?.app_metadata?.role ?? 'user',
    });
}
