/**
 * Extensión de tipos de Express.
 * Agrega la propiedad 'user' al objeto Request para almacenar
 * los datos del usuario autenticado desde Supabase.
 * 
 * Esta propiedad es poblada por el middleware authMiddleware.
 */
import { User } from '@supabase/supabase-js';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
export { }
