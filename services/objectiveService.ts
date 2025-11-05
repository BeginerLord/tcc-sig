import { KaizenProApi } from "@/lib/api/KaizenProApi";
import {
  CreateObjectiveRequest,
  CreateObjectiveResponse,
  ListObjectivesResponse,
  FinalizeObjectiveRequest,
  FinalizeObjectiveResponse,
} from "@/models/Objective";

/**
 * Servicio para gestión de objetivos
 */
export const objectiveService = {
  /**
   * POST /objectives/createObjective
   * Crea un nuevo objetivo
   */
  createObjective: async (
    data: CreateObjectiveRequest
  ): Promise<CreateObjectiveResponse> => {
    const response = await KaizenProApi.post<CreateObjectiveResponse>(
      "/objectives/createObjective",
      data
    );
    return response.data;
  },

  /**
   * GET /objectives/listObjectives
   * Lista todos los objetivos
   */
  listObjectives: async (): Promise<ListObjectivesResponse> => {
    const response = await KaizenProApi.get<ListObjectivesResponse>(
      "/objectives/listObjectives"
    );
    return response.data;
  },

  /**
   * PATCH /objectives/finalize?code={code}
   * Finaliza un objetivo existente
   */
  finalizeObjective: async (
    data: FinalizeObjectiveRequest
  ): Promise<FinalizeObjectiveResponse> => {
    const response = await KaizenProApi.patch<FinalizeObjectiveResponse>(
      `/objectives/finalize?code=${data.code}`
    );
    return response.data;
  },
};
