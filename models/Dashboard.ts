// Modelo de métrica individual
export interface DashboardMetric {
  concepto: string;
  cantidad: string;
}

// Modelo principal de Dashboard (métricas en tiempo real)
export interface DashboardData {
  users: DashboardMetric[];
  improvementData: DashboardMetric[];
}

// Eventos de Socket.IO
export type DashboardSocketEvents = {
  "dashboard:update": DashboardData;
  "dashboard:error": { message: string };
  connect: void;
  disconnect: void;
  error: Error;
};

// Estado de conexión
export type ConnectionStatus = "disconnected" | "connecting" | "connected" | "error";
