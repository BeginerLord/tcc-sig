"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { objectiveService } from "@/services/objectiveService";
import {
  CreateObjectiveRequest,
  FinalizeObjectiveRequest,
} from "@/models/Objective";

/**
 * Hook personalizado para gestión de objetivos con TanStack Query
 */
export function useObjectives() {
  const queryClient = useQueryClient();

  // Query para listar todos los objetivos
  const {
    data: objectivesData,
    isLoading: isLoadingObjectives,
    error: objectivesError,
    refetch: refetchObjectives,
  } = useQuery({
    queryKey: ["objectives", "list"],
    queryFn: objectiveService.listObjectives,
  });

  // Mutation para crear un nuevo objetivo
  const createObjectiveMutation = useMutation({
    mutationFn: (data: CreateObjectiveRequest) =>
      objectiveService.createObjective(data),
    onSuccess: () => {
      // Invalidar y refetch de la lista de objetivos
      queryClient.invalidateQueries({ queryKey: ["objectives", "list"] });
    },
  });

  // Mutation para finalizar un objetivo
  const finalizeObjectiveMutation = useMutation({
    mutationFn: (data: FinalizeObjectiveRequest) =>
      objectiveService.finalizeObjective(data),
    onSuccess: () => {
      // Invalidar y refetch de la lista de objetivos
      queryClient.invalidateQueries({ queryKey: ["objectives", "list"] });
    },
  });

  return {
    // Datos de objetivos
    objectives: objectivesData?.data || [],
    totalObjectives: objectivesData?.total || objectivesData?.data?.length || 0,
    objectivesData,
    isLoadingObjectives,
    objectivesError,
    refetchObjectives,

    // Mutaciones
    createObjective: createObjectiveMutation.mutateAsync,
    isCreatingObjective: createObjectiveMutation.isPending,
    createObjectiveError: createObjectiveMutation.error,

    finalizeObjective: finalizeObjectiveMutation.mutateAsync,
    isFinalizingObjective: finalizeObjectiveMutation.isPending,
    finalizeObjectiveError: finalizeObjectiveMutation.error,
  };
}
