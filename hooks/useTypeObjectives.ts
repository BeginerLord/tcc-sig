"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { typeObjectiveService } from "@/services/typeObjectiveService";
import {
  CreateTypeObjectiveRequest,
  UpdateTypeObjectiveNameRequest,
} from "@/models/TypeObjective";

/**
 * Hook personalizado para gestión de tipos de objetivos con TanStack Query
 */
export function useTypeObjectives() {
  const queryClient = useQueryClient();

  // Query para listar todos los tipos de objetivos
  const {
    data: typeObjectivesData,
    isLoading: isLoadingTypeObjectives,
    error: typeObjectivesError,
    refetch: refetchTypeObjectives,
  } = useQuery({
    queryKey: ["type-objectives", "list"],
    queryFn: typeObjectiveService.listAllTypeObjectives,
  });

  // Mutation para crear un nuevo tipo de objetivo
  const createTypeObjectiveMutation = useMutation({
    mutationFn: (data: CreateTypeObjectiveRequest) =>
      typeObjectiveService.createTypeObjective(data),
    onSuccess: () => {
      // Invalidar y refetch de la lista de tipos de objetivos
      queryClient.invalidateQueries({ queryKey: ["type-objectives", "list"] });
    },
  });

  // Mutation para actualizar el nombre de un tipo de objetivo
  const updateTypeObjectiveNameMutation = useMutation({
    mutationFn: (data: UpdateTypeObjectiveNameRequest) =>
      typeObjectiveService.updateTypeObjectiveName(data),
    onSuccess: () => {
      // Invalidar y refetch de la lista de tipos de objetivos
      queryClient.invalidateQueries({ queryKey: ["type-objectives", "list"] });
    },
  });

  return {
    // Datos de tipos de objetivos
    typeObjectives: typeObjectivesData?.data || [],
    typeObjectivesData,
    isLoadingTypeObjectives,
    typeObjectivesError,
    refetchTypeObjectives,

    // Mutaciones
    createTypeObjective: createTypeObjectiveMutation.mutateAsync,
    isCreatingTypeObjective: createTypeObjectiveMutation.isPending,
    createTypeObjectiveError: createTypeObjectiveMutation.error,

    updateTypeObjectiveName: updateTypeObjectiveNameMutation.mutateAsync,
    isUpdatingTypeObjectiveName: updateTypeObjectiveNameMutation.isPending,
    updateTypeObjectiveNameError: updateTypeObjectiveNameMutation.error,
  };
}
