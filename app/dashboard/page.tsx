"use client";

import { useState } from "react";
import { authService } from "@/services/authService";
import { useRouter } from "next/navigation";

type ViewType =
  | "home"
  | "users"
  | "type-objectives"
  | "timeframes"
  | "actions"
  | "metrics"
  | "improvement-plans"
  | "objectives";

export default function DashboardPage() {
  const [currentView, setCurrentView] = useState<ViewType>("home");
  const router = useRouter();

  const handleLogout = () => {
    authService.logout();
    router.push("/");
  };

  const modules = [
    {
      id: "users" as ViewType,
      title: "Gestión de Usuarios",
      description: "Crear, editar y administrar usuarios del sistema",
      icon: "👥",
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
    },
    {
      id: "type-objectives" as ViewType,
      title: "Tipos de Objetivos",
      description: "Gestionar los diferentes tipos de objetivos",
      icon: "🎯",
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
    },
    {
      id: "timeframes" as ViewType,
      title: "Periodos de Tiempo",
      description: "Administrar los periodos y plazos del sistema",
      icon: "📅",
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600",
    },
    {
      id: "actions" as ViewType,
      title: "Gestión de Acciones",
      description: "Acciones asociadas a los objetivos del sistema",
      icon: "⚡",
      color: "bg-amber-500",
      hoverColor: "hover:bg-amber-600",
    },
    {
      id: "metrics" as ViewType,
      title: "Métricas Globales",
      description: "Dashboard con métricas en tiempo real del sistema",
      icon: "📊",
      color: "bg-indigo-500",
      hoverColor: "hover:bg-indigo-600",
    },
    {
      id: "improvement-plans" as ViewType,
      title: "Planes de Mejora",
      description: "Gestionar y dar seguimiento a planes de mejora",
      icon: "📋",
      color: "bg-rose-500",
      hoverColor: "hover:bg-rose-600",
    },
    {
      id: "objectives" as ViewType,
      title: "Gestión de Objetivos",
      description: "Objetivos asociados a los planes de mejora",
      icon: "🎓",
      color: "bg-teal-500",
      hoverColor: "hover:bg-teal-600",
    },
  ];

  const renderModuleView = (title: string, icon: string) => {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-4 text-4xl shadow-lg">
            {icon}
          </div>
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        </div>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
          <p className="text-blue-900 font-medium mb-2">
            Módulo en desarrollo
          </p>
          <p className="text-blue-700 text-sm">
            Este módulo estará disponible próximamente. Aquí podrás gestionar y
            administrar {title.toLowerCase()}.
          </p>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (currentView) {
      case "users":
        return renderModuleView("Gestión de Usuarios", "👥");
      case "type-objectives":
        return renderModuleView("Tipos de Objetivos", "🎯");
      case "timeframes":
        return renderModuleView("Periodos de Tiempo", "📅");
      case "actions":
        return renderModuleView("Gestión de Acciones", "⚡");
      case "metrics":
        return renderModuleView("Métricas Globales", "📊");
      case "improvement-plans":
        return renderModuleView("Planes de Mejora", "📋");
      case "objectives":
        return renderModuleView("Gestión de Objetivos", "🎓");
      default:
        return (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 text-white">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <span className="text-4xl">🚀</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    Bienvenido a KaizenPro
                  </h2>
                  <p className="text-blue-100 text-lg">
                    Sistema de Gestión de Mejora Continua
                  </p>
                </div>
              </div>
              <p className="text-white/90 max-w-2xl">
                Plataforma integral para la gestión de objetivos, planes de
                mejora y seguimiento de métricas en tiempo real. Selecciona un
                módulo para comenzar.
              </p>
            </div>

            {/* Módulos Grid */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Módulos del Sistema
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modules.map((module) => (
                  <button
                    key={module.id}
                    onClick={() => setCurrentView(module.id)}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-left border-2 border-transparent hover:border-gray-200 group"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`${module.color} ${module.hoverColor} transition-colors rounded-xl p-3 text-3xl shadow-lg group-hover:scale-110 duration-300`}
                      >
                        {module.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {module.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {module.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      Abrir módulo
                      <svg
                        className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Información del Sistema */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Características del Sistema
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 rounded-lg p-2">
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
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Tiempo Real
                    </h4>
                    <p className="text-sm text-gray-600">
                      Métricas actualizadas mediante Socket.IO
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-lg p-2">
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
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Gestión Completa
                    </h4>
                    <p className="text-sm text-gray-600">
                      Control total de objetivos y planes
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 rounded-lg p-2">
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
                        d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Análisis Avanzado
                    </h4>
                    <p className="text-sm text-gray-600">
                      Reportes y estadísticas detalladas
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {currentView !== "home" && (
                <button
                  onClick={() => setCurrentView("home")}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Volver al inicio"
                >
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </button>
              )}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  TCC-SIG KaizenPro
                </h1>
                <p className="text-sm text-gray-600">
                  Sistema de Información Geográfica
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium shadow-sm"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {currentView !== "home" && (
          <div className="mb-6">
            <button
              onClick={() => setCurrentView("home")}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors font-medium"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Volver al Inicio
            </button>
          </div>
        )}
        {renderContent()}
      </main>
    </div>
  );
}
