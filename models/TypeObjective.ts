// Modelo principal de Tipo de Objetivo
export interface TypeObjective {
  code: number;
  name: string;
  register_date: string;
}

// ============= TYPE OBJECTIVES ENDPOINTS =============

// POST /type-objectives/createTypeObjective
export interface CreateTypeObjectiveRequest {
  name: string;
}

export interface CreateTypeObjectiveResponse {
  success: boolean;
  data: TypeObjective;
}

// GET /type-objectives/listAllTypeObjective
export interface ListTypeObjectivesResponse {
  success: boolean;
  data: TypeObjective[];
}

// PATCH /type-objectives/updateNameTypeObjective
export interface UpdateTypeObjectiveNameRequest {
  code: number;
  name: string;
}

export interface UpdateTypeObjectiveNameResponse {
  success: boolean;
  message: string;
  data: TypeObjective;
}
