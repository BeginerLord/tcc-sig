"use client";

import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

/**
 * Componente de ejemplo para autenticación
 * Muestra formulario de login y datos del usuario autenticado
 */
export function ExampleComponent() {
  const {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated,
    isLoggingIn,
    isLoggingOut,
  } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({ username, password });
      if (response.success) {
        alert("Login exitoso");
      } else {
        alert(`Error en login: ${response.message || "Error desconocido"}`);
      }
    } catch (error: any) {
      alert(
        `Error en login: ${error.response?.data?.message || error.message}`
      );
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      alert("Sesión cerrada exitosamente");
    } catch (error: any) {
      alert(`Error al cerrar sesión: ${error.message}`);
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="p-4">
        <p>Cargando información del usuario...</p>
      </div>
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className="p-6 border rounded-lg bg-white shadow-sm">
        <h2 className="text-xl font-bold mb-4">Usuario Autenticado</h2>
        <div className="space-y-2 mb-4">
          <p>
            <span className="font-semibold">Usuario:</span> {user.username}
          </p>
          <p>
            <span className="font-semibold">Correo:</span> {user.mail}
          </p>
          <p>
            <span className="font-semibold">Teléfono:</span> {user.phone}
          </p>
          <p>
            <span className="font-semibold">Rol:</span>{" "}
            <span
              className={`px-2 py-1 rounded text-sm ${
                user.role === "lider"
                  ? "bg-purple-100 text-purple-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {user.role === "lider" ? "Líder" : "Colaborador"}
            </span>
          </p>
          <p>
            <span className="font-semibold">Estado:</span>{" "}
            <span
              className={`px-2 py-1 rounded text-sm ${
                user.state === "A"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {user.state === "A" ? "Activo" : "Inactivo"}
            </span>
          </p>
          <p className="text-xs text-gray-500">
            <span className="font-semibold">Código:</span> {user.code}
          </p>
        </div>
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400 transition-colors"
        >
          {isLoggingOut ? "Cerrando sesión..." : "Cerrar Sesión"}
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 border rounded-lg bg-white shadow-sm">
      <h2 className="text-xl font-bold mb-4">Iniciar Sesión</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block mb-2 font-medium">Usuario:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingresa tu usuario"
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingresa tu contraseña"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoggingIn}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
        >
          {isLoggingIn ? "Iniciando sesión..." : "Iniciar Sesión"}
        </button>
      </form>
    </div>
  );
}
