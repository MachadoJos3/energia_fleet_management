"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useVehicles } from "@/hooks/useVehicles";
import { Vehicle } from "@/types/vehicles";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

interface VehicleCreateProps {
  onBack: () => void;
}

export default function VehicleCreate({ onBack }: VehicleCreateProps) {
  const [createVehicle, setCreationVehicle] = useState<Vehicle>({
    id: 0,
    model: "",
    year: 0,
    license_plate: "",
    mileage: 0,
    created_at: "",
    updated_at: "",
  });

  const { handleCreate } = useVehicles();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Para o campo year, garantir que o valor seja um número válido
    if (name === "year" || name === "mileage") {
      // Se o valor não for um número, não faz nada
      if (!isNaN(Number(value)) || value === "") {
        setCreationVehicle((prev) => ({
          ...prev,
          [name]: value === "" ? "" : Number(value),
        }));
      }
    } else {
      setCreationVehicle((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    if (
      !createVehicle.model ||
      !createVehicle.year ||
      !createVehicle.license_plate ||
      !createVehicle.mileage
    ) {
      toast({
        title: "Atenção",
        description: "Preencha todos os campos.",
        className: "custom-toast-warning",
        duration: 3000,
      });
      return;
    }

    try {
      await handleCreate(createVehicle);
      toast({
        title: "Sucesso",
        description: "Veículo adicionado com sucesso!",
        className: "custom-toast-success",
        duration: 3000,
      });
      onBack();
    } catch (error) {
      console.error("Erro ao tentar criar o veículo", error);
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o veículo.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <>
      <Toaster />
      <div className="mt-4 p-6 bg-gray-50 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Adicionar Veículo:</h3>
        <div className="space-y-2 flex flex-col">
          <label>
            <strong>Modelo:</strong>
          </label>
          <input
            type="text"
            name="model"
            value={createVehicle.model}
            onChange={handleChange}
            className="ml-2 p-2 border rounded"
          />
          <label>
            <strong>Ano:</strong>
          </label>
          <input
            type="text"
            name="year"
            value={createVehicle.year}
            onChange={handleChange}
            className="ml-2 p-2 border rounded"
            placeholder="Digite o ano"
          />
          <label>
            <strong>Placa:</strong>
          </label>
          <input
            type="text"
            name="license_plate"
            value={createVehicle.license_plate}
            onChange={handleChange}
            className="ml-2 p-2 border rounded"
          />
          <label>
            <strong>Quilometragem:</strong>
          </label>
          <input
            type="number"
            name="mileage"
            value={createVehicle.mileage}
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
    </>
  );
}
