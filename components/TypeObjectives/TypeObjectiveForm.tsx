"use client";

import { useState, useEffect } from "react";
import { CreateTypeObjectiveRequest } from "@/models/TypeObjective";

interface TypeObjectiveFormProps {
  onSubmit: (data: CreateTypeObjectiveRequest) => Promise<void>;
  isLoading: boolean;
  editData?: { code: number; name: string } | null;
  onCancelEdit?: () => void;
}

export function TypeObjectiveForm({
  onSubmit,
  isLoading,
  editData,
  onCancelEdit,
}: TypeObjectiveFormProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editData) {
      setName(editData.name);
    } else {
      setName("");
    }
  }, [editData]);

  const validate = () => {
    if (!name.trim()) {
      setError("El nombre es requerido");
      return false;
    }
    if (name.trim().length < 3) {
      setError("El nombre debe tener al menos 3 caracteres");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      // Si estamos editando, incluir el code en los datos
      const submitData: any = { name: name.trim() };
      if (editData && editData.code) {
        submitData.code = editData.code;
      }

      console.log("Form submitting data:", submitData);
      console.log("Edit mode:", !!editData);

      await onSubmit(submitData);
      setName("");
      setError("");
    } catch (error) {
      console.error("Error al guardar tipo de objetivo:", error);
    }
  };

  const handleCancel = () => {
    setName("");
    setError("");
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">
          {editData ? "Editar Tipo de Objetivo" : "Crear Nuevo Tipo de Objetivo"}
        </h3>
        {editData && (
          <button
            type="button"
            onClick={handleCancel}
            className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancelar edición
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Nombre del Tipo de Objetivo *
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: Objetivos Estratégicos, Operacionales, etc."
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none ${
              error ? "border-red-500" : "border-gray-300"
            }`}
            disabled={isLoading}
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>

        {/* Submit Button */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {editData ? "Actualizando..." : "Creando..."}
              </span>
            ) : editData ? (
              "Actualizar Tipo de Objetivo"
            ) : (
              "Crear Tipo de Objetivo"
            )}
          </button>
          {editData && (
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
