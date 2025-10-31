"use client";

import { useActions } from "@/hooks/useActions";
import { useState } from "react";
import { Action } from "@/models/Action";

export function ActionManagement() {
  const {
    actions,
    totalActions,
    isLoadingActions,
    actionsError,
    createAction,
    isCreatingAction,
    finalizeAction,
    isFinalizingAction,
  } = useActions();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    code_improvement: "",
    code_objective: "",
    title: "",
    description: "",
  });

  const handleCreateAction = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createAction({
        code_improvement: parseInt(formData.code_improvement),
        code_objective: parseInt(formData.code_objective),
        title: formData.title,
        description: formData.description,
      });
      alert("Acción creada exitosamente");
      setFormData({
        code_improvement: "",
        code_objective: "",
        title: "",
        description: "",
      });
      setShowCreateForm(false);
    } catch (error: any) {
      alert(
        `Error al crear acción: ${
          error.response?.data?.message || error.message
        }`
      );
      console.error(error);
    }
  };

  const handleFinalizeAction = async (action: Action) => {
    if (action.finalized) {
      alert("Esta acción ya está finalizada");
      return;
    }

    if (
      !confirm(
        `¿Estás seguro de finalizar la acción "${action.title}"? Esta acción no se puede deshacer.`
      )
    ) {
      return;
    }

    try {
      await finalizeAction({ code: action.code });
      alert("Acción finalizada exitosamente");
    } catch (error: any) {
      alert(
        `Error al finalizar acción: ${
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

  if (isLoadingActions) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center">
          <div className="text-lg">Cargando acciones...</div>
        </div>
      </div>
    );
  }

  if (actionsError) {
    return (
      <div className="p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error al cargar acciones</p>
          <p>{(actionsError as any).message}</p>
        </div>
      </div>
    );
  }

  // Separar acciones finalizadas y pendientes
  const pendingActions = actions.filter((action) => !action.finalized);
  const finalizedActions = actions.filter((action) => action.finalized);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold">Gestión de Acciones</h1>
            <p className="text-gray-600 mt-1">
              Total: {totalActions} | Pendientes: {pendingActions.length} |
              Finalizadas: {finalizedActions.length}
            </p>
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            {showCreateForm ? "Cancelar" : "Nueva Acción"}
          </button>
        </div>

        {/* Formulario de creación */}
        {showCreateForm && (
          <div className="bg-white border rounded-lg p-6 mb-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Crear Nueva Acción</h2>
            <form onSubmit={handleCreateAction} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Código de Mejora *
                  </label>
                  <input
                    type="number"
                    value={formData.code_improvement}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        code_improvement: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ej: 3"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Código de Objetivo *
                  </label>
                  <input
                    type="number"
                    value={formData.code_objective}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        code_objective: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ej: 1"
                    required
                  />
                </div>
              </div>

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
                  placeholder="Ej: Capacitar al personal en nuevas estrategias de calidad"
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
                  rows={4}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: Realizar un taller de dos días sobre implementación de estrategias de calidad y mejora continua."
                  required
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isCreatingAction}
                  className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:bg-gray-400"
                >
                  {isCreatingAction ? "Creando..." : "Crear Acción"}
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

      {/* Tabs de filtro */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button className="border-b-2 border-blue-500 py-4 px-1 text-sm font-medium text-blue-600">
              Todas ({totalActions})
            </button>
          </nav>
        </div>
      </div>

      {/* Acciones Pendientes */}
      {pendingActions.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-orange-600">
            Acciones Pendientes ({pendingActions.length})
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
                      Mejora
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Objetivo
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
                  {pendingActions.map((action) => (
                    <tr key={action.code} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">
                          {action.code}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {action.title}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 max-w-md">
                          {action.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600">
                          {action.code_improvement}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600">
                          {action.code_objective}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                          Pendiente
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleFinalizeAction(action)}
                          disabled={isFinalizingAction}
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

      {/* Acciones Finalizadas */}
      {finalizedActions.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-green-600">
            Acciones Finalizadas ({finalizedActions.length})
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
                      Mejora
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Objetivo
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
                  {finalizedActions.map((action) => (
                    <tr
                      key={action.code}
                      className="hover:bg-gray-50 opacity-75"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">
                          {action.code}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {action.title}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 max-w-md">
                          {action.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600">
                          {action.code_improvement}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600">
                          {action.code_objective}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Finalizada
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">
                          {formatDate(action.finalized_date)}
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

      {/* Sin acciones */}
      {actions.length === 0 && (
        <div className="bg-white border rounded-lg shadow-sm p-8 text-center">
          <p className="text-gray-500">No hay acciones registradas</p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Crear Primera Acción
          </button>
        </div>
      )}

      {/* Información adicional */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">
          Información sobre Acciones
        </h3>
        <p className="text-sm text-blue-800">
          Las acciones representan tareas o actividades específicas vinculadas a
          objetivos y mejoras. Cada acción puede estar en estado pendiente o
          finalizada. Una vez finalizada una acción, no se puede revertir.
        </p>
      </div>
    </div>
  );
}
