"use client";

import { UserManagement } from "@/components/UserManagement";
import { useState } from "react";

export default function Home() {
  const [showUserManagement, setShowUserManagement] = useState(false);

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
        {!showUserManagement ? (
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
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b">
                    <h4 className="font-semibold">Módulo de Usuarios</h4>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-600 mb-3">
                      Gestión completa de usuarios con los siguientes endpoints:
                    </p>
                    <ul className="text-sm space-y-1 text-gray-700">
                      <li>• POST /user/createUser - Crear usuario</li>
                      <li>• GET /user/list - Listar usuarios</li>
                      <li>• DELETE /user/delete - Eliminar usuario</li>
                      <li>• PATCH /user/state - Actualizar estado</li>
                      <li>• GET /user/context - Contexto del usuario</li>
                    </ul>
                    <button
                      onClick={() => setShowUserManagement(true)}
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                      Abrir Gestión de Usuarios
                    </button>
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
        ) : (
          <div className="space-y-4">
            <button
              onClick={() => setShowUserManagement(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
            >
              ← Volver al Inicio
            </button>
            <UserManagement />
          </div>
        )}
      </div>
    </main>
  );
}
