// Modelo principal de Plan de Mejora
export interface ImprovementPlan {
  code: number;
  title: string;
  description: string;
  comment: string;
  code_timeframes: number;
  finalized?: boolean;
  finalized_date?: string;
  created_date?: string;
}

// ============= IMPROVEMENT PLANS ENDPOINTS =============

// POST /improvementplan/createImprovementPlan
export interface CreateImprovementPlanRequest {
  title: string;
  description: string;
  comment: string;
  code_timeframes: number;
}

export interface CreateImprovementPlanResponse {
  success: boolean;
  message?: string;
  data?: ImprovementPlan;
}

// GET /improvementplan/listImprovementPlans
export interface ListImprovementPlansResponse {
  success: boolean;
  data: ImprovementPlan[];
  total?: number;
}

// PATCH /improvementplan/finalizeImprovementPlan
export interface FinalizeImprovementPlanRequest {
  code: number;
}

export interface FinalizeImprovementPlanResponse {
  success: boolean;
  message: string;
  data?: ImprovementPlan;
}
