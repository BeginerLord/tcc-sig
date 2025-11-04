"use client";

import { Login } from "@/components/Login";

export default function Home() {
  const handleLoginSuccess = () => {
    console.log("Login exitoso!");
    // Aquí puedes agregar la lógica de redirección después del login
  };

  return <Login onLoginSuccess={handleLoginSuccess} />;
}
