"use client";

import { useState } from "react";
import { CreateImprovementPlanRequest } from "@/models/ImprovementPlan";

interface ImprovementPlanFormProps {
  onSubmit: (data: CreateImprovementPlanRequest) => Promise<void>;
  isLoading: boolean;
}

export function ImprovementPlanForm({ onSubmit, isLoading }: ImprovementPlanFormProps) {
  const [formData, setFormData] = useState<CreateImprovementPlanRequest>({
    title: "",
    description: "",
    comment: "",
    code_timeframes: 0,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "El título es requerido";
    } else if (formData.title.trim().length < 5) {
      newErrors.title = "El título debe tener al menos 5 caracteres";
    }

    if (!formData.description.trim()) {
      newErrors.description = "La descripción es requerida";
    } else if (formData.description.trim().length < 20) {
      newErrors.description = "La descripción debe tener al menos 20 caracteres";
    }

    if (!formData.comment.trim()) {
      newErrors.comment = "El comentario es requerido";
    } else if (formData.comment.trim().length < 10) {
      newErrors.comment = "El comentario debe tener al menos 10 caracteres";
    }

    if (!formData.code_timeframes || formData.code_timeframes <= 0) {
      newErrors.code_timeframes = "El código del periodo es requerido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await onSubmit(formData);
      // Resetear formulario después de éxito
      setFormData({
        title: "",
        description: "",
        comment: "",
        code_timeframes: 0,
      });
      setErrors({});
    } catch (error) {
      console.error("Error al crear plan de mejora:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        Crear Nuevo Plan de Mejora
      </h3>

      <div className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Título del Plan *
          </label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Ej: Plan de Mejora Q1 2024"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            disabled={isLoading}
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>

        {/* Code Timeframes */}
        <div>
          <label
            htmlFor="code_timeframes"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Código del Periodo de Tiempo *
          </label>
          <input
            id="code_timeframes"
            type="number"
            min="1"
            value={formData.code_timeframes || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                code_timeframes: parseInt(e.target.value) || 0,
              })
            }
            placeholder="Ej: 1"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none ${
              errors.code_timeframes ? "border-red-500" : "border-gray-300"
            }`}
            disabled={isLoading}
          />
          {errors.code_timeframes && (
            <p className="mt-1 text-sm text-red-600">{errors.code_timeframes}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Descripción *
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Describe detalladamente el plan de mejora..."
            rows={4}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none resize-none ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            disabled={isLoading}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            {formData.description.length} caracteres (mínimo 20)
          </p>
        </div>

        {/* Comment */}
        <div>
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Comentario *
          </label>
          <textarea
            id="comment"
            value={formData.comment}
            onChange={(e) =>
              setFormData({ ...formData, comment: e.target.value })
            }
            placeholder="Agrega comentarios adicionales sobre el plan..."
            rows={3}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none resize-none ${
              errors.comment ? "border-red-500" : "border-gray-300"
            }`}
            disabled={isLoading}
          />
          {errors.comment && (
            <p className="mt-1 text-sm text-red-600">{errors.comment}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            {formData.comment.length} caracteres (mínimo 10)
          </p>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                Creando...
              </span>
            ) : (
              "Crear Plan de Mejora"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
