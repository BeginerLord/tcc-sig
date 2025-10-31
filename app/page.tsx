"use client";

import { UserManagement } from "@/components/UserManagement";
import { TypeObjectiveManagement } from "@/components/TypeObjectiveManagement";
import { TimeframeManagement } from "@/components/TimeframeManagement";
import { ActionManagement } from "@/components/ActionManagement";
import { Dashboard } from "@/components/Dashboard";
import { ImprovementPlanManagement } from "@/components/ImprovementPlanManagement";
import { ObjectiveManagement } from "@/components/ObjectiveManagement";
import { useState } from "react";

type ViewType = "home" | "users" | "type-objectives" | "timeframes" | "actions" | "dashboard" | "improvement-plans" | "objectives";

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewType>("home");

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            TCC-SIG - KaizenPro
          </h1>
          <p className="text-gray-600 mt-1">
            Sistema de Información Geográfica
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {currentView === "home" ? (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <h2 className="text-2xl font-bold mb-4">
                Bienvenido al Sistema
              </h2>
              <p className="text-gray-600 mb-6">
                Aplicación frontend construida con Next.js, TypeScript, TanStack
                Query y Tailwind CSS
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Estructura Modular</h3>
                  <p className="text-sm text-gray-600">
                    Organización clara: app, components, hooks, lib, models,
                    providers, services
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">TanStack Query</h3>
                  <p className="text-sm text-gray-600">
                    Gestión de estado del servidor con cache, refetch automático
                    y DevTools
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">API Cliente</h3>
                  <p className="text-sm text-gray-600">
                    Axios con interceptores para autenticación, logging y manejo
                    de errores
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">
                  Módulos Implementados
                </h3>

                {/* Módulo Destacado: Dashboard */}
                <div className="border-2 border-blue-500 rounded-lg overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="bg-blue-500 px-4 py-3 border-b">
                    <h4 className="font-semibold text-white flex items-center gap-2">
                      <span className="text-xl">⚡</span>
                      Dashboard en Tiempo Real (Socket.IO)
                    </h4>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-700 mb-3">
                      Métricas actualizadas en tiempo real mediante Socket.IO:
                    </p>
                    <ul className="text-sm space-y-1 text-gray-700 mb-4">
                      <li>• WebSocket con autenticación JWT</li>
                      <li>• Evento: dashboard:update (métricas)</li>
                      <li>• Reconexión automática</li>
                      <li>• Estadísticas de usuarios y planes</li>
                    </ul>
                    <button
                      onClick={() => setCurrentView("dashboard")}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Abrir Dashboard en Tiempo Real
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Módulo de Usuarios */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b">
                      <h4 className="font-semibold">Módulo de Usuarios</h4>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-600 mb-3">
                        Gestión completa de usuarios con los siguientes endpoints:
                      </p>
                      <ul className="text-sm space-y-1 text-gray-700 mb-4">
                        <li>• POST /user/createUser</li>
                        <li>• GET /user/list</li>
                        <li>• DELETE /user/delete</li>
                        <li>• PATCH /user/state</li>
                        <li>• GET /user/context</li>
                      </ul>
                      <button
                        onClick={() => setCurrentView("users")}
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                      >
                        Abrir Gestión de Usuarios
                      </button>
                    </div>
                  </div>

                  {/* Módulo de Tipos de Objetivos */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b">
                      <h4 className="font-semibold">Módulo de Tipos de Objetivos</h4>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-600 mb-3">
                        Gestión de tipos de objetivos con los siguientes endpoints:
                      </p>
                      <ul className="text-sm space-y-1 text-gray-700 mb-4">
                        <li>• POST /type-objectives/createTypeObjective</li>
                        <li>• GET /type-objectives/listAllTypeObjective</li>
                        <li>• PATCH /type-objectives/updateNameTypeObjective</li>
                      </ul>
                      <button
                        onClick={() => setCurrentView("type-objectives")}
                        className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                      >
                        Abrir Tipos de Objetivos
                      </button>
                    </div>
                  </div>

                  {/* Módulo de Periodos de Tiempo */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b">
                      <h4 className="font-semibold">Módulo de Periodos de Tiempo</h4>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-600 mb-3">
                        Gestión de periodos (timeframes) con los siguientes endpoints:
                      </p>
                      <ul className="text-sm space-y-1 text-gray-700 mb-4">
                        <li>• POST /timeframes/createTimeframe</li>
                        <li>• GET /timeframes/listTimeframes</li>
                        <li>• PATCH /timeframes/updateTimeframeName</li>
                        <li>• PATCH /timeframes/updateTimeframeExtensionDate</li>
                      </ul>
                      <button
                        onClick={() => setCurrentView("timeframes")}
                        className="w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
                      >
                        Abrir Periodos de Tiempo
                      </button>
                    </div>
                  </div>

                  {/* Módulo de Acciones */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b">
                      <h4 className="font-semibold">Módulo de Acciones</h4>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-600 mb-3">
                        Gestión de acciones con los siguientes endpoints:
                      </p>
                      <ul className="text-sm space-y-1 text-gray-700 mb-4">
                        <li>• GET /actions/listActions</li>
                        <li>• POST /actions/createAction</li>
                        <li>• PATCH /actions/finalize</li>
                      </ul>
                      <button
                        onClick={() => setCurrentView("actions")}
                        className="w-full px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition-colors"
                      >
                        Abrir Gestión de Acciones
                      </button>
                    </div>
                  </div>

                  {/* Módulo de Planes de Mejora */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b">
                      <h4 className="font-semibold">Módulo de Planes de Mejora</h4>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-600 mb-3">
                        Gestión de planes de mejora con los siguientes endpoints:
                      </p>
                      <ul className="text-sm space-y-1 text-gray-700 mb-4">
                        <li>• POST /improvementplan/createImprovementPlan</li>
                        <li>• GET /improvementplan/listImprovementPlans</li>
                        <li>• PATCH /improvementplan/finalizeImprovementPlan</li>
                      </ul>
                      <button
                        onClick={() => setCurrentView("improvement-plans")}
                        className="w-full px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
                      >
                        Abrir Planes de Mejora
                      </button>
                    </div>
                  </div>

                  {/* Módulo de Objetivos */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b">
                      <h4 className="font-semibold">Módulo de Objetivos</h4>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-600 mb-3">
                        Gestión de objetivos con los siguientes endpoints:
                      </p>
                      <ul className="text-sm space-y-1 text-gray-700 mb-4">
                        <li>• POST /objectives/createObjective</li>
                        <li>• GET /objectives/listObjectives</li>
                        <li>• PATCH /objectives/finalize</li>
                      </ul>
                      <button
                        onClick={() => setCurrentView("objectives")}
                        className="w-full px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors"
                      >
                        Abrir Gestión de Objetivos
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-8">
              <h3 className="text-xl font-semibold mb-4">
                Tecnologías Utilizadas
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⚛️</span>
                  <span className="font-medium">Next.js 14</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📘</span>
                  <span className="font-medium">TypeScript</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🔄</span>
                  <span className="font-medium">TanStack Query</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🎨</span>
                  <span className="font-medium">Tailwind CSS</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📦</span>
                  <span className="font-medium">pnpm</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌐</span>
                  <span className="font-medium">Axios</span>
                </div>
              </div>
            </div>
          </div>
        ) : currentView === "users" ? (
          <div className="space-y-4">
            <button
              onClick={() => setCurrentView("home")}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
            >
              ← Volver al Inicio
            </button>
            <UserManagement />
          </div>
        ) : currentView === "type-objectives" ? (
          <div className="space-y-4">
            <button
              onClick={() => setCurrentView("home")}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
            >
              ← Volver al Inicio
            </button>
            <TypeObjectiveManagement />
          </div>
        ) : currentView === "timeframes" ? (
          <div className="space-y-4">
            <button
              onClick={() => setCurrentView("home")}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
            >
              ← Volver al Inicio
            </button>
            <TimeframeManagement />
          </div>
        ) : currentView === "actions" ? (
          <div className="space-y-4">
            <button
              onClick={() => setCurrentView("home")}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
            >
              ← Volver al Inicio
            </button>
            <ActionManagement />
          </div>
        ) : currentView === "dashboard" ? (
          <div className="space-y-4">
            <button
              onClick={() => setCurrentView("home")}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
            >
              ← Volver al Inicio
            </button>
            <Dashboard />
          </div>
        ) : currentView === "improvement-plans" ? (
          <div className="space-y-4">
            <button
              onClick={() => setCurrentView("home")}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
            >
              ← Volver al Inicio
            </button>
            <ImprovementPlanManagement />
          </div>
        ) : currentView === "objectives" ? (
          <div className="space-y-4">
            <button
              onClick={() => setCurrentView("home")}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
            >
              ← Volver al Inicio
            </button>
            <ObjectiveManagement />
          </div>
        ) : null}
      </div>
    </main>
  );
}
