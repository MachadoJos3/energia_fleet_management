"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RegisterUser from "@/components/user/RegisterUser";
import useAuth from "@/hooks/useAuth";

const RegisterPage = () => {
  const { register, user } = useAuth();
  const [error, setError] = useState<string>("");
  const isAdmin = user?.role === "admin";
  const router = useRouter();

  const handleRegister = async (
    name: string,
    email: string,
    password: string,
    role: string
  ) => {
    try {
      await register(name, email, password, role);
      router.push("/vehicles");
    } catch (err) {
      setError("Erro ao cadastrar usuário. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <RegisterUser
        onRegister={handleRegister}
        error={error}
        isAdmin={isAdmin}
      />
    </div>
  );
};

export default RegisterPage;
