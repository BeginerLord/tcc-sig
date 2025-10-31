// Modelo principal de Periodo de Tiempo (Timeframe)
export interface Timeframe {
  code: number;
  name: string;
  start_date: string; // Formato: YYYY-MM-DD
  final_date: string; // Formato: YYYY-MM-DD
  extension_date?: string; // Fecha de extensión opcional
  register_date?: string;
}

// ============= TIMEFRAMES ENDPOINTS =============

// POST /timeframes/createTimeframe
export interface CreateTimeframeRequest {
  name: string;
  start_date: string; // Formato: YYYY-MM-DD
  final_date: string; // Formato: YYYY-MM-DD
}

export interface CreateTimeframeResponse {
  success: boolean;
  message?: string;
  data?: Timeframe;
}

// GET /timeframes/listTimeframes
export interface ListTimeframesResponse {
  success: boolean;
  data: Timeframe[];
}

// PATCH /timeframes/updateTimeframeName
export interface UpdateTimeframeNameRequest {
  code: number;
  name: string;
}

export interface UpdateTimeframeNameResponse {
  success: boolean;
  message?: string;
  data?: Timeframe;
}

// PATCH /timeframes/updateTimeframeExtensionDate
export interface UpdateTimeframeExtensionDateRequest {
  code: number;
  extension_date: string; // Formato: YYYY-MM-DD o date string
}

export interface UpdateTimeframeExtensionDateResponse {
  success: boolean;
  message?: string;
  data?: Timeframe;
}
