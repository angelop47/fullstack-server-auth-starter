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
PORT=
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
FRONTEND_URL=
```

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

## 🔐 Autenticación

### POST /api/auth/signup
#### Crear un nuevo usuario.
```bash
curl -X POST http://localhost:4000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@ejemplo.com",
    "password": "password123",
    "full_name": "Juan Perez"
  }'
```

### POST /api/auth/login
#### Iniciar sesión.
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@ejemplo.com",
    "password": "password123"
  }'
```

### GET /api/auth/me
#### Obtener perfil del usuario actual (requiere token).
```bash
curl -X GET http://localhost:4000/api/auth/me \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

### POST /api/auth/forgot-password
#### Solicitar recuperación de contraseña.
```bash
curl -X POST http://localhost:4000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@ejemplo.com"
  }'
```

### POST /api/auth/reset-password
#### Establecer nueva contraseña (requiere haberse validado con el token enviado por email).
```bash
curl -X POST http://localhost:4000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "password": "newSecurePassword123"
  }'
```

---

### 👥 Usuarios (Admin Only)

#### GET /api/users
#### Listar todos los usuarios.
```bash
curl -X GET http://localhost:4000/api/users \
  -H "Authorization: Bearer <ADMIN_ACCESS_TOKEN>"
```

### PATCH /api/users/:id
#### Actualizar un usuario específico.
```bash
curl -X PATCH http://localhost:4000/api/users/<USER_ID> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ADMIN_ACCESS_TOKEN>" \
  -d '{
    "full_name": "Nuevo Nombre",
    "role": "admin"
  }'
```
