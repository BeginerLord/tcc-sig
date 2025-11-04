"use client";

import { useDashboard } from "@/hooks/useDashboard";
import { MetricsCards } from "@/components/Metrics/MetricsCards";
import Link from "next/link";

export default function MetricsPage() {
    const {
        dashboardData,
        connectionStatus,
        error,
        isConnected,
        isConnecting,
        hasError,
        reconnect,
    } = useDashboard();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link
                                href="/dashboard"
                                className="text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                    />
                                </svg>
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    📊 Métricas Globales
                                </h1>
                                <p className="text-sm text-gray-600">
                                    Dashboard en tiempo real del sistema
                                </p>
                            </div>
                        </div>

                        {/* Connection Status Badge */}
                        <div className="flex items-center gap-3">
                            {isConnected && (
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm font-medium text-green-700">
                                        Conectado
                                    </span>
                                </div>
                            )}

                            {isConnecting && (
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-50 border border-yellow-200 rounded-lg">
                                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm font-medium text-yellow-700">
                                        Conectando...
                                    </span>
                                </div>
                            )}

                            {hasError && (
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-200 rounded-lg">
                                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                        <span className="text-sm font-medium text-red-700">
                                            Error
                                        </span>
                                    </div>
                                    <button
                                        onClick={reconnect}
                                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                                    >
                                        Reconectar
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="space-y-6">
                    {/* Hero Section with Real-time Info */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                                <span className="text-4xl">📊</span>
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold mb-2">
                                    Dashboard en Tiempo Real
                                </h2>
                                <p className="text-indigo-100 text-lg">
                                    Métricas actualizadas automáticamente mediante Socket.IO
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                                <p className="text-sm text-indigo-100">
                                    Estado: <span className="font-semibold text-white">{connectionStatus}</span>
                                </p>
                            </div>
                            {isConnected && (
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                                    <p className="text-sm text-indigo-100">
                                        🔄 Actualización automática activa
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Error Alert */}
                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <svg
                                    className="w-6 h-6 text-red-500 mt-0.5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <div className="flex-1">
                                    <h3 className="text-red-800 font-semibold mb-1">
                                        Error de Conexión
                                    </h3>
                                    <p className="text-red-700 text-sm">{error}</p>
                                </div>
                                <button
                                    onClick={reconnect}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
                                >
                                    Reintentar
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Loading State */}
                    {isConnecting && !dashboardData && (
                        <div className="bg-white rounded-xl shadow-lg p-12">
                            <div className="flex flex-col items-center justify-center">
                                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mb-4"></div>
                                <p className="text-gray-600 font-medium">
                                    Conectando al servidor...
                                </p>
                                <p className="text-gray-500 text-sm mt-2">
                                    Estableciendo conexión Socket.IO
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Metrics Grid */}
                    {dashboardData && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Usuarios Metrics */}
                            <MetricsCards
                                title="Métricas de Usuarios"
                                metrics={dashboardData.users || []}
                                icon="👥"
                                color="blue"
                            />

                            {/* Improvement Data Metrics */}
                            <MetricsCards
                                title="Datos de Mejora"
                                metrics={dashboardData.improvementData || []}
                                icon="📈"
                                color="indigo"
                            />
                        </div>
                    )}

                    {/* Empty State */}
                    {!isConnecting && !dashboardData && !error && (
                        <div className="bg-white rounded-xl shadow-lg p-12">
                            <div className="flex flex-col items-center justify-center text-center">
                                <div className="bg-gray-100 rounded-full p-6 mb-4">
                                    <svg
                                        className="w-16 h-16 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    No hay datos disponibles
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Esperando datos del servidor...
                                </p>
                                <button
                                    onClick={reconnect}
                                    className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
                                >
                                    Actualizar
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="bg-blue-100 rounded-lg p-2">
                                    <svg
                                        className="w-6 h-6 text-blue-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 10V3L4 14h7v7l9-11h-7z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-gray-900">Tiempo Real</h3>
                            </div>
                            <p className="text-sm text-gray-600">
                                Las métricas se actualizan automáticamente mediante WebSocket
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="bg-green-100 rounded-lg p-2">
                                    <svg
                                        className="w-6 h-6 text-green-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-gray-900">Seguro</h3>
                            </div>
                            <p className="text-sm text-gray-600">
                                Conexión autenticada mediante JWT token
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="bg-purple-100 rounded-lg p-2">
                                    <svg
                                        className="w-6 h-6 text-purple-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                        />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-gray-900">Auto-reconexión</h3>
                            </div>
                            <p className="text-sm text-gray-600">
                                Reconexión automática en caso de pérdida de conexión
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
