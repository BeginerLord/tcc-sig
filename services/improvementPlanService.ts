import { KaizenProApi } from "@/lib/api/KaizenProApi";
import {
  CreateImprovementPlanRequest,
  CreateImprovementPlanResponse,
  ListImprovementPlansResponse,
  FinalizeImprovementPlanRequest,
  FinalizeImprovementPlanResponse,
} from "@/models/ImprovementPlan";

/**
 * Servicio para gestión de planes de mejora
 */
export const improvementPlanService = {
  /**
   * POST /improvementplan/createImprovementPlan
   * Crea un nuevo plan de mejora
   */
  createImprovementPlan: async (
    data: CreateImprovementPlanRequest
  ): Promise<CreateImprovementPlanResponse> => {
    const response = await KaizenProApi.post<CreateImprovementPlanResponse>(
      "/improvementplan/createImprovementPlan",
      data
    );
    return response.data;
  },

  /**
   * GET /improvementplan/listImprovementPlans
   * Lista todos los planes de mejora
   */
  listImprovementPlans: async (): Promise<ListImprovementPlansResponse> => {
    const response = await KaizenProApi.get<ListImprovementPlansResponse>(
      "/improvementplan/listImprovementPlans"
    );
    return response.data;
  },

  /**
   * PATCH /improvementplan/finalizeImprovementPlan?code={code}
   * Finaliza un plan de mejora existente
   */
  finalizeImprovementPlan: async (
    data: FinalizeImprovementPlanRequest
  ): Promise<FinalizeImprovementPlanResponse> => {
    const response = await KaizenProApi.patch<FinalizeImprovementPlanResponse>(
      `/improvementplan/finalizeImprovementPlan?code=${data.code}`
    );
    return response.data;
  },
};
