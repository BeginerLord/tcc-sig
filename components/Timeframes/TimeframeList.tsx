"use client";

import { useState } from "react";
import { Timeframe } from "@/models/Timeframe";

interface TimeframeListProps {
  timeframes: Timeframe[];
  isLoading: boolean;
  onEditName: (code: number, name: string) => Promise<void>;
  onEditExtensionDate: (code: number, extension_date: string) => Promise<void>;
  isUpdating: boolean;
}

export function TimeframeList({
  timeframes,
  isLoading,
  onEditName,
  onEditExtensionDate,
  isUpdating,
}: TimeframeListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");
  const [editingExtension, setEditingExtension] = useState<number | null>(null);
  const [extensionDate, setExtensionDate] = useState("");

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const getDaysRemaining = (finalDate: string, extensionDate?: string) => {
    const targetDate = extensionDate ? new Date(extensionDate) : new Date(finalDate);
    const today = new Date();
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleEditName = (timeframe: Timeframe) => {
    setEditingId(timeframe.code);
    setEditingName(timeframe.name);
  };

  const handleSaveName = async (code: number) => {
    if (!editingName.trim()) {
      alert("El nombre no puede estar vacío");
      return;
    }
    try {
      await onEditName(code, editingName);
      setEditingId(null);
      setEditingName("");
    } catch (error) {
      console.error("Error al actualizar nombre:", error);
    }
  };

  const handleCancelEditName = () => {
    setEditingId(null);
    setEditingName("");
  };

  const handleEditExtension = (timeframe: Timeframe) => {
    setEditingExtension(timeframe.code);
    setExtensionDate(timeframe.extension_date || "");
  };

  const handleSaveExtension = async (code: number) => {
    // Validar que la fecha no esté vacía según requerimiento del backend
    if (!extensionDate || extensionDate.trim() === "") {
      alert("La fecha de extensión es requerida. Si desea eliminarla, contacte al administrador.");
      return;
    }

    try {
      await onEditExtensionDate(code, extensionDate);
      setEditingExtension(null);
      setExtensionDate("");
    } catch (error) {
      console.error("Error al actualizar fecha de extensión:", error);
    }
  };

  const handleCancelEditExtension = () => {
    setEditingExtension(null);
    setExtensionDate("");
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="ml-4 text-gray-600">Cargando periodos de tiempo...</p>
        </div>
      </div>
    );
  }

  if (timeframes.length === 0) {
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
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="mt-4 text-lg font-medium">No hay periodos de tiempo registrados</p>
          <p className="mt-2 text-sm">
            Crea tu primer periodo usando el formulario de arriba
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Lista de Periodos de Tiempo ({timeframes.length})
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
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha Inicio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha Final
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Extensión
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {timeframes.map((timeframe) => {
              const daysRemaining = getDaysRemaining(
                timeframe.final_date,
                timeframe.extension_date
              );
              const isActive = daysRemaining > 0;
              const isExpired = daysRemaining < 0;

              return (
                <tr key={timeframe.code} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-semibold text-sm">
                          #{timeframe.code}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {editingId === timeframe.code ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          className="px-2 py-1 border border-purple-300 rounded focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                          disabled={isUpdating}
                        />
                        <button
                          onClick={() => handleSaveName(timeframe.code)}
                          disabled={isUpdating}
                          className="text-green-600 hover:text-green-800 disabled:opacity-50"
                        >
                          ✓
                        </button>
                        <button
                          onClick={handleCancelEditName}
                          disabled={isUpdating}
                          className="text-red-600 hover:text-red-800 disabled:opacity-50"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div className="text-sm font-medium text-gray-900">
                        {timeframe.name}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {formatDate(timeframe.start_date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {formatDate(timeframe.final_date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingExtension === timeframe.code ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="date"
                          value={extensionDate}
                          onChange={(e) => setExtensionDate(e.target.value)}
                          className="px-2 py-1 border border-purple-300 rounded focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                          disabled={isUpdating}
                        />
                        <button
                          onClick={() => handleSaveExtension(timeframe.code)}
                          disabled={isUpdating}
                          className="text-green-600 hover:text-green-800 disabled:opacity-50"
                        >
                          ✓
                        </button>
                        <button
                          onClick={handleCancelEditExtension}
                          disabled={isUpdating}
                          className="text-red-600 hover:text-red-800 disabled:opacity-50"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-600">
                        {formatDate(timeframe.extension_date)}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        isExpired
                          ? "bg-red-100 text-red-800"
                          : isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {isExpired
                        ? `Expirado (${Math.abs(daysRemaining)}d)`
                        : `${daysRemaining}d restantes`}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEditName(timeframe)}
                      disabled={isUpdating || editingId !== null}
                      className="text-purple-600 hover:text-purple-900 disabled:opacity-50 transition-colors"
                    >
                      <svg className="w-5 h-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleEditExtension(timeframe)}
                      disabled={isUpdating || editingExtension !== null}
                      className="text-blue-600 hover:text-blue-900 disabled:opacity-50 transition-colors"
                      title="Editar fecha de extensión"
                    >
                      <svg className="w-5 h-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
