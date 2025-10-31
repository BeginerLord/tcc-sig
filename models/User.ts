// Tipos para roles de usuario
export type UserRole = "lider" | "colaborador";

// Tipos para estados de usuario
export type UserState = "A" | "I"; // A = Activo, I = Inactivo

// Modelo principal de Usuario
export interface User {
  code: string; // UUID
  username: string;
  role: UserRole;
  state: UserState;
  mail: string;
  phone: string;
}

// ============= AUTH ENDPOINTS =============

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: User;
}

// ============= USER ENDPOINTS =============

// POST /user/createUser
export interface CreateUserRequest {
  username: string;
  role: UserRole;
  mail: string;
  phone: string;
  state: UserState;
}

export interface CreateUserResponse {
  success: boolean;
  message?: string;
  user?: User;
}

// GET /user/list
export interface UserListResponse {
  success: boolean;
  total: number;
  users: User[];
}

// DELETE /user/delete
export interface DeleteUserRequest {
  code: string; // UUID del usuario
}

export interface DeleteUserResponse {
  success: boolean;
  message?: string;
}

// PATCH /user/state
export interface UpdateUserStateRequest {
  code: string; // UUID del usuario
  state: UserState;
}

export interface UpdateUserStateResponse {
  success: boolean;
  message?: string;
}

// GET /user/context
export interface UserContextResponse {
  success: boolean;
  user: User;
}
