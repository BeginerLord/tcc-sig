"use client";

import { useImprovementPlans } from "@/hooks/useImprovementPlans";
import { ImprovementPlanForm } from "./ImprovementPlanForm";
import { ImprovementPlanList } from "./ImprovementPlanList";
import { CreateImprovementPlanRequest } from "@/models/ImprovementPlan";

export function ImprovementPlansManagement() {
  const {
    improvementPlans,
    totalPlans,
    isLoadingPlans,
    plansError,
    createImprovementPlan,
    isCreatingPlan,
    finalizeImprovementPlan,
    isFinalizingPlan,
  } = useImprovementPlans();

  const handleCreate = async (data: CreateImprovementPlanRequest) => {
    try {
      await createImprovementPlan(data);
      alert("Plan de mejora creado exitosamente");
    } catch (error: any) {
      alert(error?.response?.data?.message || "Error al crear plan de mejora");
      throw error;
    }
  };

  const handleFinalize = async (code: number) => {
    try {
      await finalizeImprovementPlan({ code });
      alert("Plan de mejora finalizado exitosamente");
    } catch (error: any) {
      alert(error?.response?.data?.message || "Error al finalizar plan de mejora");
      throw error;
    }
  };

  const getActivePlans = () => {
    return improvementPlans.filter((plan) => !plan.finalized).length;
  };

  const getCompletedPlans = () => {
    return improvementPlans.filter((plan) => plan.finalized).length;
  };

  const getCompletionRate = () => {
    if (totalPlans === 0) return 0;
    return Math.round((getCompletedPlans() / totalPlans) * 100);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="bg-rose-600 rounded-xl p-4 text-4xl shadow-lg">📋</div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Gestión de Planes de Mejora
          </h1>
          <p className="text-gray-600 mt-1">
            Administra y da seguimiento a los planes de mejora continua
          </p>
        </div>
      </div>

      {/* Error Alert */}
      {plansError && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                Error al cargar planes de mejora. Por favor, intenta nuevamente.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-rose-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total de Planes</p>
              <p className="text-3xl font-bold text-gray-900">{totalPlans}</p>
            </div>
            <div className="bg-rose-100 rounded-full p-3">
              <svg
                className="w-6 h-6 text-rose-600"
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
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">En Progreso</p>
              <p className="text-3xl font-bold text-gray-900">
                {getActivePlans()}
              </p>
            </div>
            <div className="bg-yellow-100 rounded-full p-3">
              <svg
                className="w-6 h-6 text-yellow-600"
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
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Finalizados</p>
              <p className="text-3xl font-bold text-gray-900">
                {getCompletedPlans()}
              </p>
            </div>
            <div className="bg-green-100 rounded-full p-3">
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Tasa de Completado</p>
              <p className="text-3xl font-bold text-gray-900">
                {getCompletionRate()}%
              </p>
            </div>
            <div className="bg-blue-100 rounded-full p-3">
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <ImprovementPlanForm onSubmit={handleCreate} isLoading={isCreatingPlan} />

      {/* List */}
      <ImprovementPlanList
        improvementPlans={improvementPlans}
        isLoading={isLoadingPlans}
        onFinalize={handleFinalize}
        isFinalizing={isFinalizingPlan}
      />
    </div>
  );
}
