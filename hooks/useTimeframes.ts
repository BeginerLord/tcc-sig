"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { timeframeService } from "@/services/timeframeService";
import {
  CreateTimeframeRequest,
  UpdateTimeframeNameRequest,
  UpdateTimeframeExtensionDateRequest,
} from "@/models/Timeframe";

/**
 * Hook personalizado para gestión de periodos de tiempo (timeframes) con TanStack Query
 */
export function useTimeframes() {
  const queryClient = useQueryClient();

  // Query para listar todos los periodos de tiempo
  const {
    data: timeframesData,
    isLoading: isLoadingTimeframes,
    error: timeframesError,
    refetch: refetchTimeframes,
  } = useQuery({
    queryKey: ["timeframes", "list"],
    queryFn: timeframeService.listTimeframes,
  });

  // Mutation para crear un nuevo periodo de tiempo
  const createTimeframeMutation = useMutation({
    mutationFn: (data: CreateTimeframeRequest) =>
      timeframeService.createTimeframe(data),
    onSuccess: () => {
      // Invalidar y refetch de la lista de periodos
      queryClient.invalidateQueries({ queryKey: ["timeframes", "list"] });
    },
  });

  // Mutation para actualizar el nombre de un periodo
  const updateTimeframeNameMutation = useMutation({
    mutationFn: (data: UpdateTimeframeNameRequest) =>
      timeframeService.updateTimeframeName(data),
    onSuccess: () => {
      // Invalidar y refetch de la lista de periodos
      queryClient.invalidateQueries({ queryKey: ["timeframes", "list"] });
    },
  });

  // Mutation para actualizar la fecha de extensión
  const updateTimeframeExtensionDateMutation = useMutation({
    mutationFn: (data: UpdateTimeframeExtensionDateRequest) =>
      timeframeService.updateTimeframeExtensionDate(data),
    onSuccess: () => {
      // Invalidar y refetch de la lista de periodos
      queryClient.invalidateQueries({ queryKey: ["timeframes", "list"] });
    },
  });

  return {
    // Datos de periodos de tiempo
    timeframes: timeframesData?.data || [],
    timeframesData,
    isLoadingTimeframes,
    timeframesError,
    refetchTimeframes,

    // Mutaciones
    createTimeframe: createTimeframeMutation.mutateAsync,
    isCreatingTimeframe: createTimeframeMutation.isPending,
    createTimeframeError: createTimeframeMutation.error,

    updateTimeframeName: updateTimeframeNameMutation.mutateAsync,
    isUpdatingTimeframeName: updateTimeframeNameMutation.isPending,
    updateTimeframeNameError: updateTimeframeNameMutation.error,

    updateTimeframeExtensionDate:
      updateTimeframeExtensionDateMutation.mutateAsync,
    isUpdatingExtensionDate: updateTimeframeExtensionDateMutation.isPending,
    updateExtensionDateError: updateTimeframeExtensionDateMutation.error,
  };
}
