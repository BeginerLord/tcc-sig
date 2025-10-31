"use client";

import { useImprovementPlans } from "@/hooks/useImprovementPlans";
import { useState } from "react";
import { ImprovementPlan } from "@/models/ImprovementPlan";

export function ImprovementPlanManagement() {
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

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    comment: "",
    code_timeframes: "",
  });

  const handleCreatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createImprovementPlan({
        title: formData.title,
        description: formData.description,
        comment: formData.comment,
        code_timeframes: parseInt(formData.code_timeframes),
      });
      alert("Plan de mejora creado exitosamente");
      setFormData({
        title: "",
        description: "",
        comment: "",
        code_timeframes: "",
      });
      setShowCreateForm(false);
    } catch (error: any) {
      alert(
        `Error al crear plan de mejora: ${
          error.response?.data?.message || error.message
        }`
      );
      console.error(error);
    }
  };

  const handleFinalizePlan = async (plan: ImprovementPlan) => {
    if (plan.finalized) {
      alert("Este plan ya está finalizado");
      return;
    }

    if (
      !confirm(
        `¿Estás seguro de finalizar el plan "${plan.title}"? Esta acción no se puede deshacer.`
      )
    ) {
      return;
    }

    try {
      await finalizeImprovementPlan({ code: plan.code });
      alert("Plan de mejora finalizado exitosamente");
    } catch (error: any) {
      alert(
        `Error al finalizar plan: ${
          error.response?.data?.message || error.message
        }`
      );
      console.error(error);
    }
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoadingPlans) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center">
          <div className="text-lg">Cargando planes de mejora...</div>
        </div>
      </div>
    );
  }

  if (plansError) {
    return (
      <div className="p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error al cargar planes de mejora</p>
          <p>{(plansError as any).message}</p>
        </div>
      </div>
    );
  }

  // Separar planes finalizados y pendientes
  const pendingPlans = improvementPlans.filter((plan) => !plan.finalized);
  const finalizedPlans = improvementPlans.filter((plan) => plan.finalized);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold">Gestión de Planes de Mejora</h1>
            <p className="text-gray-600 mt-1">
              Total: {totalPlans} | Pendientes: {pendingPlans.length} |
              Finalizados: {finalizedPlans.length}
            </p>
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            {showCreateForm ? "Cancelar" : "Nuevo Plan de Mejora"}
          </button>
        </div>

        {/* Formulario de creación */}
        {showCreateForm && (
          <div className="bg-white border rounded-lg p-6 mb-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">
              Crear Nuevo Plan de Mejora
            </h2>
            <form onSubmit={handleCreatePlan} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Título *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: Mejorar eficiencia de procesos"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Descripción *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: Reducir el tiempo de respuesta de solicitudes internas"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Comentario *
                </label>
                <textarea
                  value={formData.comment}
                  onChange={(e) =>
                    setFormData({ ...formData, comment: e.target.value })
                  }
                  rows={2}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: Plan creado tras análisis de indicadores"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Código de Periodo (Timeframe) *
                </label>
                <input
                  type="number"
                  value={formData.code_timeframes}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      code_timeframes: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: 3"
                  required
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isCreatingPlan}
                  className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:bg-gray-400"
                >
                  {isCreatingPlan ? "Creando..." : "Crear Plan de Mejora"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Planes Pendientes */}
      {pendingPlans.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-orange-600">
            Planes Pendientes ({pendingPlans.length})
          </h2>
          <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Código
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Título
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Descripción
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Comentario
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Periodo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pendingPlans.map((plan) => (
                    <tr key={plan.code} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">
                          {plan.code}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900 max-w-xs">
                          {plan.title}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 max-w-md">
                          {plan.description}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 max-w-md">
                          {plan.comment}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600">
                          {plan.code_timeframes}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                          Pendiente
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleFinalizePlan(plan)}
                          disabled={isFinalizingPlan}
                          className="text-green-600 hover:text-green-900 disabled:opacity-50"
                        >
                          Finalizar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Planes Finalizados */}
      {finalizedPlans.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-green-600">
            Planes Finalizados ({finalizedPlans.length})
          </h2>
          <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Código
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Título
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Descripción
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Comentario
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Periodo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha Finalización
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {finalizedPlans.map((plan) => (
                    <tr
                      key={plan.code}
                      className="hover:bg-gray-50 opacity-75"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">
                          {plan.code}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900 max-w-xs">
                          {plan.title}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 max-w-md">
                          {plan.description}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 max-w-md">
                          {plan.comment}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600">
                          {plan.code_timeframes}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Finalizado
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">
                          {formatDate(plan.finalized_date)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Sin planes */}
      {improvementPlans.length === 0 && (
        <div className="bg-white border rounded-lg shadow-sm p-8 text-center">
          <p className="text-gray-500">No hay planes de mejora registrados</p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Crear Primer Plan de Mejora
          </button>
        </div>
      )}

      {/* Información adicional */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">
          Información sobre Planes de Mejora
        </h3>
        <p className="text-sm text-blue-800">
          Los planes de mejora representan iniciativas estratégicas vinculadas a
          periodos de tiempo específicos. Cada plan incluye título, descripción,
          comentarios y está asociado a un timeframe. Una vez finalizado un plan,
          no se puede revertir.
        </p>
      </div>
    </div>
  );
}
