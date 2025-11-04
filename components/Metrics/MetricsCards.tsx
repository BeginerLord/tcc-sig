"use client";

import { DashboardMetric } from "@/models/Dashboard";

interface MetricsCardsProps {
  title: string;
  metrics: DashboardMetric[];
  icon: string;
  color: string;
}

export function MetricsCards({ title, metrics, icon, color }: MetricsCardsProps) {
  const getColorClasses = (color: string) => {
    const colors: Record<string, { border: string; bg: string; text: string; iconBg: string }> = {
      blue: {
        border: "border-blue-500",
        bg: "bg-blue-50",
        text: "text-blue-700",
        iconBg: "bg-blue-100",
      },
      indigo: {
        border: "border-indigo-500",
        bg: "bg-indigo-50",
        text: "text-indigo-700",
        iconBg: "bg-indigo-100",
      },
    };
    return colors[color] || colors.blue;
  };

  const colorClasses = getColorClasses(color);

  return (
    <div className={`bg-white rounded-xl shadow-lg border-l-4 ${colorClasses.border} overflow-hidden`}>
      <div className={`${colorClasses.bg} px-6 py-4 border-b`}>
        <div className="flex items-center gap-3">
          <div className={`${colorClasses.iconBg} rounded-lg p-2`}>
            <span className="text-2xl">{icon}</span>
          </div>
          <h3 className={`text-lg font-semibold ${colorClasses.text}`}>{title}</h3>
        </div>
      </div>

      <div className="p-6">
        {metrics.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 mb-2"
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
            <p className="text-sm">No hay datos disponibles</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {metric.concepto}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {metric.cantidad}
                    </p>
                  </div>
                  <div className={`${colorClasses.iconBg} rounded-full p-2 ml-3`}>
                    <svg
                      className={`w-6 h-6 ${colorClasses.text}`}
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
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
