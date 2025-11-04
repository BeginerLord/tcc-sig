"use client";

import { Objective } from "@/models/Objective";

interface ObjectiveListProps {
  objectives: Objective[];
  isLoading: boolean;
  onFinalize: (code: number) => Promise<void>;
  isFinalizing: boolean;
}

export function ObjectiveList({
  objectives,
  isLoading,
  onFinalize,
  isFinalizing,
}: ObjectiveListProps) {
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

  const handleFinalize = async (objective: Objective) => {
    if (objective.finalized) {
      alert("Este objetivo ya está finalizado");
      return;
    }

    if (
      window.confirm(
        `¿Estás seguro de que deseas finalizar este objetivo?`
      )
    ) {
      try {
        await onFinalize(objective.code);
      } catch (error) {
        console.error("Error al finalizar objetivo:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
          <p className="ml-4 text-gray-600">Cargando objetivos...</p>
        </div>
      </div>
    );
  }

  if (objectives.length === 0) {
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
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
          <p className="mt-4 text-lg font-medium">No hay objetivos registrados</p>
          <p className="mt-2 text-sm">
            Crea tu primer objetivo usando el formulario de arriba
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Lista de Objetivos ({objectives.length})
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Código
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contenido
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Plan/Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha Creación
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {objectives.map((objective) => (
              <tr
                key={objective.code}
                className={`hover:bg-gray-50 transition-colors ${
                  objective.finalized ? "opacity-75" : ""
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-teal-100 rounded-full flex items-center justify-center">
                      <span className="text-teal-600 font-semibold text-sm">
                        #{objective.code}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-md">
                    {objective.body}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="font-medium">Plan:</span>
                      <span className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded text-xs">
                        #{objective.code_improvement}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">Tipo:</span>
                      <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">
                        #{objective.code_type}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {objective.finalized ? (
                    <div className="space-y-1">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Finalizado
                      </span>
                      <div className="text-xs text-gray-500">
                        {formatDate(objective.finalized_date)}
                      </div>
                    </div>
                  ) : (
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      En Progreso
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {formatDate(objective.created_date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {!objective.finalized && (
                    <button
                      onClick={() => handleFinalize(objective)}
                      disabled={isFinalizing}
                      className="inline-flex items-center gap-1 text-green-600 hover:text-green-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
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
                  {objective.finalized && (
                    <span className="text-gray-400 text-xs">Completado</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
