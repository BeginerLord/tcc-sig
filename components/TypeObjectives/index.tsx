"use client";

import { useState } from "react";
import { useTypeObjectives } from "@/hooks/useTypeObjectives";
import { TypeObjectiveForm } from "./TypeObjectiveForm";
import { TypeObjectiveList } from "./TypeObjectiveList";
import { CreateTypeObjectiveRequest, TypeObjective } from "@/models/TypeObjective";

export function TypeObjectivesManagement() {
  const {
    typeObjectives,
    isLoadingTypeObjectives,
    typeObjectivesError,
    createTypeObjective,
    isCreatingTypeObjective,
    updateTypeObjectiveName,
    isUpdatingTypeObjectiveName,
  } = useTypeObjectives();

  const [editingTypeObjective, setEditingTypeObjective] = useState<TypeObjective | null>(
    null
  );

  const handleCreate = async (data: CreateTypeObjectiveRequest) => {
    try {
      await createTypeObjective(data);
      alert("Tipo de objetivo creado exitosamente");
    } catch (error: any) {
      alert(error?.response?.data?.message || "Error al crear tipo de objetivo");
      throw error;
    }
  };

  const handleUpdate = async (data: CreateTypeObjectiveRequest) => {
    if (!editingTypeObjective) return;

    try {
      await updateTypeObjectiveName({
        code: editingTypeObjective.code,
        name: data.name,
      });
      alert("Tipo de objetivo actualizado exitosamente");
      setEditingTypeObjective(null);
    } catch (error: any) {
      alert(error?.response?.data?.message || "Error al actualizar tipo de objetivo");
      throw error;
    }
  };

  const handleEdit = (typeObjective: TypeObjective) => {
    setEditingTypeObjective(typeObjective);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingTypeObjective(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="bg-green-600 rounded-xl p-4 text-4xl shadow-lg">🎯</div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Gestión de Tipos de Objetivos
          </h1>
          <p className="text-gray-600 mt-1">
            Administra los diferentes tipos de objetivos del sistema
          </p>
        </div>
      </div>

      {/* Error Alert */}
      {typeObjectivesError && (
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
                Error al cargar tipos de objetivos. Por favor, intenta nuevamente.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">
                Total de Tipos de Objetivos
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {typeObjectives.length}
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Último Registro</p>
              <p className="text-lg font-bold text-gray-900">
                {typeObjectives.length > 0
                  ? typeObjectives[typeObjectives.length - 1]?.name || "N/A"
                  : "N/A"}
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <TypeObjectiveForm
        onSubmit={editingTypeObjective ? handleUpdate : handleCreate}
        isLoading={isCreatingTypeObjective || isUpdatingTypeObjectiveName}
        editData={
          editingTypeObjective
            ? {
                code: editingTypeObjective.code,
                name: editingTypeObjective.name,
              }
            : null
        }
        onCancelEdit={handleCancelEdit}
      />

      {/* List */}
      <TypeObjectiveList
        typeObjectives={typeObjectives}
        isLoading={isLoadingTypeObjectives}
        onEdit={handleEdit}
        isUpdating={isUpdatingTypeObjectiveName}
      />
    </div>
  );
}
