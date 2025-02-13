// components/tires/TireEdit.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTires } from "@/hooks/useTire";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Tire } from "@/types/tire";

interface TireEditProps {
  tire: Tire;
  onBack: () => void;
}

export default function TireEdit({ tire, onBack }: TireEditProps) {
  const [updatedTire, setUpdatedTire] = useState<Tire>(tire);
  const { handleUpdate } = useTires(tire.vehicle_id);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedTire((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatToBrazilianDate = (date: string | Date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("pt-BR");
  };

  const handleSubmit = async () => {
    if (
      !updatedTire.installation_date ||
      !updatedTire.mileage_at_installation ||
      !updatedTire.predicted_replacement_mileage
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
      await handleUpdate(updatedTire.id, updatedTire);
      toast({
        title: "Sucesso",
        description: "Pneu atualizado com sucesso!",
        className: "custom-toast-success",
        duration: 3000,
      });
      onBack();
    } catch (error) {
      console.error("Erro ao atualizar pneu:", error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o pneu.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <>
      <Toaster />
      <div className="mt-4 p-6 bg-gray-50 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Editar Pneu</h3>
        <div className="space-y-2 flex flex-col">
          <label>
            <strong>Data de Instalação:</strong>
          </label>
          <input
            type="date"
            name="installation_date"
            value={updatedTire.installation_date.split("/").reverse().join("-")}
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
            value={updatedTire.mileage_at_installation}
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
            value={updatedTire.predicted_replacement_mileage}
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
