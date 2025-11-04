"use client";

import { useTimeframes } from "@/hooks/useTimeframes";
import { TimeframeForm } from "./TimeframeForm";
import { TimeframeList } from "./TimeframeList";
import { CreateTimeframeRequest } from "@/models/Timeframe";

export function TimeframesManagement() {
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

  const handleCreate = async (data: CreateTimeframeRequest) => {
    try {
      await createTimeframe(data);
      alert("Periodo de tiempo creado exitosamente");
    } catch (error: any) {
      alert(error?.response?.data?.message || "Error al crear periodo de tiempo");
      throw error;
    }
  };

  const handleEditName = async (code: number, name: string) => {
    try {
      await updateTimeframeName({ code, name });
      alert("Nombre actualizado exitosamente");
    } catch (error: any) {
      alert(error?.response?.data?.message || "Error al actualizar nombre");
      throw error;
    }
  };

  const handleEditExtensionDate = async (code: number, extension_date: string) => {
    try {
      await updateTimeframeExtensionDate({ code, extension_date });
      alert("Fecha de extensión actualizada exitosamente");
    } catch (error: any) {
      alert(
        error?.response?.data?.message || "Error al actualizar fecha de extensión"
      );
      throw error;
    }
  };

  const getActiveTimeframes = () => {
    return timeframes.filter((tf) => {
      const targetDate = tf.extension_date
        ? new Date(tf.extension_date)
        : new Date(tf.final_date);
      return targetDate >= new Date();
    }).length;
  };

  const getExpiredTimeframes = () => {
    return timeframes.filter((tf) => {
      const targetDate = tf.extension_date
        ? new Date(tf.extension_date)
        : new Date(tf.final_date);
      return targetDate < new Date();
    }).length;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="bg-purple-600 rounded-xl p-4 text-4xl shadow-lg">📅</div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Gestión de Periodos de Tiempo
          </h1>
          <p className="text-gray-600 mt-1">
            Administra los periodos y plazos del sistema
          </p>
        </div>
      </div>

      {/* Error Alert */}
      {timeframesError && (
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
                Error al cargar periodos de tiempo. Por favor, intenta nuevamente.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total de Periodos</p>
              <p className="text-3xl font-bold text-gray-900">
                {timeframes.length}
              </p>
            </div>
            <div className="bg-purple-100 rounded-full p-3">
              <svg
                className="w-6 h-6 text-purple-600"
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
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Periodos Activos</p>
              <p className="text-3xl font-bold text-gray-900">
                {getActiveTimeframes()}
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

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Periodos Expirados</p>
              <p className="text-3xl font-bold text-gray-900">
                {getExpiredTimeframes()}
              </p>
            </div>
            <div className="bg-red-100 rounded-full p-3">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <TimeframeForm onSubmit={handleCreate} isLoading={isCreatingTimeframe} />

      {/* List */}
      <TimeframeList
        timeframes={timeframes}
        isLoading={isLoadingTimeframes}
        onEditName={handleEditName}
        onEditExtensionDate={handleEditExtensionDate}
        isUpdating={isUpdatingTimeframeName || isUpdatingExtensionDate}
      />
    </div>
  );
}
