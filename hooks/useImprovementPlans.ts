"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { improvementPlanService } from "@/services/improvementPlanService";
import {
  CreateImprovementPlanRequest,
  FinalizeImprovementPlanRequest,
} from "@/models/ImprovementPlan";

/**
 * Hook personalizado para gestión de planes de mejora con TanStack Query
 */
export function useImprovementPlans() {
  const queryClient = useQueryClient();

  // Query para listar todos los planes de mejora
  const {
    data: plansData,
    isLoading: isLoadingPlans,
    error: plansError,
    refetch: refetchPlans,
  } = useQuery({
    queryKey: ["improvement-plans", "list"],
    queryFn: improvementPlanService.listImprovementPlans,
  });

  // Mutation para crear un nuevo plan de mejora
  const createPlanMutation = useMutation({
    mutationFn: (data: CreateImprovementPlanRequest) =>
      improvementPlanService.createImprovementPlan(data),
    onSuccess: () => {
      // Invalidar y refetch de la lista de planes
      queryClient.invalidateQueries({ queryKey: ["improvement-plans", "list"] });
    },
  });

  // Mutation para finalizar un plan de mejora
  const finalizePlanMutation = useMutation({
    mutationFn: (data: FinalizeImprovementPlanRequest) =>
      improvementPlanService.finalizeImprovementPlan(data),
    onSuccess: () => {
      // Invalidar y refetch de la lista de planes
      queryClient.invalidateQueries({ queryKey: ["improvement-plans", "list"] });
    },
  });

  return {
    // Datos de planes de mejora
    improvementPlans: plansData?.data || [],
    totalPlans: plansData?.total || plansData?.data?.length || 0,
    plansData,
    isLoadingPlans,
    plansError,
    refetchPlans,

    // Mutaciones
    createImprovementPlan: createPlanMutation.mutateAsync,
    isCreatingPlan: createPlanMutation.isPending,
    createPlanError: createPlanMutation.error,

    finalizeImprovementPlan: finalizePlanMutation.mutateAsync,
    isFinalizingPlan: finalizePlanMutation.isPending,
    finalizePlanError: finalizePlanMutation.error,
  };
}
