/**
 * Modelo de usuario de la aplicación.
 * Representa los datos de usuario almacenados en la tabla public.users.
 * 
 * Esta tabla se sincroniza automáticamente con auth.users mediante triggers de Supabase.
 */
export interface AppUser {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string;
  role: 'admin' | 'user';
}
