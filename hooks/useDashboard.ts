"use client";

import { useEffect, useState, useRef } from "react";
import { Socket } from "socket.io-client";
import { DashboardData, ConnectionStatus } from "@/models/Dashboard";
import { dashboardService } from "@/services/dashboardService";

/**
 * Hook personalizado para conectarse al Dashboard de KaizenPro mediante Socket.IO
 *
 * Características:
 * - Conexión en tiempo real con Socket.IO
 * - Autenticación mediante query string con JWT token
 * - Reconexión automática
 * - Eventos: dashboard:update y dashboard:error
 */
export function useDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("disconnected");
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window === "undefined") return;

    // Obtener el token de sessionStorage
    const token = sessionStorage.getItem("token");

    if (!token) {
      setConnectionStatus("error");
      setError("No se encontró token de autenticación. Por favor, inicia sesión.");
      return;
    }

    try {
      // Crear conexión mediante el servicio
      setConnectionStatus("connecting");
      const socket = dashboardService.createConnection(token);
      socketRef.current = socket;

      // Configurar listeners mediante el servicio
      dashboardService.setupListeners(socket, {
        onConnect: () => {
          console.log("✅ Conectado al Dashboard (Socket.IO)");
          setConnectionStatus("connected");
          setError(null);
        },
        onDisconnect: (reason) => {
          console.log("🔌 Desconectado del servidor. Razón:", reason);
          setConnectionStatus("disconnected");

          if (reason === "io server disconnect") {
            // El servidor desconectó el socket, reconectar manualmente
            socket.connect();
          }
        },
        onDashboardUpdate: (data: DashboardData) => {
          console.log("📊 Datos del Dashboard recibidos:", data);
          setDashboardData(data);
          setError(null);
        },
        onDashboardError: (err: { message: string }) => {
          console.error("❌ Error del Dashboard:", err.message);
          setError(err.message);
        },
        onConnectError: (err: Error) => {
          console.error("❌ Error de conexión Socket.IO:", err.message);
          setConnectionStatus("error");
          setError(`Error de conexión: ${err.message}`);
        },
        onReconnectAttempt: (attemptNumber: number) => {
          console.log(`🔄 Intento de reconexión #${attemptNumber}`);
          setConnectionStatus("connecting");
        },
        onReconnect: (attemptNumber: number) => {
          console.log(`✅ Reconectado exitosamente después de ${attemptNumber} intentos`);
          setConnectionStatus("connected");
          setError(null);
        },
        onReconnectFailed: () => {
          console.error("❌ Falló la reconexión al servidor");
          setConnectionStatus("error");
          setError("No se pudo reconectar al servidor después de varios intentos");
        },
      });
    } catch (err: any) {
      console.error("❌ Error al crear conexión:", err);
      setConnectionStatus("error");
      setError(err.message);
    }

    // Cleanup al desmontar el componente
    return () => {
      console.log("🧹 Limpiando conexión Socket.IO");
      if (socketRef.current) {
        dashboardService.disconnect(socketRef.current);
        socketRef.current = null;
      }
    };
  }, []); // Solo ejecutar una vez al montar

  // Función para reconectar manualmente
  const reconnect = () => {
    if (socketRef.current) {
      console.log("🔄 Reconectando manualmente...");
      setConnectionStatus("connecting");
      dashboardService.reconnect(socketRef.current);
    }
  };

  // Función para desconectar manualmente
  const disconnect = () => {
    if (socketRef.current) {
      console.log("🔌 Desconectando manualmente...");
      dashboardService.disconnect(socketRef.current);
      setConnectionStatus("disconnected");
    }
  };

  return {
    dashboardData,
    connectionStatus,
    error,
    isConnected: connectionStatus === "connected",
    isConnecting: connectionStatus === "connecting",
    isDisconnected: connectionStatus === "disconnected",
    hasError: connectionStatus === "error",
    reconnect,
    disconnect,
  };
}
