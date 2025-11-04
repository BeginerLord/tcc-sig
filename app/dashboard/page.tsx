"use client";

import { authService } from "@/services/authService";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = () => {
    authService.logout();
    router.push("/");
  };

  const modules = [
    {
      title: "Gestión de Usuarios",
      description: "Crear, editar y administrar usuarios del sistema",
      icon: "👥",
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
      href: "/users",
    },
    {
      title: "Tipos de Objetivos",
      description: "Gestionar los diferentes tipos de objetivos",
      icon: "🎯",
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
      href: "/type-objectives",
    },
    {
      title: "Periodos de Tiempo",
      description: "Administrar los periodos y plazos del sistema",
      icon: "📅",
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600",
      href: "#",
    },
    {
      title: "Gestión de Acciones",
      description: "Acciones asociadas a los objetivos del sistema",
      icon: "⚡",
      color: "bg-amber-500",
      hoverColor: "hover:bg-amber-600",
      href: "#",
    },
    {
      title: "Métricas Globales",
      description: "Dashboard con métricas en tiempo real del sistema",
      icon: "📊",
      color: "bg-indigo-500",
      hoverColor: "hover:bg-indigo-600",
      href: "#",
    },
    {
      title: "Planes de Mejora",
      description: "Gestionar y dar seguimiento a planes de mejora",
      icon: "📋",
      color: "bg-rose-500",
      hoverColor: "hover:bg-rose-600",
      href: "#",
    },
    {
      title: "Gestión de Objetivos",
      description: "Objetivos asociados a los planes de mejora",
      icon: "🎓",
      color: "bg-teal-500",
      hoverColor: "hover:bg-teal-600",
      href: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                TCC-SIG KaizenPro
              </h1>
              <p className="text-sm text-gray-600">
                Sistema de Información Geográfica
              </p>
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
              {modules.map((module, index) => (
                <Link
                  key={index}
                  href={module.href}
                  className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-left border-2 border-transparent hover:border-gray-200 group ${
                    module.href === "#" ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                  onClick={(e) => {
                    if (module.href === "#") {
                      e.preventDefault();
                      alert("Módulo en desarrollo");
                    }
                  }}
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
                  {module.href !== "#" && (
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
                  )}
                </Link>
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
      </main>
    </div>
  );
}
