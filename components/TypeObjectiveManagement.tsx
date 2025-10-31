"use client";

import { useTypeObjectives } from "@/hooks/useTypeObjectives";
import { useState } from "react";
import { TypeObjective } from "@/models/TypeObjective";

export function TypeObjectiveManagement() {
  const {
    typeObjectives,
    isLoadingTypeObjectives,
    typeObjectivesError,
    createTypeObjective,
    isCreatingTypeObjective,
    updateTypeObjectiveName,
    isUpdatingTypeObjectiveName,
  } = useTypeObjectives();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTypeName, setNewTypeName] = useState("");

  const [editingType, setEditingType] = useState<TypeObjective | null>(null);
  const [editName, setEditName] = useState("");

  const handleCreateTypeObjective = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTypeObjective({ name: newTypeName });
      alert("Tipo de objetivo creado exitosamente");
      setNewTypeName("");
      setShowCreateForm(false);
    } catch (error: any) {
      alert(
        `Error al crear tipo de objetivo: ${
          error.response?.data?.message || error.message
        }`
      );
      console.error(error);
    }
  };

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingType) return;

    try {
      await updateTypeObjectiveName({
        code: editingType.code,
        name: editName,
      });
      alert("Nombre actualizado exitosamente");
      setEditingType(null);
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

  const startEditing = (typeObjective: TypeObjective) => {
    setEditingType(typeObjective);
    setEditName(typeObjective.name);
  };

  const cancelEditing = () => {
    setEditingType(null);
    setEditName("");
  };

  if (isLoadingTypeObjectives) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center">
          <div className="text-lg">Cargando tipos de objetivos...</div>
        </div>
      </div>
    );
  }

  if (typeObjectivesError) {
    return (
      <div className="p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error al cargar tipos de objetivos</p>
          <p>{(typeObjectivesError as any).message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold">Gestión de Tipos de Objetivos</h1>
            <p className="text-gray-600 mt-1">
              Total de tipos: {typeObjectives.length}
            </p>
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            {showCreateForm ? "Cancelar" : "Nuevo Tipo de Objetivo"}
          </button>
        </div>

        {/* Formulario de creación */}
        {showCreateForm && (
          <div className="bg-white border rounded-lg p-6 mb-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">
              Crear Nuevo Tipo de Objetivo
            </h2>
            <form onSubmit={handleCreateTypeObjective} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Nombre del Tipo de Objetivo *
                </label>
                <input
                  type="text"
                  value={newTypeName}
                  onChange={(e) => setNewTypeName(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: Específico, Medible, Alcanzable..."
                  required
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isCreatingTypeObjective}
                  className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:bg-gray-400"
                >
                  {isCreatingTypeObjective ? "Creando..." : "Crear Tipo"}
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

        {/* Formulario de edición */}
        {editingType && (
          <div className="bg-white border rounded-lg p-6 mb-6 shadow-sm border-blue-500">
            <h2 className="text-xl font-semibold mb-4">
              Editar Tipo de Objetivo
            </h2>
            <form onSubmit={handleUpdateName} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Código (Solo lectura)
                </label>
                <input
                  type="text"
                  value={editingType.code}
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
                  placeholder="Nuevo nombre del tipo de objetivo"
                  required
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isUpdatingTypeObjectiveName}
                  className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-gray-400"
                >
                  {isUpdatingTypeObjectiveName
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
      </div>

      {/* Tabla de tipos de objetivos */}
      <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
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
                Fecha de Registro
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {typeObjectives.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No hay tipos de objetivos registrados
                </td>
              </tr>
            ) : (
              typeObjectives.map((typeObjective) => (
                <tr key={typeObjective.code} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">
                      {typeObjective.code}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {typeObjective.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">
                      {new Date(typeObjective.register_date).toLocaleDateString(
                        "es-ES",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => startEditing(typeObjective)}
                      disabled={isUpdatingTypeObjectiveName}
                      className="text-blue-600 hover:text-blue-900 disabled:opacity-50"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Información adicional */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">
          Información sobre Tipos de Objetivos
        </h3>
        <p className="text-sm text-blue-800">
          Los tipos de objetivos permiten categorizar y organizar los diferentes
          objetivos del sistema. Puedes crear nuevos tipos y actualizar los nombres
          de los existentes según las necesidades de tu organización.
        </p>
      </div>
    </div>
  );
}
