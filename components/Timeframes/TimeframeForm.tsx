"use client";

import { useState } from "react";
import { CreateTimeframeRequest } from "@/models/Timeframe";

interface TimeframeFormProps {
  onSubmit: (data: CreateTimeframeRequest) => Promise<void>;
  isLoading: boolean;
}

export function TimeframeForm({ onSubmit, isLoading }: TimeframeFormProps) {
  const [formData, setFormData] = useState<CreateTimeframeRequest>({
    name: "",
    start_date: "",
    final_date: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "El nombre debe tener al menos 3 caracteres";
    }

    if (!formData.start_date) {
      newErrors.start_date = "La fecha de inicio es requerida";
    }

    if (!formData.final_date) {
      newErrors.final_date = "La fecha final es requerida";
    }

    if (formData.start_date && formData.final_date) {
      const startDate = new Date(formData.start_date);
      const finalDate = new Date(formData.final_date);

      if (finalDate <= startDate) {
        newErrors.final_date = "La fecha final debe ser posterior a la fecha de inicio";
      }
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
        name: "",
        start_date: "",
        final_date: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error al crear periodo:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        Crear Nuevo Periodo de Tiempo
      </h3>

      <div className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Nombre del Periodo *
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Ej: Q1 2024, Semestre 1, etc."
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            disabled={isLoading}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Start Date */}
          <div>
            <label
              htmlFor="start_date"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Fecha de Inicio *
            </label>
            <input
              id="start_date"
              type="date"
              value={formData.start_date}
              onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none ${
                errors.start_date ? "border-red-500" : "border-gray-300"
              }`}
              disabled={isLoading}
            />
            {errors.start_date && (
              <p className="mt-1 text-sm text-red-600">{errors.start_date}</p>
            )}
          </div>

          {/* Final Date */}
          <div>
            <label
              htmlFor="final_date"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Fecha Final *
            </label>
            <input
              id="final_date"
              type="date"
              value={formData.final_date}
              onChange={(e) => setFormData({ ...formData, final_date: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none ${
                errors.final_date ? "border-red-500" : "border-gray-300"
              }`}
              disabled={isLoading}
            />
            {errors.final_date && (
              <p className="mt-1 text-sm text-red-600">{errors.final_date}</p>
            )}
          </div>
        </div>

        {/* Duration Info */}
        {formData.start_date && formData.final_date && !errors.final_date && (
          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm text-purple-700">
                Duración:{" "}
                {Math.ceil(
                  (new Date(formData.final_date).getTime() -
                    new Date(formData.start_date).getTime()) /
                    (1000 * 60 * 60 * 24)
                )}{" "}
                días
              </p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
              "Crear Periodo de Tiempo"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
