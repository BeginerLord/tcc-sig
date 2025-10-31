import { KaizenProApi } from "@/lib/api/KaizenProApi";
import {
  CreateTypeObjectiveRequest,
  CreateTypeObjectiveResponse,
  ListTypeObjectivesResponse,
  UpdateTypeObjectiveNameRequest,
  UpdateTypeObjectiveNameResponse,
} from "@/models/TypeObjective";

/**
 * Servicio para gestión de tipos de objetivos
 */
export const typeObjectiveService = {
  /**
   * POST /type-objectives/createTypeObjective
   * Crea un nuevo tipo de objetivo
   */
  createTypeObjective: async (
    data: CreateTypeObjectiveRequest
  ): Promise<CreateTypeObjectiveResponse> => {
    const response = await KaizenProApi.post<CreateTypeObjectiveResponse>(
      "/type-objectives/createTypeObjective",
      data
    );
    return response.data;
  },

  /**
   * GET /type-objectives/listAllTypeObjective
   * Lista todos los tipos de objetivos
   */
  listAllTypeObjectives: async (): Promise<ListTypeObjectivesResponse> => {
    const response = await KaizenProApi.get<ListTypeObjectivesResponse>(
      "/type-objectives/listAllTypeObjective"
    );
    return response.data;
  },

  /**
   * PATCH /type-objectives/updateNameTypeObjective
   * Actualiza el nombre de un tipo de objetivo
   */
  updateTypeObjectiveName: async (
    data: UpdateTypeObjectiveNameRequest
  ): Promise<UpdateTypeObjectiveNameResponse> => {
    const response = await KaizenProApi.patch<UpdateTypeObjectiveNameResponse>(
      "/type-objectives/updateNameTypeObjective",
      data
    );
    return response.data;
  },
};
