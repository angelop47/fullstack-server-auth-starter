import 'dotenv/config';

/**
 * Valida que todas las variables de entorno requeridas estén presentes.
 * Lanza un error si falta alguna variable crítica.
 */
function validateEnv() {
  const required = [
    'SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY',
    'SUPABASE_ANON_KEY',
  ]

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing environment variables: ${missing.join(', ')}`);
  }
}

validateEnv();

/**
 * Objeto de configuración de la aplicación con todas las variables de entorno tipadas.
 */
export const env = {
  port: process.env.PORT || 4000,
  supabaseUrl: process.env.SUPABASE_URL!,
  supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY!,
  corsOrigin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : true,
};
