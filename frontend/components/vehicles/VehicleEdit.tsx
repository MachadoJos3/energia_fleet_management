"use client";
import { useState } from "react";
import { Vehicle } from "../../../backend/models/Vehicle";
import { Button } from "@/components/ui/button";
import { useVehicles } from "@/hooks/useVehicles";

interface VehicleEditProps {
  vehicle: Vehicle;
  onBack: () => void;
}

export default function VehicleEdit({ vehicle, onBack }: VehicleEditProps) {
  const [updatedVehicle, setUpdatedVehicle] = useState<Vehicle>(vehicle);
  const { handleUpdate } = useVehicles();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedVehicle((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await handleUpdate(updatedVehicle);
      onBack();
    } catch (error) {
      console.error("Erro ao tentar atualizar o veículo", error);
    }
  };

  return (
    <div className="mt-4 p-6 bg-gray-50 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Editar Veículo:</h3>
      <div className="space-y-2 flex flex-col">
        <label>
          <strong>Modelo:</strong>
        </label>
        <input
          type="text"
          name="model"
          value={updatedVehicle.model || ""}
          onChange={handleChange}
          className="ml-2 p-2 border rounded"
        />
        <label>
          <strong>Ano:</strong>
        </label>
        <input
          type="text"
          name="year"
          value={updatedVehicle.year || ""}
          onChange={handleChange}
          className="ml-2 p-2 border rounded"
        />
        <label>
          <strong>Placa:</strong>
        </label>
        <input
          type="text"
          name="license_plate"
          value={updatedVehicle.license_plate || ""}
          onChange={handleChange}
          className="ml-2 p-2 border rounded"
        />
        <label>
          <strong>Quilometragem:</strong>
        </label>
        <input
          type="number"
          name="mileage"
          value={updatedVehicle.mileage || ""}
          onChange={handleChange}
          className="ml-2 p-2 border rounded"
        />
      </div>
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          Voltar
        </Button>
        <Button
          variant="outline"
          className="bg-blue-500 hover:bg-blue-700 hover:text-white text-white"
          onClick={handleSubmit}
        >
          Salvar
        </Button>
      </div>
    </div>
  );
}
