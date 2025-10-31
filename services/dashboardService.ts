import { io, Socket } from "socket.io-client";
import { DashboardData } from "@/models/Dashboard";

/**
 * Servicio para conexión Socket.IO con el Dashboard de KaizenPro
 */
export const dashboardService = {
  /**
   * Crea y configura una conexión Socket.IO al Dashboard
   * @param token - JWT token de autenticación
   * @returns Socket.IO instance configurada
   */
  createConnection: (token: string): Socket => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    if (!API_URL) {
      throw new Error("NEXT_PUBLIC_API_URL no está configurada");
    }

    // Construir URL del socket con el token en query string
    // API_URL ejemplo: "http://localhost:3001/api/v1/kaizenpro"
    // Necesitamos: "http://localhost:3001" + "/api/v1/kaizenpro/dashboard?token=..."
    const socketURL = `${API_URL}/dashboard?token=${token}`;

    console.log("🔌 Conectando a Socket.IO Dashboard:", socketURL);

    // Crear y retornar conexión Socket.IO
    const socket = io(socketURL, {
      transports: ["websocket", "polling"], // WebSocket primero, fallback a polling
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 10000,
    });

    return socket;
  },

  /**
   * Configura los listeners de eventos para el dashboard
   * @param socket - Socket.IO instance
   * @param callbacks - Funciones callback para cada evento
   */
  setupListeners: (
    socket: Socket,
    callbacks: {
      onConnect: () => void;
      onDisconnect: (reason: string) => void;
      onDashboardUpdate: (data: DashboardData) => void;
      onDashboardError: (error: { message: string }) => void;
      onConnectError: (error: Error) => void;
      onReconnectAttempt: (attemptNumber: number) => void;
      onReconnect: (attemptNumber: number) => void;
      onReconnectFailed: () => void;
    }
  ) => {
    socket.on("connect", callbacks.onConnect);
    socket.on("disconnect", callbacks.onDisconnect);
    socket.on("dashboard:update", callbacks.onDashboardUpdate);
    socket.on("dashboard:error", callbacks.onDashboardError);
    socket.on("connect_error", callbacks.onConnectError);
    socket.on("reconnect_attempt", callbacks.onReconnectAttempt);
    socket.on("reconnect", callbacks.onReconnect);
    socket.on("reconnect_failed", callbacks.onReconnectFailed);
  },

  /**
   * Desconecta el socket
   * @param socket - Socket.IO instance
   */
  disconnect: (socket: Socket) => {
    if (socket && socket.connected) {
      console.log("🔌 Desconectando Socket.IO");
      socket.disconnect();
    }
  },

  /**
   * Reconecta el socket
   * @param socket - Socket.IO instance
   */
  reconnect: (socket: Socket) => {
    if (socket && !socket.connected) {
      console.log("🔄 Reconectando Socket.IO");
      socket.connect();
    }
  },
};
