"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, TrendingUp, Calendar, BarChart3, Activity } from "lucide-react";
import { DashboardMetric } from "@/models/Dashboard";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { cn } from "@/lib/utils";

interface MetricDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  metric: DashboardMetric | null;
  color: "blue" | "indigo";
  title: string;
}

// Generar datos históricos simulados
const generateHistoricalData = (currentValue: number) => {
  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul"];
  return months.map((month, index) => ({
    month,
    valor: Math.floor(currentValue * (0.6 + (index / months.length) * 0.4 + Math.random() * 0.1)),
    proyección: Math.floor(currentValue * (0.7 + (index / months.length) * 0.5)),
  }));
};

// Generar datos semanales
const generateWeeklyData = (currentValue: number) => {
  const days = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
  return days.map((day) => ({
    day,
    valor: Math.floor(currentValue * (0.8 + Math.random() * 0.3)),
  }));
};

export function MetricDetailModal({
  isOpen,
  onClose,
  metric,
  color,
  title,
}: MetricDetailModalProps) {
  if (!metric) return null;

  const numericValue = parseInt(metric.cantidad) || 0;
  const historicalData = generateHistoricalData(numericValue);
  const weeklyData = generateWeeklyData(numericValue);

  const chartColor = color === "blue" ? "#3b82f6" : "#6366f1";
  const chartColorLight = color === "blue" ? "#93c5fd" : "#a5b4fc";

  // Calcular estadísticas
  const average = Math.floor(historicalData.reduce((acc, curr) => acc + curr.valor, 0) / historicalData.length);
  const trend = historicalData[historicalData.length - 1].valor - historicalData[0].valor;
  const trendPercentage = ((trend / historicalData[0].valor) * 100).toFixed(1);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className={cn(
                "sticky top-0 z-10 px-6 py-5 border-b flex items-center justify-between",
                color === "blue" ? "bg-gradient-to-r from-blue-50 to-blue-100" : "bg-gradient-to-r from-indigo-50 to-indigo-100"
              )}>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {metric.concepto}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">{title}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className={cn(
                    "p-2 rounded-full transition-colors",
                    color === "blue" ? "hover:bg-blue-200" : "hover:bg-indigo-200"
                  )}
                >
                  <X className="w-6 h-6 text-gray-700" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Valor Principal y Estadísticas */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className={cn(
                      "p-6 rounded-xl border-2",
                      color === "blue" ? "bg-blue-50 border-blue-200" : "bg-indigo-50 border-indigo-200"
                    )}
                  >
                    <p className="text-sm font-medium text-gray-600 mb-2">Valor Actual</p>
                    <p className={cn(
                      "text-4xl font-bold",
                      color === "blue" ? "text-blue-600" : "text-indigo-600"
                    )}>
                      {metric.cantidad}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <p className="text-sm font-medium text-gray-600">Tendencia</p>
                    </div>
                    <p className="text-2xl font-bold text-green-600">
                      {trend > 0 ? "+" : ""}{trendPercentage}%
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-violet-50 border-2 border-purple-200"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-4 h-4 text-purple-600" />
                      <p className="text-sm font-medium text-gray-600">Promedio</p>
                    </div>
                    <p className="text-2xl font-bold text-purple-600">{average}</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="p-6 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-orange-600" />
                      <p className="text-sm font-medium text-gray-600">Período</p>
                    </div>
                    <p className="text-xl font-bold text-orange-600">7 meses</p>
                  </motion.div>
                </div>

                {/* Gráfica de Líneas - Tendencia Histórica */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white rounded-xl border-2 border-gray-200 p-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className={cn("w-5 h-5", color === "blue" ? "text-blue-600" : "text-indigo-600")} />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Tendencia Histórica (Últimos 7 Meses)
                    </h3>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={historicalData}>
                      <defs>
                        <linearGradient id={`colorValor-${color}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
                          <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "2px solid #e5e7eb",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="valor"
                        stroke={chartColor}
                        strokeWidth={3}
                        fillOpacity={1}
                        fill={`url(#colorValor-${color})`}
                        name="Valor Real"
                      />
                      <Line
                        type="monotone"
                        dataKey="proyección"
                        stroke={chartColorLight}
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Proyección"
                        dot={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </motion.div>

                {/* Gráfica de Barras - Actividad Semanal */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white rounded-xl border-2 border-gray-200 p-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart3 className={cn("w-5 h-5", color === "blue" ? "text-blue-600" : "text-indigo-600")} />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Actividad Semanal
                    </h3>
                  </div>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="day" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "2px solid #e5e7eb",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar
                        dataKey="valor"
                        fill={chartColor}
                        radius={[8, 8, 0, 0]}
                        name="Valor"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>

                {/* Información Adicional */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className={cn(
                    "rounded-xl p-6",
                    color === "blue" ? "bg-blue-50 border-2 border-blue-200" : "bg-indigo-50 border-2 border-indigo-200"
                  )}
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Análisis y Recomendaciones
                  </h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>
                      • <strong>Estado:</strong> {trend > 0 ? "Crecimiento positivo" : "Requiere atención"} en los últimos meses
                    </p>
                    <p>
                      • <strong>Desempeño:</strong> {numericValue > average ? "Por encima" : "Por debajo"} del promedio histórico
                    </p>
                    <p>
                      • <strong>Recomendación:</strong> {trend > 0 ? "Mantener las estrategias actuales" : "Implementar mejoras"}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
