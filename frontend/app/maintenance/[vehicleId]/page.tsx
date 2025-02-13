"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMaintenance } from "@/hooks/useMaintenance";
import MaintenanceList from "@/components/maintenance/MaintenanceList";
import MaintenanceModal from "@/components/maintenance/MaintenanceModal";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import Header from "@/components/templates/Header";
import { Maintenance } from "@/types/maintenance";

export default function MaintenancePage() {
  const params = useParams();
  const router = useRouter();
  const vehicleId = Number(params.vehicleId);
  const { maintenanceList, loading, handleDelete } = useMaintenance(vehicleId);
  const { toast } = useToast();
  const [selectedMaintenance, setSelectedMaintenance] =
    useState<Maintenance | null>(null);

  const handleDeleteMaintenance = async () => {
    if (selectedMaintenance) {
      try {
        await handleDelete(selectedMaintenance.id);
        toast({
          title: "Sucesso",
          description: "Manutenção deletada com sucesso!",
          className: "custom-toast-success",
          duration: 3000,
        });
        setSelectedMaintenance(null);
      } catch (error) {
        toast({
          title: "Erro",
          description: "Não foi possível deletar a manutenção.",
          variant: "destructive",
          duration: 3000,
        });
      }
    }
  };

  const handleCreateClick = () => {
    router.push(`/maintenance/${vehicleId}/create`);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <Header />
      <Toaster />
      <main className="p-6">
        <div className="p-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Lista de Manutenções</h1>
          <Button
            onClick={handleCreateClick}
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Adicionar Nova Manutenção
          </Button>
        </div>
        <MaintenanceList
          maintenanceList={maintenanceList}
          onDeleteMaintenance={(maintenanceId) => {
            const maintenance = maintenanceList.find(
              (m) => m.id === maintenanceId
            );
            if (maintenance) {
              setSelectedMaintenance(maintenance);
            }
          }}
        />
        <MaintenanceModal
          maintenance={selectedMaintenance}
          onClose={() => setSelectedMaintenance(null)}
          onDelete={handleDeleteMaintenance}
        />
      </main>
    </>
  );
}
