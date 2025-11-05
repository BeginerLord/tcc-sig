"use client";

import { DashboardMetric } from "@/models/Dashboard";
import { motion } from "framer-motion";
import { BarChart, Bar, ResponsiveContainer } from "recharts";
import { Users, TrendingUp, TrendingDown, BarChart3, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

interface MetricsCardsProps {
  title: string;
  metrics: DashboardMetric[];
  icon: string;
  color: string;
  onMetricClick?: (metric: DashboardMetric) => void;
}

const cardVariants = cva(
  "bg-white rounded-xl shadow-lg overflow-hidden backdrop-blur-sm",
  {
    variants: {
      color: {
        blue: "border-l-4 border-blue-500",
        indigo: "border-l-4 border-indigo-500",
      },
    },
    defaultVariants: {
      color: "blue",
    },
  }
);

const headerVariants = cva(
  "px-6 py-4 border-b",
  {
    variants: {
      color: {
        blue: "bg-gradient-to-r from-blue-50 to-blue-100/50",
        indigo: "bg-gradient-to-r from-indigo-50 to-indigo-100/50",
      },
    },
    defaultVariants: {
      color: "blue",
    },
  }
);

const iconVariants = cva(
  "rounded-lg p-2",
  {
    variants: {
      color: {
        blue: "bg-blue-100",
        indigo: "bg-indigo-100",
      },
    },
    defaultVariants: {
      color: "blue",
    },
  }
);

const textVariants = cva(
  "text-lg font-semibold",
  {
    variants: {
      color: {
        blue: "text-blue-700",
        indigo: "text-indigo-700",
      },
    },
    defaultVariants: {
      color: "blue",
    },
  }
);

const metricCardVariants = cva(
  "relative rounded-xl p-5 border transition-all duration-300 overflow-hidden group",
  {
    variants: {
      color: {
        blue: "bg-gradient-to-br from-blue-50 to-white border-blue-200 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-100",
        indigo: "bg-gradient-to-br from-indigo-50 to-white border-indigo-200 hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-100",
      },
    },
    defaultVariants: {
      color: "blue",
    },
  }
);

// Generate mock trend data for sparkline
const generateTrendData = (value: number) => {
  return Array.from({ length: 7 }, () => ({
    value: Math.floor(value * (0.7 + Math.random() * 0.5)),
  }));
};

export function MetricsCards({ title, metrics, icon, color, onMetricClick }: MetricsCardsProps) {
  const colorType = (color === "blue" || color === "indigo") ? color : "blue";

  const getIconComponent = (metricIndex: number) => {
    const icons = [Users, TrendingUp, Activity, BarChart3, TrendingDown];
    const IconComponent = icons[metricIndex % icons.length];
    return IconComponent;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(cardVariants({ color: colorType }))}
    >
      <div className={cn(headerVariants({ color: colorType }))}>
        <div className="flex items-center gap-3">
          <div className={cn(iconVariants({ color: colorType }))}>
            <span className="text-2xl">{icon}</span>
          </div>
          <h3 className={cn(textVariants({ color: colorType }))}>{title}</h3>
        </div>
      </div>

      <div className="p-6">
        {metrics.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 py-8"
          >
            <BarChart3 className="mx-auto h-12 w-12 text-gray-400 mb-2" />
            <p className="text-sm">No hay datos disponibles</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {metrics.map((metric, index) => {
              const IconComponent = getIconComponent(index);
              const numericValue = parseInt(metric.cantidad) || 0;
              const trendData = generateTrendData(numericValue);

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onMetricClick?.(metric)}
                  className={cn(metricCardVariants({ color: colorType }), "cursor-pointer")}
                >
                  {/* Background gradient on hover */}
                  <div className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                    colorType === "blue" ? "bg-gradient-to-br from-blue-500/5 to-transparent" : "bg-gradient-to-br from-indigo-500/5 to-transparent"
                  )} />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                          {metric.concepto}
                        </p>
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                          className={cn(
                            "text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
                            colorType === "blue" ? "from-blue-600 to-blue-800" : "from-indigo-600 to-indigo-800"
                          )}
                        >
                          {metric.cantidad}
                        </motion.p>
                      </div>
                      <div className={cn(
                        "rounded-full p-2.5 transition-colors duration-300",
                        colorType === "blue" ? "bg-blue-100 group-hover:bg-blue-200" : "bg-indigo-100 group-hover:bg-indigo-200"
                      )}>
                        <IconComponent className={cn(
                          "w-5 h-5",
                          colorType === "blue" ? "text-blue-600" : "text-indigo-600"
                        )} />
                      </div>
                    </div>

                    {/* Mini Sparkline Chart */}
                    <div className="mt-4 h-12">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={trendData}>
                          <Bar
                            dataKey="value"
                            fill={colorType === "blue" ? "#3b82f6" : "#6366f1"}
                            radius={[4, 4, 0, 0]}
                            opacity={0.6}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Trend indicator */}
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className={cn(
                        "w-3 h-3",
                        colorType === "blue" ? "text-blue-500" : "text-indigo-500"
                      )} />
                      <span className="text-xs font-medium text-gray-600">
                        Tendencia actual
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}
