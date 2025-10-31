// Modelo principal de Acción
export interface Action {
  code: number;
  code_improvement: number;
  code_objective: number;
  title: string;
  description: string;
  finalized?: boolean;
  finalized_date?: string;
  created_date?: string;
}

// ============= ACTIONS ENDPOINTS =============

// GET /actions/listActions
export interface ListActionsResponse {
  success: boolean;
  data: Action[];
  total?: number;
}

// POST /actions/createAction
export interface CreateActionRequest {
  code_improvement: number;
  code_objective: number;
  title: string;
  description: string;
}

export interface CreateActionResponse {
  success: boolean;
  message?: string;
  data?: Action;
}

// PATCH /actions/finalize
export interface FinalizeActionRequest {
  code: number;
}

export interface FinalizeActionResponse {
  success: boolean;
  message: string;
  data?: Action;
}
