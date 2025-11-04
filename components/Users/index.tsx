"use client";

import { useUsers } from "@/hooks/useUsers";
import { UserForm } from "./UserForm";
import { UserList } from "./UserList";
import { CreateUserRequest } from "@/models/User";

export function UsersManagement() {
  const {
    users,
    totalUsers,
    isLoadingUsers,
    usersError,
    createUser,
    isCreatingUser,
    deleteUser,
    isDeletingUser,
    updateUserState,
    isUpdatingState,
  } = useUsers();

  const handleCreateUser = async (userData: CreateUserRequest) => {
    try {
      await createUser(userData);
      alert("Usuario creado exitosamente");
    } catch (error: any) {
      alert(error?.response?.data?.message || "Error al crear usuario");
      throw error;
    }
  };

  const handleDeleteUser = async (code: string) => {
    try {
      await deleteUser(code);
      alert("Usuario eliminado exitosamente");
    } catch (error: any) {
      alert(error?.response?.data?.message || "Error al eliminar usuario");
      throw error;
    }
  };

  const handleToggleState = async (code: string, state: "A" | "I") => {
    try {
      await updateUserState({ code, state });
      alert("Estado actualizado exitosamente");
    } catch (error: any) {
      alert(error?.response?.data?.message || "Error al actualizar estado");
      throw error;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="bg-blue-600 rounded-xl p-4 text-4xl shadow-lg">
          👥
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>
          <p className="text-gray-600 mt-1">
            Administra y gestiona los usuarios del sistema
          </p>
        </div>
      </div>

      {/* Error Alert */}
      {usersError && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                Error al cargar usuarios. Por favor, intenta nuevamente.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total de Usuarios</p>
              <p className="text-3xl font-bold text-gray-900">{totalUsers}</p>
            </div>
            <div className="bg-blue-100 rounded-full p-3">
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Usuarios Activos</p>
              <p className="text-3xl font-bold text-gray-900">
                {users.filter((u) => u.state === "A").length}
              </p>
            </div>
            <div className="bg-green-100 rounded-full p-3">
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
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Usuarios Inactivos</p>
              <p className="text-3xl font-bold text-gray-900">
                {users.filter((u) => u.state === "I").length}
              </p>
            </div>
            <div className="bg-red-100 rounded-full p-3">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* User Form */}
      <UserForm onSubmit={handleCreateUser} isLoading={isCreatingUser} />

      {/* User List */}
      <UserList
        users={users}
        isLoading={isLoadingUsers}
        onDeleteUser={handleDeleteUser}
        onToggleState={handleToggleState}
        isDeletingUser={isDeletingUser}
        isUpdatingState={isUpdatingState}
      />
    </div>
  );
}
