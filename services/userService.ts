import { KaizenProApi } from "@/lib/api/KaizenProApi";
import {
  CreateUserRequest,
  CreateUserResponse,
  DeleteUserRequest,
  DeleteUserResponse,
  UpdateUserStateRequest,
  UpdateUserStateResponse,
  UserContextResponse,
  UserListResponse,
} from "@/models/User";

/**
 * Servicio para gestión de usuarios
 */
export const userService = {
  /**
   * POST /user/createUser
   * Crea un nuevo usuario en el sistema
   */
  createUser: async (userData: CreateUserRequest): Promise<CreateUserResponse> => {
    const { data } = await KaizenProApi.post<CreateUserResponse>(
      "/user/createUser",
      userData
    );
    return data;
  },

  /**
   * GET /user/list
   * Obtiene la lista completa de usuarios
   */
  listUsers: async (): Promise<UserListResponse> => {
    const { data } = await KaizenProApi.get<UserListResponse>("/user/list");
    return data;
  },

  /**
   * DELETE /user/delete
   * Elimina un usuario por su código UUID
   */
  deleteUser: async (userCode: string): Promise<DeleteUserResponse> => {
    const { data } = await KaizenProApi.delete<DeleteUserResponse>("/user/delete", {
      data: { code: userCode },
    });
    return data;
  },

  /**
   * PATCH /user/state
   * Actualiza el estado de un usuario (A = Activo, I = Inactivo)
   */
  updateUserState: async (
    request: UpdateUserStateRequest
  ): Promise<UpdateUserStateResponse> => {
    const { data } = await KaizenProApi.patch<UpdateUserStateResponse>(
      "/user/state",
      request
    );
    return data;
  },

  /**
   * GET /user/context
   * Obtiene el contexto del usuario autenticado
   */
  getUserContext: async (): Promise<UserContextResponse> => {
    const { data } = await KaizenProApi.get<UserContextResponse>("/user/context");
    return data;
  },
};
