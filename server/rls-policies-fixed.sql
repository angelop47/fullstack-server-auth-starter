-- 2. Asegurarse que RLS está habilitado
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 3. Política para que usuarios vean su propio perfil
CREATE POLICY "Users can view own profile"
ON public.users
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- 4. Política para que usuarios actualicen su propio perfil
CREATE POLICY "Users can update own profile"
ON public.users
FOR UPDATE
TO authenticated
USING (auth.uid() = id);

-- 5. Permitir INSERT durante signup (cuando el trigger crea el registro)
CREATE POLICY "Users can insert own profile"
ON public.users
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- 6. IMPORTANTE: Las operaciones de Admin se manejan desde el backend
-- usando Service Role Key, que BYPASEA RLS automáticamente.
-- Por lo tanto, NO necesitamos políticas específicas para admins.

-- NOTA CRÍTICA:
-- - Service Role Key (backend) = Acceso total, ignora RLS
-- - Anon Key + User Token (frontend/cliente autenticado) = Respeta RLS
-- - Los endpoints protegidos con requireAdmin usan Service Role, así que funcionarán
