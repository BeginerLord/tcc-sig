"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import { LoginRequest } from "@/models/User";

/**
 * Hook personalizado para autenticación con TanStack Query
 */
export function useAuth() {
  const queryClient = useQueryClient();

  // Query para obtener el contexto/perfil del usuario autenticado
  const {
    data: userContextData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", "context"],
    queryFn: authService.getUserContext,
    enabled: authService.isAuthenticated(),
    retry: false,
  });

  // Mutation para login
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onSuccess: (data) => {
      if (data.success && data.user) {
        // Setear el contexto del usuario después del login
        queryClient.setQueryData(["user", "context"], {
          success: true,
          user: data.user,
        });
      }
    },
  });

  // Mutation para logout
  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      // Limpiar todo el cache
      queryClient.clear();
    },
  });

  return {
    // Usuario autenticado
    user: userContextData?.user,
    isLoading,
    error,
    isAuthenticated: authService.isAuthenticated(),

    // Mutaciones
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,

    logout: logoutMutation.mutateAsync,
    isLoggingOut: logoutMutation.isPending,
  };
}
