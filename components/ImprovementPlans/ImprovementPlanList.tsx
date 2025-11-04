"use client";

import { ImprovementPlan } from "@/models/ImprovementPlan";

interface ImprovementPlanListProps {
  improvementPlans: ImprovementPlan[];
  isLoading: boolean;
  onFinalize: (code: number) => Promise<void>;
  isFinalizing: boolean;
}

export function ImprovementPlanList({
  improvementPlans,
  isLoading,
  onFinalize,
  isFinalizing,
}: ImprovementPlanListProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  const handleFinalize = async (plan: ImprovementPlan) => {
    if (plan.finalized) {
      alert("Este plan ya está finalizado");
      return;
    }

    if (
      window.confirm(
        `¿Estás seguro de que deseas finalizar el plan "${plan.title}"?`
      )
    ) {
      try {
        await onFinalize(plan.code);
      } catch (error) {
        console.error("Error al finalizar plan de mejora:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
          <p className="ml-4 text-gray-600">Cargando planes de mejora...</p>
        </div>
      </div>
    );
  }

  if (improvementPlans.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center text-gray-500">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="mt-4 text-lg font-medium">No hay planes de mejora registrados</p>
          <p className="mt-2 text-sm">
            Crea tu primer plan usando el formulario de arriba
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {improvementPlans.map((plan) => (
        <div
          key={plan.code}
          className={`bg-white rounded-xl shadow-md overflow-hidden border-l-4 ${
            plan.finalized ? "border-green-500 opacity-75" : "border-rose-500"
          } transition-all hover:shadow-lg`}
        >
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4 flex-1">
                <div
                  className={`flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center ${
                    plan.finalized ? "bg-green-100" : "bg-rose-100"
                  }`}
                >
                  <span
                    className={`font-semibold ${
                      plan.finalized ? "text-green-600" : "text-rose-600"
                    }`}
                  >
                    #{plan.code}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">
                      {plan.title}
                    </h3>
                    {plan.finalized ? (
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Finalizado
                      </span>
                    ) : (
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        En Progreso
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{plan.description}</p>

                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <p className="text-xs font-medium text-gray-700 mb-1">
                      Comentario:
                    </p>
                    <p className="text-sm text-gray-600">{plan.comment}</p>
                  </div>

                  <div className="flex flex-wrap gap-3 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="font-medium">Periodo:</span>
                      <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                        #{plan.code_timeframes}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="font-medium">Creado:</span>
                      <span>{formatDate(plan.created_date)}</span>
                    </div>
                    {plan.finalized && plan.finalized_date && (
                      <div className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="font-medium">Finalizado:</span>
                        <span>{formatDate(plan.finalized_date)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0 ml-4">
                {!plan.finalized && (
                  <button
                    onClick={() => handleFinalize(plan)}
                    disabled={isFinalizing}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Finalizar
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
