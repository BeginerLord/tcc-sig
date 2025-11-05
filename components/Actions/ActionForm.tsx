"use client";

import { useState } from "react";
import { CreateActionRequest } from "@/models/Action";
import { useImprovementPlans } from "@/hooks/useImprovementPlans";
import { useObjectives } from "@/hooks/useObjectives";

interface ActionFormProps {
  onSubmit: (data: CreateActionRequest) => Promise<void>;
  isLoading: boolean;
}

export function ActionForm({ onSubmit, isLoading }: ActionFormProps) {
  const { improvementPlans, isLoadingPlans } = useImprovementPlans();
  const { objectives, isLoadingObjectives } = useObjectives();

  const [formData, setFormData] = useState<CreateActionRequest>({
    code_improvement: 0,
    code_objective: 0,
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "El título es requerido";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "El título debe tener al menos 3 caracteres";
    }

    if (!formData.description.trim()) {
      newErrors.description = "La descripción es requerida";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "La descripción debe tener al menos 10 caracteres";
    }

    if (!formData.code_improvement || formData.code_improvement <= 0) {
      newErrors.code_improvement = "Debes seleccionar un plan de mejora";
    }

    if (!formData.code_objective || formData.code_objective <= 0) {
      newErrors.code_objective = "Debes seleccionar un objetivo";
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
        code_improvement: 0,
        code_objective: 0,
        title: "",
        description: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error al crear acción:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        Crear Nueva Acción
      </h3>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Code Improvement */}
          <div>
            <label
              htmlFor="code_improvement"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Plan de Mejora *
            </label>
            <select
              id="code_improvement"
              value={formData.code_improvement || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  code_improvement: parseInt(e.target.value) || 0,
                })
              }
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none ${
                errors.code_improvement ? "border-red-500" : "border-gray-300"
              }`}
              disabled={isLoading || isLoadingPlans}
            >
              <option value="">Selecciona un plan de mejora</option>
              {improvementPlans.map((plan) => (
                <option key={plan.code} value={plan.code}>
                  #{plan.code} - {plan.title}
                </option>
              ))}
            </select>
            {errors.code_improvement && (
              <p className="mt-1 text-sm text-red-600">{errors.code_improvement}</p>
            )}
          </div>

          {/* Code Objective */}
          <div>
            <label
              htmlFor="code_objective"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Objetivo *
            </label>
            <select
              id="code_objective"
              value={formData.code_objective || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  code_objective: parseInt(e.target.value) || 0,
                })
              }
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none ${
                errors.code_objective ? "border-red-500" : "border-gray-300"
              }`}
              disabled={isLoading || isLoadingObjectives}
            >
              <option value="">Selecciona un objetivo</option>
              {objectives.map((objective) => (
                <option key={objective.code} value={objective.code}>
                  #{objective.code} - {objective.body.substring(0, 60)}
                  {objective.body.length > 60 ? "..." : ""}
                </option>
              ))}
            </select>
            {errors.code_objective && (
              <p className="mt-1 text-sm text-red-600">{errors.code_objective}</p>
            )}
          </div>
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Título de la Acción *
          </label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Ej: Implementar sistema de control de calidad"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            disabled={isLoading}
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
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
            placeholder="Describe detalladamente la acción a realizar..."
            rows={4}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none resize-none ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            disabled={isLoading}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            {formData.description.length} caracteres (mínimo 10)
          </p>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
              "Crear Acción"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
