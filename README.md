# TCC-SIG - Sistema de Información Geográfica KaizenPro

Proyecto frontend construido con Next.js, TypeScript, pnpm, TanStack Query y Tailwind CSS para el sistema KaizenPro.

## Estructura del Proyecto

```
tcc-sig/
├── app/                      # Páginas y rutas de Next.js (App Router)
│   ├── layout.tsx           # Layout principal con QueryProvider
│   ├── page.tsx             # Página principal con navegación
│   └── globals.css          # Estilos globales con Tailwind
├── components/              # Componentes reutilizables de React
│   ├── UserManagement.tsx   # Gestión completa de usuarios
│   └── ExampleComponent.tsx # Ejemplo de autenticación
├── hooks/                   # Custom hooks de React
│   ├── useAuth.ts          # Hook de autenticación
│   └── useUsers.ts         # Hook de gestión de usuarios
├── lib/                     # Librerías y configuraciones
│   └── api/
│       └── KaizenProApi.ts # Cliente Axios con interceptores
├── models/                  # Definiciones de tipos TypeScript
│   └── User.ts             # Interfaces de Usuario y endpoints
├── providers/               # Providers de React Context
│   └── QueryProvider.tsx   # Provider de TanStack Query
└── services/                # Servicios para llamadas a API
    ├── authService.ts      # Servicio de autenticación
    └── userService.ts      # Servicio de gestión de usuarios
```

## Tecnologías

- **Next.js 14**: Framework de React con App Router
- **TypeScript**: Tipado estático completo
- **pnpm**: Gestor de paquetes eficiente
- **TanStack Query v5**: Manejo de estado del servidor, cache y sincronización
- **Tailwind CSS**: Framework de CSS utility-first
- **Axios**: Cliente HTTP con interceptores

## Primeros Pasos

### 1. Instalar dependencias

```bash
pnpm install
```

### 2. Configurar variables de entorno

El archivo `.env.local` ya está configurado con:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1/kaizenpro
```

Modifica la URL según tu backend.

### 3. Ejecutar en modo desarrollo

```bash
pnpm dev
```

### 4. Abrir en el navegador

Navega a [http://localhost:3000](http://localhost:3000)

## Scripts Disponibles

- `pnpm dev` - Inicia el servidor de desarrollo
- `pnpm build` - Construye la aplicación para producción
- `pnpm start` - Inicia el servidor de producción
- `pnpm lint` - Ejecuta el linter de ESLint

## Módulos Implementados

### Módulo de Usuarios

Gestión completa de usuarios con los siguientes endpoints:

#### POST /user/createUser
Crea un nuevo usuario en el sistema.

**Request:**
```typescript
{
  username: string;
  role: "lider" | "colaborador";
  mail: string;
  phone: string;
  state: "A" | "I";  // A = Activo, I = Inactivo
}
```

#### GET /user/list
Lista todos los usuarios del sistema.

**Response:**
```typescript
{
  success: boolean;
  total: number;
  users: User[];
}
```

#### DELETE /user/delete
Elimina un usuario por su código UUID.

**Request:**
```typescript
{
  code: string;  // UUID del usuario
}
```

#### PATCH /user/state
Actualiza el estado de un usuario (Activo/Inactivo).

**Request:**
```typescript
{
  code: string;
  state: "A" | "I";
}
```

#### GET /user/context
Obtiene el contexto del usuario autenticado.

**Response:**
```typescript
{
  success: boolean;
  user: User;
}
```

## Características Principales

### Cliente de API (KaizenProApi)

El cliente Axios está configurado con:
- **Autenticación automática**: Agrega el token Bearer en cada request
- **Logging completo**: Console logs de todos los requests/responses
- **Manejo de errores 401**: Limpia el token y redirige al login
- **TypeScript**: Tipado completo en requests y responses

**Ubicación:** `lib/api/KaizenProApi.ts`

### TanStack Query

Configuración completa:
- **Provider global** en el layout de la app
- **DevTools** habilitadas en desarrollo
- **Cache inteligente** con staleTime de 1 minuto
- **Queries y Mutations** con invalidación automática
- **Refetch** deshabilitado en window focus

### Hooks Personalizados

#### useAuth
Hook para autenticación con TanStack Query:

```typescript
const {
  user,              // Usuario autenticado
  isLoading,         // Cargando contexto
  login,             // Función de login
  logout,            // Función de logout
  isAuthenticated,   // Estado de autenticación
} = useAuth();
```

#### useUsers
Hook para gestión de usuarios:

```typescript
const {
  users,            // Lista de usuarios
  totalUsers,       // Total de usuarios
  createUser,       // Crear usuario
  deleteUser,       // Eliminar usuario
  updateUserState,  // Cambiar estado
  isLoadingUsers,   // Cargando lista
} = useUsers();
```

### Componentes

#### UserManagement
Componente completo con:
- Tabla de usuarios con diseño responsive
- Formulario de creación de usuarios
- Acciones de eliminar y cambiar estado
- Indicadores visuales de rol y estado
- Manejo de errores y loading states

## Modelos de Datos

### User
```typescript
interface User {
  code: string;        // UUID
  username: string;
  role: "lider" | "colaborador";
  state: "A" | "I";
  mail: string;
  phone: string;
}
```

## Ejemplos de Uso

### Crear un usuario

```typescript
import { useUsers } from "@/hooks/useUsers";

function MyComponent() {
  const { createUser } = useUsers();

  const handleCreate = async () => {
    try {
      await createUser({
        username: "nuevo_usuario",
        role: "colaborador",
        mail: "usuario@example.com",
        phone: "3001234567",
        state: "A"
      });
    } catch (error) {
      console.error(error);
    }
  };
}
```

### Listar usuarios

```typescript
import { useUsers } from "@/hooks/useUsers";

function UserList() {
  const { users, isLoadingUsers } = useUsers();

  if (isLoadingUsers) return <div>Cargando...</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.code}>{user.username}</li>
      ))}
    </ul>
  );
}
```

### Autenticación

```typescript
import { useAuth } from "@/hooks/useAuth";

function Login() {
  const { login, isLoggingIn } = useAuth();

  const handleLogin = async () => {
    const response = await login({
      username: "usuario",
      password: "contraseña"
    });

    if (response.success) {
      console.log("Login exitoso");
    }
  };
}
```

## Próximos Pasos

1. Conectar con el backend de KaizenPro
2. Implementar módulos adicionales (proyectos, tareas, etc.)
3. Agregar más validaciones en formularios
4. Implementar paginación en lista de usuarios
5. Agregar búsqueda y filtros
6. Implementar roles y permisos
7. Agregar notificaciones toast

## Soporte

Documentación oficial de las tecnologías:
- [Next.js](https://nextjs.org/docs)
- [TanStack Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)
