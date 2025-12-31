/**
 * Usar este cliente únicamente para:
 * - Operaciones administrativas que requieran acceso total
 * - Validación de tokens de autenticación (supabase.auth.getUser)
 * - Tareas que necesiten bypasear RLS explícitamente
 * 
 * Para operaciones que deban respetar RLS, usar createAuthenticatedClient() 
 * desde utils/supabase-client.ts
 */
import { createClient } from '@supabase/supabase-js';
import { env } from './env';

export const supabase = createClient(env.supabaseUrl, env.supabaseServiceKey);
