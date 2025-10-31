import { KaizenProApi } from "@/lib/api/KaizenProApi";
import { LoginRequest, LoginResponse, UserContextResponse } from "@/models/User";

/**
 * Servicio para autenticación de usuarios
 */
export const authService = {
  /**
   * POST /auth/login
   * Login de usuario con username y password
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const { data } = await KaizenProApi.post<LoginResponse>(
      "/auth/login",
      credentials
    );

    // Guardar token en sessionStorage si la respuesta es exitosa
    if (typeof window !== "undefined" && data.success && data.token) {
      sessionStorage.setItem("token", data.token);
    }

    return data;
  },

  /**
   * Logout del usuario
   * Limpia el token del sessionStorage
   */
  logout: async (): Promise<void> => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("token");
    }
  },

  /**
   * GET /user/context
   * Obtiene el contexto/perfil del usuario autenticado
   */
  getUserContext: async (): Promise<UserContextResponse> => {
    const { data } = await KaizenProApi.get<UserContextResponse>("/user/context");
    return data;
  },

  /**
   * Verifica si hay un token válido en sessionStorage
   */
  isAuthenticated: (): boolean => {
    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem("token");
      return !!token;
    }
    return false;
  },
};
