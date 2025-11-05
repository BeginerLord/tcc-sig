"use client";

import { useState } from "react";
import { CreateObjectiveRequest } from "@/models/Objective";
import { useImprovementPlans } from "@/hooks/useImprovementPlans";
import { useTypeObjectives } from "@/hooks/useTypeObjectives";

interface ObjectiveFormProps {
  onSubmit: (data: CreateObjectiveRequest) => Promise<void>;
  isLoading: boolean;
}

export function ObjectiveForm({ onSubmit, isLoading }: ObjectiveFormProps) {
  const { improvementPlans, isLoadingPlans } = useImprovementPlans();
  const { typeObjectives, isLoadingTypeObjectives } = useTypeObjectives();
  const [formData, setFormData] = useState<CreateObjectiveRequest>({
    code_improvement: 0,
    code_type: 0,
    body: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.code_improvement || formData.code_improvement <= 0) {
      newErrors.code_improvement = "Debes seleccionar un plan de mejora";
    }

    if (!formData.code_type || formData.code_type <= 0) {
      newErrors.code_type = "Debes seleccionar un tipo de objetivo";
    }

    if (!formData.body.trim()) {
      newErrors.body = "El contenido del objetivo es requerido";
    } else if (formData.body.trim().length < 10) {
      newErrors.body = "El contenido debe tener al menos 10 caracteres";
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
        code_type: 0,
        body: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error al crear objetivo:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        Crear Nuevo Objetivo
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
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none ${errors.code_improvement ? "border-red-500" : "border-gray-300"
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

          {/* Code Type */}
          <div>
            <label
              htmlFor="code_type"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Tipo de Objetivo *
            </label>
            <select
              id="code_type"
              value={formData.code_type || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  code_type: parseInt(e.target.value) || 0,
                })
              }
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none ${errors.code_type ? "border-red-500" : "border-gray-300"
                }`}
              disabled={isLoading || isLoadingTypeObjectives}
            >
              <option value="">Selecciona un tipo de objetivo</option>
              {typeObjectives.map((type) => (
                <option key={type.code} value={type.code}>
                  #{type.code} - {type.name}
                </option>
              ))}
            </select>
            {errors.code_type && (
              <p className="mt-1 text-sm text-red-600">{errors.code_type}</p>
            )}
          </div>
        </div>

        {/* Body */}
        <div>
          <label
            htmlFor="body"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Contenido del Objetivo *
          </label>
          <textarea
            id="body"
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
            placeholder="Describe el objetivo que se desea alcanzar..."
            rows={5}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none resize-none ${errors.body ? "border-red-500" : "border-gray-300"
              }`}
            disabled={isLoading}
          />
          {errors.body && <p className="mt-1 text-sm text-red-600">{errors.body}</p>}
          <p className="mt-1 text-xs text-gray-500">
            {formData.body.length} caracteres (mínimo 10)
          </p>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
              "Crear Objetivo"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
