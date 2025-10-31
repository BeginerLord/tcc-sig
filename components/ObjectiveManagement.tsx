"use client";

import { useObjectives } from "@/hooks/useObjectives";
import { useState } from "react";
import { Objective } from "@/models/Objective";

export function ObjectiveManagement() {
  const {
    objectives,
    totalObjectives,
    isLoadingObjectives,
    objectivesError,
    createObjective,
    isCreatingObjective,
    finalizeObjective,
    isFinalizingObjective,
  } = useObjectives();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    code_improvement: "",
    code_type: "",
    body: "",
  });

  const handleCreateObjective = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createObjective({
        code_improvement: parseInt(formData.code_improvement),
        code_type: parseInt(formData.code_type),
        body: formData.body,
      });
      alert("Objetivo creado exitosamente");
      setFormData({
        code_improvement: "",
        code_type: "",
        body: "",
      });
      setShowCreateForm(false);
    } catch (error: any) {
      alert(
        `Error al crear objetivo: ${
          error.response?.data?.message || error.message
        }`
      );
      console.error(error);
    }
  };

  const handleFinalizeObjective = async (objective: Objective) => {
    if (objective.finalized) {
      alert("Este objetivo ya está finalizado");
      return;
    }

    if (
      !confirm(
        `¿Estás seguro de finalizar el objetivo "${objective.body}"? Esta acción no se puede deshacer.`
      )
    ) {
      return;
    }

    try {
      await finalizeObjective({ code: objective.code });
      alert("Objetivo finalizado exitosamente");
    } catch (error: any) {
      alert(
        `Error al finalizar objetivo: ${
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

  if (isLoadingObjectives) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center">
          <div className="text-lg">Cargando objetivos...</div>
        </div>
      </div>
    );
  }

  if (objectivesError) {
    return (
      <div className="p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error al cargar objetivos</p>
          <p>{(objectivesError as any).message}</p>
        </div>
      </div>
    );
  }

  // Separar objetivos finalizados y pendientes
  const pendingObjectives = objectives.filter((obj) => !obj.finalized);
  const finalizedObjectives = objectives.filter((obj) => obj.finalized);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold">Gestión de Objetivos</h1>
            <p className="text-gray-600 mt-1">
              Total: {totalObjectives} | Pendientes: {pendingObjectives.length}{" "}
              | Finalizados: {finalizedObjectives.length}
            </p>
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            {showCreateForm ? "Cancelar" : "Nuevo Objetivo"}
          </button>
        </div>

        {/* Formulario de creación */}
        {showCreateForm && (
          <div className="bg-white border rounded-lg p-6 mb-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Crear Nuevo Objetivo</h2>
            <form onSubmit={handleCreateObjective} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Código Plan de Mejora *
                </label>
                <input
                  type="number"
                  value={formData.code_improvement}
                  onChange={(e) =>
                    setFormData({ ...formData, code_improvement: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: 3"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Código Tipo de Objetivo *
                </label>
                <input
                  type="number"
                  value={formData.code_type}
                  onChange={(e) =>
                    setFormData({ ...formData, code_type: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: 2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Descripción del Objetivo *
                </label>
                <textarea
                  value={formData.body}
                  onChange={(e) =>
                    setFormData({ ...formData, body: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: Implementar nuevas estrategias de calidad"
                  required
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isCreatingObjective}
                  className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:bg-gray-400"
                >
                  {isCreatingObjective ? "Creando..." : "Crear Objetivo"}
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

      {/* Objetivos Pendientes */}
      {pendingObjectives.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-orange-600">
            Objetivos Pendientes ({pendingObjectives.length})
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
                      Plan de Mejora
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tipo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Descripción
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
                  {pendingObjectives.map((objective) => (
                    <tr key={objective.code} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">
                          {objective.code}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600">
                          {objective.code_improvement}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600">
                          {objective.code_type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-md">
                          {objective.body}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                          Pendiente
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleFinalizeObjective(objective)}
                          disabled={isFinalizingObjective}
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

      {/* Objetivos Finalizados */}
      {finalizedObjectives.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-green-600">
            Objetivos Finalizados ({finalizedObjectives.length})
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
                      Plan de Mejora
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tipo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Descripción
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
                  {finalizedObjectives.map((objective) => (
                    <tr
                      key={objective.code}
                      className="hover:bg-gray-50 opacity-75"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">
                          {objective.code}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600">
                          {objective.code_improvement}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600">
                          {objective.code_type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-md">
                          {objective.body}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Finalizado
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">
                          {formatDate(objective.finalized_date)}
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

      {/* Sin objetivos */}
      {objectives.length === 0 && (
        <div className="bg-white border rounded-lg shadow-sm p-8 text-center">
          <p className="text-gray-500">No hay objetivos registrados</p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Crear Primer Objetivo
          </button>
        </div>
      )}

      {/* Información adicional */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">
          Información sobre Objetivos
        </h3>
        <p className="text-sm text-blue-800">
          Los objetivos están vinculados a planes de mejora y tipos de objetivos
          específicos. Cada objetivo puede ser finalizado cuando se completa,
          marcándolo con estado "D" (Done). Una vez finalizado, no se puede
          revertir.
        </p>
      </div>
    </div>
  );
}
