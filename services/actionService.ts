import { KaizenProApi } from "@/lib/api/KaizenProApi";
import {
  ListActionsResponse,
  CreateActionRequest,
  CreateActionResponse,
  FinalizeActionRequest,
  FinalizeActionResponse,
} from "@/models/Action";

/**
 * Servicio para gestión de acciones
 */
export const actionService = {
  /**
   * GET /actions/listActions
   * Lista todas las acciones
   */
  listActions: async (): Promise<ListActionsResponse> => {
    const response = await KaizenProApi.get<ListActionsResponse>(
      "/actions/listActions"
    );
    return response.data;
  },

  /**
   * POST /actions/createAction
   * Crea una nueva acción
   */
  createAction: async (
    data: CreateActionRequest
  ): Promise<CreateActionResponse> => {
    const response = await KaizenProApi.post<CreateActionResponse>(
      "/actions/createAction",
      data
    );
    return response.data;
  },

  /**
   * PATCH /actions/finalize
   * Finaliza una acción existente
   */
  finalizeAction: async (
    data: FinalizeActionRequest
  ): Promise<FinalizeActionResponse> => {
    const response = await KaizenProApi.patch<FinalizeActionResponse>(
      "/actions/finalize",
      data
    );
    return response.data;
  },
};
