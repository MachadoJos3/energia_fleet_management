"use client";
import "@/app/styles/main.css";
import { useState } from "react";
import VehicleList from "@/components/vehicles/VehicleList";
import VehicleEdit from "@/components/vehicles/VehicleEdit";
import VehicleCreate from "@/components/vehicles/VehicleCreate";
import useAuth from "@/hooks/useAuth"; // Ajuste o caminho conforme a estrutura do seu projeto
import { Vehicle } from "@/types/vehicles";
import Header from "@/components/templates/Header";

export default function VehiclePage() {
  useAuth();
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [mode, setMode] = useState<"list" | "create" | "edit">("list");

  const handleCreateClick = () => {
    setMode("create");
  };

  const handleEditClick = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setMode("edit");
  };

  return (
    <>
      <Header />
      <main className="p-6">
        <div className="p-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Lista de Veículos</h1>
          {mode !== "create" && (
            <button
              onClick={handleCreateClick}
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              Adicionar Novo Veículo
            </button>
          )}
        </div>
        {mode === "create" ? (
          <VehicleCreate onBack={() => setMode("list")} />
        ) : mode === "edit" && selectedVehicle ? (
          <VehicleEdit
            vehicle={selectedVehicle}
            onBack={() => {
              setMode("list");
              setSelectedVehicle(null);
            }}
          />
        ) : (
          <VehicleList onSelectVehicle={handleEditClick} />
        )}
      </main>
    </>
  );
}
