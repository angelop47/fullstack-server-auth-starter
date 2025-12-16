# Supabase Auth Server

Backend de autenticación con Node.js, Express y Supabase.

## Requisitos

- Node.js 18+
- Cuenta de Supabase

## Instalación

```bash
cd server
npm install
```

## Variables de Entorno

Crea un archivo `.env` basándote en `.env.example`:

```env
PORT=4000
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
```

> ⚠️ Usa el **Service Role Key** (no el anon key) para operaciones del servidor.

## Base de Datos

Ejecuta el siguiente SQL en el SQL Editor de Supabase:

```sql
create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  avatar_url text,
  role text default 'user',
  created_at timestamptz default now()
);

create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- Sincronización de roles (public -> auth)
create or replace function public.sync_user_role()
returns trigger as $$
begin
  update auth.users
  set raw_app_meta_data = raw_app_meta_data || jsonb_build_object('role', new.role)
  where id = new.id;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_role_change
after update of role on public.users
for each row
when (old.role is distinct from new.role)
execute procedure public.sync_user_role();
```

## Ejecutar

```bash
# Desarrollo
npm run dev

# Producción
npm run build && npm start
```

El servidor corre en `http://localhost:4000`

## API Endpoints

### 🔐 Autenticación

#### POST /auth/signup

Crear un nuevo usuario.

```bash
curl -X POST http://localhost:4000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"pass123","full_name":"John Doe"}'
```

**Response:**
```json
{
  "user": { "id": "uuid", "email": "user@example.com", "full_name": "John Doe" },
  "session": null
}
```

#### POST /auth/login

Autenticarse y obtener token.

```bash
curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"pass123"}'
```

**Response:**
```json
{
  "user": { "id": "uuid", "email": "user@example.com", "role": "user" },
  "access_token": "eyJ...",
  "refresh_token": "..."
}
```

#### GET /auth/me

Obtener datos del usuario autenticado (requiere token).

```bash
curl -X GET http://localhost:4000/auth/me \
  -H "Authorization: Bearer <access_token>"
```

### 👥 Usuarios (Gestión)

#### PATCH /users/:id

Actualizar información de un usuario.
⚠️ **Requiere Rol 'admin'**

```bash
curl -X PATCH http://localhost:4000/users/<USER_ID> \
  -H "Authorization: Bearer <ADMIN_ACCESS_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "Updated Name",
    "role": "admin"
  }'
```

**Response:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "full_name": "Updated Name",
  "role": "admin",
  "avatar_url": null,
  "created_at": "..."
}
```

## Nota Importante

1. Por defecto, Supabase requiere **confirmación de email**. Para desarrollo, puedes desactivarla en:
   **Dashboard Supabase** → **Authentication** → **Providers** → **Email** → Desactiva "Confirm email"

2. Para probar las rutas de administrador, debes actualizar manualmente el rol de un usuario en la tabla `public.users` a `'admin'` directamente en la base de datos de Supabase, ya que por defecto se crean como `'user'`.
