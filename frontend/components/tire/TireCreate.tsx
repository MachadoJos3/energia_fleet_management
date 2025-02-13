// components/tires/TireCreate.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTires } from "@/hooks/useTire";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

interface TireCreateProps {
  vehicleId: number;
  onBack: () => void;
}

export default function TireCreate({ vehicleId, onBack }: TireCreateProps) {
  const [newTire, setNewTire] = useState({
    installation_date: new Date().toISOString().split("T")[0],
    mileage_at_installation: 0,
    predicted_replacement_mileage: 0,
  });

  const { handleCreate } = useTires(vehicleId);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTire((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !newTire.installation_date ||
      !newTire.mileage_at_installation ||
      !newTire.predicted_replacement_mileage
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
      await handleCreate(newTire);
      toast({
        title: "Sucesso",
        description: "Pneu adicionado com sucesso!",
        className: "custom-toast-success",
        duration: 3000,
      });
      onBack();
    } catch (error) {
      console.error("Erro ao criar pneu:", error);
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o pneu.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <>
      <Toaster />
      <div className="mt-4 p-6 bg-gray-50 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Adicionar Pneu</h3>
        <div className="space-y-2 flex flex-col">
          <label>
            <strong>Data de Instalação:</strong>
          </label>
          <input
            type="date"
            name="installation_date"
            value={newTire.installation_date}
            onChange={handleChange}
            className="ml-2 p-2 border rounded"
          />
        </div>
        <div className="space-y-2 flex flex-col">
          <label>
            <strong>KM na Instalação:</strong>
          </label>
          <input
            type="number"
            name="mileage_at_installation"
            value={newTire.mileage_at_installation}
            onChange={handleChange}
            className="ml-2 p-2 border rounded"
          />
        </div>
        <div className="space-y-2 flex flex-col">
          <label>
            <strong>KM Previsto para Troca:</strong>
          </label>
          <input
            type="number"
            name="predicted_replacement_mileage"
            value={newTire.predicted_replacement_mileage}
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
