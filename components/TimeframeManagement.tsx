"use client";

import { useTimeframes } from "@/hooks/useTimeframes";
import { useState } from "react";
import { Timeframe } from "@/models/Timeframe";

export function TimeframeManagement() {
  const {
    timeframes,
    isLoadingTimeframes,
    timeframesError,
    createTimeframe,
    isCreatingTimeframe,
    updateTimeframeName,
    isUpdatingTimeframeName,
    updateTimeframeExtensionDate,
    isUpdatingExtensionDate,
  } = useTimeframes();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    start_date: "",
    final_date: "",
  });

  const [editingTimeframe, setEditingTimeframe] = useState<Timeframe | null>(
    null
  );
  const [editName, setEditName] = useState("");

  const [extendingTimeframe, setExtendingTimeframe] =
    useState<Timeframe | null>(null);
  const [extensionDate, setExtensionDate] = useState("");

  const handleCreateTimeframe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTimeframe(formData);
      alert("Periodo de tiempo creado exitosamente");
      setFormData({ name: "", start_date: "", final_date: "" });
      setShowCreateForm(false);
    } catch (error: any) {
      alert(
        `Error al crear periodo: ${
          error.response?.data?.message || error.message
        }`
      );
      console.error(error);
    }
  };

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTimeframe) return;

    try {
      await updateTimeframeName({
        code: editingTimeframe.code,
        name: editName,
      });
      alert("Nombre actualizado exitosamente");
      setEditingTimeframe(null);
      setEditName("");
    } catch (error: any) {
      alert(
        `Error al actualizar nombre: ${
          error.response?.data?.message || error.message
        }`
      );
      console.error(error);
    }
  };

  const handleUpdateExtensionDate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!extendingTimeframe) return;

    try {
      await updateTimeframeExtensionDate({
        code: extendingTimeframe.code,
        extension_date: extensionDate,
      });
      alert("Fecha de extensión actualizada exitosamente");
      setExtendingTimeframe(null);
      setExtensionDate("");
    } catch (error: any) {
      alert(
        `Error al actualizar fecha de extensión: ${
          error.response?.data?.message || error.message
        }`
      );
      console.error(error);
    }
  };

  const startEditingName = (timeframe: Timeframe) => {
    setEditingTimeframe(timeframe);
    setEditName(timeframe.name);
    setExtendingTimeframe(null);
  };

  const startEditingExtension = (timeframe: Timeframe) => {
    setExtendingTimeframe(timeframe);
    setExtensionDate(timeframe.extension_date || "");
    setEditingTimeframe(null);
  };

  const cancelEditing = () => {
    setEditingTimeframe(null);
    setEditName("");
    setExtendingTimeframe(null);
    setExtensionDate("");
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateDuration = (startDate: string, finalDate: string) => {
    const start = new Date(startDate);
    const final = new Date(finalDate);
    const diffTime = Math.abs(final.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} días`;
  };

  if (isLoadingTimeframes) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center">
          <div className="text-lg">Cargando periodos de tiempo...</div>
        </div>
      </div>
    );
  }

  if (timeframesError) {
    return (
      <div className="p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error al cargar periodos de tiempo</p>
          <p>{(timeframesError as any).message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold">
              Gestión de Periodos de Tiempo
            </h1>
            <p className="text-gray-600 mt-1">
              Total de periodos: {timeframes.length}
            </p>
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            {showCreateForm ? "Cancelar" : "Nuevo Periodo"}
          </button>
        </div>

        {/* Formulario de creación */}
        {showCreateForm && (
          <div className="bg-white border rounded-lg p-6 mb-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">
              Crear Nuevo Periodo de Tiempo
            </h2>
            <form onSubmit={handleCreateTimeframe} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Nombre del Periodo *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: Periodo Académico 2025-1"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Fecha de Inicio *
                  </label>
                  <input
                    type="date"
                    value={formData.start_date}
                    onChange={(e) =>
                      setFormData({ ...formData, start_date: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Fecha Final *
                  </label>
                  <input
                    type="date"
                    value={formData.final_date}
                    onChange={(e) =>
                      setFormData({ ...formData, final_date: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isCreatingTimeframe}
                  className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:bg-gray-400"
                >
                  {isCreatingTimeframe ? "Creando..." : "Crear Periodo"}
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

        {/* Formulario de edición de nombre */}
        {editingTimeframe && (
          <div className="bg-white border rounded-lg p-6 mb-6 shadow-sm border-blue-500">
            <h2 className="text-xl font-semibold mb-4">
              Editar Nombre del Periodo
            </h2>
            <form onSubmit={handleUpdateName} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Código (Solo lectura)
                </label>
                <input
                  type="text"
                  value={editingTimeframe.code}
                  disabled
                  className="w-full px-3 py-2 border rounded bg-gray-100 text-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Nuevo Nombre *
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nuevo nombre del periodo"
                  required
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isUpdatingTimeframeName}
                  className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-gray-400"
                >
                  {isUpdatingTimeframeName
                    ? "Actualizando..."
                    : "Actualizar Nombre"}
                </button>
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Formulario de edición de fecha de extensión */}
        {extendingTimeframe && (
          <div className="bg-white border rounded-lg p-6 mb-6 shadow-sm border-orange-500">
            <h2 className="text-xl font-semibold mb-4">
              Actualizar Fecha de Extensión
            </h2>
            <form onSubmit={handleUpdateExtensionDate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Periodo: {extendingTimeframe.name}
                </label>
                <p className="text-sm text-gray-600">
                  Código: {extendingTimeframe.code}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Fecha de Extensión *
                </label>
                <input
                  type="date"
                  value={extensionDate}
                  onChange={(e) => setExtensionDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isUpdatingExtensionDate}
                  className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors disabled:bg-gray-400"
                >
                  {isUpdatingExtensionDate
                    ? "Actualizando..."
                    : "Actualizar Extensión"}
                </button>
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Tabla de periodos de tiempo */}
      <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Código
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha Inicio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha Final
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha Extensión
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duración
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {timeframes.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No hay periodos de tiempo registrados
                  </td>
                </tr>
              ) : (
                timeframes.map((timeframe) => (
                  <tr key={timeframe.code} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">
                        {timeframe.code}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {timeframe.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">
                        {formatDate(timeframe.start_date)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">
                        {formatDate(timeframe.final_date)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">
                        {timeframe.extension_date ? (
                          <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">
                            {formatDate(timeframe.extension_date)}
                          </span>
                        ) : (
                          <span className="text-gray-400">Sin extensión</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">
                        {calculateDuration(
                          timeframe.start_date,
                          timeframe.final_date
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => startEditingName(timeframe)}
                        disabled={isUpdatingTimeframeName}
                        className="text-blue-600 hover:text-blue-900 disabled:opacity-50"
                      >
                        Editar Nombre
                      </button>
                      <span className="text-gray-300">|</span>
                      <button
                        onClick={() => startEditingExtension(timeframe)}
                        disabled={isUpdatingExtensionDate}
                        className="text-orange-600 hover:text-orange-900 disabled:opacity-50"
                      >
                        Extensión
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Información adicional */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">
          Información sobre Periodos de Tiempo
        </h3>
        <p className="text-sm text-blue-800">
          Los periodos de tiempo (timeframes) permiten organizar y gestionar las
          actividades del sistema en intervalos definidos. Puedes crear nuevos
          periodos, actualizar sus nombres y establecer fechas de extensión
          cuando sea necesario.
        </p>
      </div>
    </div>
  );
}
