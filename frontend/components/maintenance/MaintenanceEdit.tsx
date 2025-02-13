"use client";

import { useState } from "react";
import { Maintenance } from "@/types/maintenance";
import { Button } from "@/components/ui/button";
import { useMaintenance } from "@/hooks/useMaintenance";

interface MaintenanceEditProps {
  maintenance: Maintenance;
  onBack: () => void;
}

export default function MaintenanceEdit({
  maintenance,
  onBack,
}: MaintenanceEditProps) {
  const [updatedMaintenance, setUpdatedMaintenance] =
    useState<Maintenance>(maintenance);
  const { handleUpdate } = useMaintenance(maintenance.vehicle_id);

  const formatDateForDisplay = (date: string) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatDateForSubmit = (date: string) => {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
      throw new Error("Formato de data inválido. Use uma data válida.");
    }

    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedMaintenance((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (!updatedMaintenance.date) {
        console.error("Data da manutenção é obrigatória.");
        return;
      }

      const formattedDate = formatDateForSubmit(updatedMaintenance.date);
      const updatedData = { ...updatedMaintenance, date: formattedDate };

      console.log("Dados enviados:", updatedData);
      await handleUpdate(updatedMaintenance.id, updatedData);
      onBack();
    } catch (error) {
      console.error("Erro ao tentar atualizar a manutenção", error);
    }
  };

  return (
    <div className="mt-4 p-6 bg-gray-50 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Editar Manutenção:</h3>

      <div className="space-y-2 flex flex-col">
        <label>
          <strong>Descrição:</strong>
        </label>
        <input
          type="text"
          name="description"
          value={updatedMaintenance.description || ""}
          onChange={handleChange}
          className="ml-2 p-2 border rounded"
        />
      </div>

      <div className="space-y-2 flex flex-col">
        <label>
          <strong>KM para manutenção:</strong>
        </label>
        <input
          type="text"
          name="mileage_at_maintenance"
          value={updatedMaintenance.mileage_at_maintenance || ""}
          onChange={handleChange}
          className="ml-2 p-2 border rounded"
        />
      </div>

      <div className="space-y-2 flex flex-col">
        <label>
          <strong>Data da manutenção:</strong>
        </label>
        <input
          type="text"
          name="date"
          value={
            updatedMaintenance.date
              ? formatDateForDisplay(updatedMaintenance.date)
              : ""
          }
          onChange={handleChange}
          className="ml-2 p-2 border rounded"
          placeholder="DD/MM/AAAA"
        />
      </div>

      <div className="space-y-2 flex flex-col mt-4">
        <label>
          <strong>Tipo:</strong>
        </label>
        <select
          name="type"
          value={updatedMaintenance.type || ""}
          onChange={handleChange}
          className="ml-2 p-2 border rounded"
        >
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
  );
}
