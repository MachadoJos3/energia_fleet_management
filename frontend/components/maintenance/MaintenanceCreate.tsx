"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMaintenance } from "@/hooks/useMaintenance";
import { Maintenance } from "@/types/maintenance";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

interface MaintenanceCreateProps {
  vehicleId: number;
  onBack: () => void;
}

export default function MaintenanceCreate({
  vehicleId,
  onBack,
}: MaintenanceCreateProps) {
  const [newMaintenance, setNewMaintenance] = useState<Omit<Maintenance, "id">>(
    {
      vehicle_id: vehicleId,
      type: "",
      description: "",
      mileage_at_maintenance: 0,
      date: new Date().toISOString().split("T")[0], // Formato YYYY-MM-DD
    }
  );

  const { handleCreate } = useMaintenance(vehicleId);
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewMaintenance((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!newMaintenance.description || !newMaintenance.date) {
      toast({
        title: "Atenção",
        description: "Preencha todos os campos obrigatórios.",
        className: "custom-toast-warning",
        duration: 3000,
      });
      return;
    }

    try {
      await handleCreate(newMaintenance as Maintenance); // Cast para Maintenance
      toast({
        title: "Sucesso",
        description: "Manutenção criada com sucesso!",
        className: "custom-toast-success",
        duration: 3000,
      });
      onBack(); // Volta para a lista de manutenções
    } catch (error) {
      console.error("Erro ao criar manutenção:", error);
      toast({
        title: "Erro",
        description: "Não foi possível criar a manutenção.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <>
      <Toaster />
      <div className="mt-4 p-6 bg-gray-50 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Criar Nova Manutenção</h3>

        <div className="space-y-2 flex flex-col">
          <label>
            <strong>Descrição:</strong>
          </label>
          <input
            type="text"
            name="description"
            value={newMaintenance.description}
            onChange={handleChange}
            className="ml-2 p-2 border rounded"
          />
        </div>

        <div className="space-y-2 flex flex-col">
          <label>
            <strong>KM para manutenção:</strong>
          </label>
          <input
            type="number"
            name="mileage_at_maintenance"
            value={newMaintenance.mileage_at_maintenance}
            onChange={handleChange}
            className="ml-2 p-2 border rounded"
          />
        </div>

        <div className="space-y-2 flex flex-col">
          <label>
            <strong>Data da manutenção:</strong>
          </label>
          <input
            type="date"
            name="date"
            value={newMaintenance.date}
            onChange={handleChange}
            className="ml-2 p-2 border rounded"
          />
        </div>

        <div className="space-y-2 flex flex-col mt-4">
          <label>
            <strong>Tipo:</strong>
          </label>
          <select
            name="type"
            value={newMaintenance.type}
            onChange={handleChange}
            className="ml-2 p-2 border rounded"
          >
            <option value="">Selecione um tipo</option>
            <option value="trocaDeOleo">Troca de Óleo</option>
            <option value="inspecaoGeral">Inspeção Geral</option>
          </select>
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
