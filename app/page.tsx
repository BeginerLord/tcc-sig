"use client";

import { Login } from "@/components/Login";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLoginSuccess = () => {
    // Redirigir al dashboard después del login exitoso
    router.push("/dashboard");
  };

  return <Login onLoginSuccess={handleLoginSuccess} />;
}
