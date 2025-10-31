"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { actionService } from "@/services/actionService";
import {
  CreateActionRequest,
  FinalizeActionRequest,
} from "@/models/Action";

/**
 * Hook personalizado para gestión de acciones con TanStack Query
 */
export function useActions() {
  const queryClient = useQueryClient();

  // Query para listar todas las acciones
  const {
    data: actionsData,
    isLoading: isLoadingActions,
    error: actionsError,
    refetch: refetchActions,
  } = useQuery({
    queryKey: ["actions", "list"],
    queryFn: actionService.listActions,
  });

  // Mutation para crear una nueva acción
  const createActionMutation = useMutation({
    mutationFn: (data: CreateActionRequest) =>
      actionService.createAction(data),
    onSuccess: () => {
      // Invalidar y refetch de la lista de acciones
      queryClient.invalidateQueries({ queryKey: ["actions", "list"] });
    },
  });

  // Mutation para finalizar una acción
  const finalizeActionMutation = useMutation({
    mutationFn: (data: FinalizeActionRequest) =>
      actionService.finalizeAction(data),
    onSuccess: () => {
      // Invalidar y refetch de la lista de acciones
      queryClient.invalidateQueries({ queryKey: ["actions", "list"] });
    },
  });

  return {
    // Datos de acciones
    actions: actionsData?.data || [],
    totalActions: actionsData?.total || actionsData?.data?.length || 0,
    actionsData,
    isLoadingActions,
    actionsError,
    refetchActions,

    // Mutaciones
    createAction: createActionMutation.mutateAsync,
    isCreatingAction: createActionMutation.isPending,
    createActionError: createActionMutation.error,

    finalizeAction: finalizeActionMutation.mutateAsync,
    isFinalizingAction: finalizeActionMutation.isPending,
    finalizeActionError: finalizeActionMutation.error,
  };
}
