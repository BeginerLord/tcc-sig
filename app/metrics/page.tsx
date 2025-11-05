"use client";

import { useDashboard } from "@/hooks/useDashboard";
import { MetricsCards, MetricDetailModal } from "@/components/Metrics";
import { DashboardMetric } from "@/models/Dashboard";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, AlertCircle, RefreshCw, Loader2, Zap, Shield, RotateCw, BarChart3 } from "lucide-react";
import { useState } from "react";

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

    const [selectedMetric, setSelectedMetric] = useState<DashboardMetric | null>(null);
    const [modalTitle, setModalTitle] = useState("");
    const [modalColor, setModalColor] = useState<"blue" | "indigo">("blue");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleMetricClick = (metric: DashboardMetric, title: string, color: "blue" | "indigo") => {
        setSelectedMetric(metric);
        setModalTitle(title);
        setModalColor(color);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            setSelectedMetric(null);
        }, 300);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30">
            {/* Header */}
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-50"
            >
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link
                                href="/dashboard"
                                className="text-gray-600 hover:text-gray-900 transition-all hover:scale-110"
                            >
                                <ArrowLeft className="w-6 h-6" />
                            </Link>
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    📊 Métricas Globales
                                </h1>
                                <p className="text-sm text-gray-600">
                                    Dashboard en tiempo real del sistema
                                </p>
                            </motion.div>
                        </div>

                        {/* Connection Status Badge */}
                        <div className="flex items-center gap-3">
                            {isConnected && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg shadow-sm"
                                >
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm font-medium text-green-700">
                                        Conectado
                                    </span>
                                </motion.div>
                            )}

                            {isConnecting && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-yellow-50 border border-yellow-200 rounded-lg shadow-sm"
                                >
                                    <Loader2 className="w-4 h-4 text-yellow-600 animate-spin" />
                                    <span className="text-sm font-medium text-yellow-700">
                                        Conectando...
                                    </span>
                                </motion.div>
                            )}

                            {hasError && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="flex items-center gap-2"
                                >
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-200 rounded-lg shadow-sm">
                                        <AlertCircle className="w-4 h-4 text-red-500" />
                                        <span className="text-sm font-medium text-red-700">
                                            Error
                                        </span>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={reconnect}
                                        className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
                                    >
                                        <RefreshCw className="w-4 h-4" />
                                        Reconectar
                                    </motion.button>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="space-y-6">
                    {/* Hero Section with Real-time Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden"
                    >
                        {/* Animated background circles */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-4">
                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    className="bg-white/20 backdrop-blur-sm rounded-xl p-4"
                                >
                                    <span className="text-4xl">📊</span>
                                </motion.div>
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                >
                                    <h2 className="text-3xl font-bold mb-2">
                                        Dashboard en Tiempo Real
                                    </h2>
                                    <p className="text-indigo-100 text-lg">
                                        Métricas actualizadas automáticamente mediante Socket.IO
                                    </p>
                                </motion.div>
                            </div>
                            <div className="flex items-center gap-2 mt-4 flex-wrap">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                    className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2"
                                >
                                    <p className="text-sm text-indigo-100">
                                        Estado: <span className="font-semibold text-white">{connectionStatus}</span>
                                    </p>
                                </motion.div>
                                {isConnected && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, delay: 0.7 }}
                                        className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center gap-2"
                                    >
                                        <RefreshCw className="w-4 h-4 animate-spin" />
                                        <p className="text-sm text-indigo-100">
                                            Actualización automática activa
                                        </p>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Error Alert */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 shadow-md"
                        >
                            <div className="flex items-start gap-3">
                                <AlertCircle className="w-6 h-6 text-red-500 mt-0.5" />
                                <div className="flex-1">
                                    <h3 className="text-red-800 font-semibold mb-1">
                                        Error de Conexión
                                    </h3>
                                    <p className="text-red-700 text-sm">{error}</p>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={reconnect}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    Reintentar
                                </motion.button>
                            </div>
                        </motion.div>
                    )}

                    {/* Loading State */}
                    {isConnecting && !dashboardData && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-xl shadow-lg p-12"
                        >
                            <div className="flex flex-col items-center justify-center">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="mb-4"
                                >
                                    <Loader2 className="h-16 w-16 text-indigo-600" />
                                </motion.div>
                                <p className="text-gray-600 font-medium">
                                    Conectando al servidor...
                                </p>
                                <p className="text-gray-500 text-sm mt-2">
                                    Estableciendo conexión Socket.IO
                                </p>
                            </div>
                        </motion.div>
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
                                onMetricClick={(metric) => handleMetricClick(metric, "Métricas de Usuarios", "blue")}
                            />

                            {/* Improvement Data Metrics */}
                            <MetricsCards
                                title="Datos de Mejora"
                                metrics={dashboardData.improvementData || []}
                                icon="📈"
                                color="indigo"
                                onMetricClick={(metric) => handleMetricClick(metric, "Datos de Mejora", "indigo")}
                            />
                        </div>
                    )}

                    {/* Empty State */}
                    {!isConnecting && !dashboardData && !error && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-xl shadow-lg p-12"
                        >
                            <div className="flex flex-col items-center justify-center text-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-full p-6 mb-4"
                                >
                                    <BarChart3 className="w-16 h-16 text-gray-400" />
                                </motion.div>
                                <motion.h3
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-xl font-semibold text-gray-900 mb-2"
                                >
                                    No hay datos disponibles
                                </motion.h3>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-gray-600 mb-4"
                                >
                                    Esperando datos del servidor...
                                </motion.p>
                                <motion.button
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={reconnect}
                                    className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors shadow-md"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    Actualizar
                                </motion.button>
                            </div>
                        </motion.div>
                    )}

                    {/* Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-xl transition-all"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="bg-blue-100 rounded-lg p-2">
                                    <Zap className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="font-semibold text-gray-900">Tiempo Real</h3>
                            </div>
                            <p className="text-sm text-gray-600">
                                Las métricas se actualizan automáticamente mediante WebSocket
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500 hover:shadow-xl transition-all"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="bg-green-100 rounded-lg p-2">
                                    <Shield className="w-6 h-6 text-green-600" />
                                </div>
                                <h3 className="font-semibold text-gray-900">Seguro</h3>
                            </div>
                            <p className="text-sm text-gray-600">
                                Conexión autenticada mediante JWT token
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500 hover:shadow-xl transition-all"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="bg-purple-100 rounded-lg p-2">
                                    <RotateCw className="w-6 h-6 text-purple-600" />
                                </div>
                                <h3 className="font-semibold text-gray-900">Auto-reconexión</h3>
                            </div>
                            <p className="text-sm text-gray-600">
                                Reconexión automática en caso de pérdida de conexión
                            </p>
                        </motion.div>
                    </div>
                </div>
            </main>

            {/* Modal de Detalles */}
            <MetricDetailModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                metric={selectedMetric}
                color={modalColor}
                title={modalTitle}
            />
        </div>
    );
}
