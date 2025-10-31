"use client";

import { useDashboard } from "@/hooks/useDashboard";
import { DashboardMetric } from "@/models/Dashboard";

export function Dashboard() {
  const {
    dashboardData,
    connectionStatus,
    error,
    isConnected,
    isConnecting,
    hasError,
    reconnect,
  } = useDashboard();

  // Función para obtener color del badge de estado
  const getStatusBadge = () => {
    switch (connectionStatus) {
      case "connected":
        return (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Conectado
          </span>
        );
      case "connecting":
        return (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 flex items-center gap-2">
            <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
            Conectando...
          </span>
        );
      case "disconnected":
        return (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
            Desconectado
          </span>
        );
      case "error":
        return (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
            Error
          </span>
        );
    }
  };

  // Renderizar tarjeta de métrica
  const MetricCard = ({ metric }: { metric: DashboardMetric }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <p className="text-sm font-medium text-gray-600 mb-2">{metric.concepto}</p>
      <p className="text-4xl font-bold text-gray-900">{metric.cantidad}</p>
    </div>
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Dashboard en Tiempo Real
            </h1>
            <p className="text-gray-600 mt-1">
              Métricas actualizadas mediante Socket.IO
            </p>
          </div>
          <div className="flex items-center gap-4">
            {getStatusBadge()}
            {(connectionStatus === "disconnected" || hasError) && (
              <button
                onClick={reconnect}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
              >
                Reconectar
              </button>
            )}
          </div>
        </div>

        {/* Información de conexión */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <span className="text-xl">ℹ️</span>
            Información de Socket.IO
          </h3>
          <div className="text-sm text-blue-800 space-y-1">
            <p>
              • <strong>Protocolo:</strong> Socket.IO (WebSocket con fallback)
            </p>
            <p>
              • <strong>Autenticación:</strong> JWT Token en query string
            </p>
            <p>
              • <strong>Reconexión:</strong> Automática (hasta 5 intentos)
            </p>
            <p>
              • <strong>Eventos:</strong> dashboard:update, dashboard:error
            </p>
          </div>
        </div>
      </div>

      {/* Mensaje de error */}
      {error && (
        <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h3 className="font-semibold text-red-900 mb-1">
                Error de Conexión
              </h3>
              <p className="text-sm text-red-800">{error}</p>
              {!isConnected && (
                <button
                  onClick={reconnect}
                  className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
                >
                  Intentar Reconectar
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Estado de carga */}
      {isConnecting && !dashboardData && (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Conectando al servidor...</p>
          </div>
        </div>
      )}

      {/* Datos del Dashboard */}
      {dashboardData && (
        <div className="space-y-8">
          {/* Métricas de Usuarios */}
          {dashboardData.users && dashboardData.users.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-3xl">👥</span>
                Usuarios
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dashboardData.users.map((metric, index) => (
                  <MetricCard key={`user-${index}`} metric={metric} />
                ))}
              </div>
            </div>
          )}

          {/* Métricas de Planes de Mejora */}
          {dashboardData.improvementData &&
            dashboardData.improvementData.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-3xl">📈</span>
                  Planes de Mejora
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dashboardData.improvementData.map((metric, index) => (
                    <MetricCard key={`improvement-${index}`} metric={metric} />
                  ))}
                </div>
              </div>
            )}
        </div>
      )}

      {/* Estado sin datos */}
      {!isConnecting && !dashboardData && !hasError && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Esperando datos del servidor
          </h3>
          <p className="text-gray-600">
            Las métricas aparecerán aquí cuando el servidor envíe actualizaciones
          </p>
        </div>
      )}

      {/* Footer con información técnica */}
      <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-3">
          Detalles Técnicos de la Conexión
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600 mb-1">
              <strong>Estado:</strong>{" "}
              <span className="font-mono">{connectionStatus}</span>
            </p>
            <p className="text-gray-600 mb-1">
              <strong>URL Base:</strong>{" "}
              <span className="font-mono text-xs">
                {process.env.NEXT_PUBLIC_API_URL || "No configurada"}
              </span>
            </p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">
              <strong>Endpoint:</strong>{" "}
              <span className="font-mono text-xs">/dashboard</span>
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Última actualización:</strong>{" "}
              {dashboardData ? new Date().toLocaleTimeString("es-ES") : "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Indicador de actualización en tiempo real */}
      {isConnected && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Actualizándose en tiempo real
          </p>
        </div>
      )}
    </div>
  );
}
