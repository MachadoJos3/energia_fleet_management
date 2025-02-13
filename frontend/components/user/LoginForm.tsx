"use client";
import "@/app/styles/main.css";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api/auth";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      toast({
        title: "Preencha todos os campos",
        description: "O email e a senha são obrigatórios.",
        className: "custom-toast-warning",
        duration: 5000,
      });
      return;
    }
    setLoading(true);
    try {
      const data = await login(email, password);
      localStorage.setItem("authToken", data.token);
      router.push("/vehicles");
    } catch (error) {
      alert("Erro ao fazer login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className="mt-4 p-6 bg-gray-50 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Login</h3>
        <div className="space-y-2 flex flex-col">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="ml-2 p-2 border rounded"
            placeholder="Digite seu email"
          />
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="ml-2 p-2 border rounded"
            placeholder="Digite sua senha"
          />
        </div>
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={() => router.push("/")}>
            Voltar
          </Button>
          <Button
            variant="outline"
            className="bg-blue-500 hover:bg-blue-700 hover:text-white text-white"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Carregando..." : "Entrar"}
          </Button>
        </div>
      </div>
    </>
  );
}
