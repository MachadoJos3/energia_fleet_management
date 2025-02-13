"use client";
import { useRouter } from "next/navigation";
import "@/app/styles/main.css";
import VehicleList from "@/components/vehicles/VehicleList";
import useAuth from "@/hooks/useAuth";
import Header from "@/components/templates/Header";

export default function VehiclePage() {
  useAuth();
  const router = useRouter();

  const handleCreateClick = () => {
    router.push("/vehicles/create");
  };

  return (
    <>
      <Header />
      <main className="p-6">
        <div className="p-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Lista de Veículos</h1>
          <button
            onClick={handleCreateClick}
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Adicionar Novo Veículo
          </button>
        </div>
        <VehicleList />
      </main>
    </>
  );
}
