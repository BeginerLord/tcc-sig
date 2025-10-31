"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/userService";
import { CreateUserRequest, UpdateUserStateRequest } from "@/models/User";

/**
 * Hook personalizado para gestión de usuarios con TanStack Query
 */
export function useUsers() {
  const queryClient = useQueryClient();

  // Query para listar todos los usuarios
  const {
    data: usersData,
    isLoading: isLoadingUsers,
    error: usersError,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: ["users", "list"],
    queryFn: userService.listUsers,
  });

  // Query para obtener el contexto del usuario autenticado
  const {
    data: userContext,
    isLoading: isLoadingContext,
    error: contextError,
  } = useQuery({
    queryKey: ["user", "context"],
    queryFn: userService.getUserContext,
    enabled: false, // Solo se ejecuta manualmente
  });

  // Mutation para crear un nuevo usuario
  const createUserMutation = useMutation({
    mutationFn: (userData: CreateUserRequest) => userService.createUser(userData),
    onSuccess: () => {
      // Invalidar y refetch de la lista de usuarios
      queryClient.invalidateQueries({ queryKey: ["users", "list"] });
    },
  });

  // Mutation para eliminar un usuario
  const deleteUserMutation = useMutation({
    mutationFn: (userCode: string) => userService.deleteUser(userCode),
    onSuccess: () => {
      // Invalidar y refetch de la lista de usuarios
      queryClient.invalidateQueries({ queryKey: ["users", "list"] });
    },
  });

  // Mutation para actualizar el estado de un usuario
  const updateUserStateMutation = useMutation({
    mutationFn: (request: UpdateUserStateRequest) =>
      userService.updateUserState(request),
    onSuccess: () => {
      // Invalidar y refetch de la lista de usuarios
      queryClient.invalidateQueries({ queryKey: ["users", "list"] });
    },
  });

  return {
    // Datos de usuarios
    users: usersData?.users || [],
    totalUsers: usersData?.total || 0,
    usersData,
    isLoadingUsers,
    usersError,
    refetchUsers,

    // Contexto del usuario
    userContext: userContext?.user,
    isLoadingContext,
    contextError,

    // Mutaciones
    createUser: createUserMutation.mutateAsync,
    isCreatingUser: createUserMutation.isPending,
    createUserError: createUserMutation.error,

    deleteUser: deleteUserMutation.mutateAsync,
    isDeletingUser: deleteUserMutation.isPending,
    deleteUserError: deleteUserMutation.error,

    updateUserState: updateUserStateMutation.mutateAsync,
    isUpdatingState: updateUserStateMutation.isPending,
    updateStateError: updateUserStateMutation.error,
  };
}
