import { KaizenProApi } from "@/lib/api/KaizenProApi";
import {
  CreateTimeframeRequest,
  CreateTimeframeResponse,
  ListTimeframesResponse,
  UpdateTimeframeNameRequest,
  UpdateTimeframeNameResponse,
  UpdateTimeframeExtensionDateRequest,
  UpdateTimeframeExtensionDateResponse,
} from "@/models/Timeframe";

/**
 * Servicio para gestión de periodos de tiempo (timeframes)
 */
export const timeframeService = {
  /**
   * POST /timeframes/createTimeframe
   * Crea un nuevo periodo de tiempo
   */
  createTimeframe: async (
    data: CreateTimeframeRequest
  ): Promise<CreateTimeframeResponse> => {
    const response = await KaizenProApi.post<CreateTimeframeResponse>(
      "/timeframes/createTimeframe",
      data
    );
    return response.data;
  },

  /**
   * GET /timeframes/listTimeframes
   * Lista todos los periodos de tiempo
   */
  listTimeframes: async (): Promise<ListTimeframesResponse> => {
    const response = await KaizenProApi.get<ListTimeframesResponse>(
      "/timeframes/listTimeframes"
    );
    return response.data;
  },

  /**
   * PATCH /timeframes/updateTimeframeName
   * Actualiza el nombre de un periodo de tiempo
   */
  updateTimeframeName: async (
    data: UpdateTimeframeNameRequest
  ): Promise<UpdateTimeframeNameResponse> => {
    const response = await KaizenProApi.patch<UpdateTimeframeNameResponse>(
      "/timeframes/updateTimeframeName",
      data
    );
    return response.data;
  },

  /**
   * PATCH /timeframes/updateTimeframeExtensionDate
   * Actualiza la fecha de extensión de un periodo de tiempo
   */
  updateTimeframeExtensionDate: async (
    data: UpdateTimeframeExtensionDateRequest
  ): Promise<UpdateTimeframeExtensionDateResponse> => {
    const response = await KaizenProApi.patch<UpdateTimeframeExtensionDateResponse>(
      "/timeframes/updateTimeframeExtensionDate",
      data
    );
    return response.data;
  },
};
