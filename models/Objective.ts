// Modelo principal de Objetivo
export interface Objective {
  code: number;
  code_improvement: number;
  code_type: number;
  body: string;
  finalized?: boolean;
  finalized_date?: string;
  created_date?: string;
}

// ============= OBJECTIVES ENDPOINTS =============

// POST /objectives/createObjective
export interface CreateObjectiveRequest {
  code_improvement: number;
  code_type: number;
  body: string;
}

export interface CreateObjectiveResponse {
  success: boolean;
  message?: string;
  data?: Objective;
}

// GET /objectives/listObjectives
export interface ListObjectivesResponse {
  success: boolean;
  data: Objective[];
  total?: number;
}

// PATCH /objectives/finalize
export interface FinalizeObjectiveRequest {
  code: number;
}

export interface FinalizeObjectiveResponse {
  success: boolean;
  message: string;
  data?: Objective;
}
