"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTires } from "@/hooks/useTire";
import TireList from "@/components/tire/TireList";
import TireModal from "@/components/tire/TireModal";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import Header from "@/components/templates/Header";
import { Tire } from "@/types/tire";

export default function TirePage() {
  const params = useParams();
  const router = useRouter();
  const vehicleId = Number(params.vehicleId);
  const { tiresList, loading, handleDelete } = useTires(vehicleId);
  const { toast } = useToast();
  const [selectedTire, setSelectedTire] = useState<Tire | null>(null);

  const handleDeleteTire = async () => {
    if (selectedTire) {
      try {
        await handleDelete(selectedTire.id);
        toast({
          title: "Sucesso",
          description: "Pneu deletado com sucesso!",
          className: "custom-toast-success",
          duration: 3000,
        });
        setSelectedTire(null);
      } catch (error) {
        toast({
          title: "Erro",
          description: "Não foi possível deletar o pneu.",
          variant: "destructive",
          duration: 3000,
        });
      }
    }
  };

  const handleCreateClick = () => {
    router.push(`/tire/${vehicleId}/create`);
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
          <h1 className="text-2xl font-bold">Lista de Pneus</h1>
          <Button
            onClick={handleCreateClick}
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Adicionar Novo Pneu
          </Button>
        </div>
        <TireList
          tiresList={tiresList}
          onDeleteTire={(tireId) => {
            const tire = tiresList.find((t) => t.id === tireId);
            if (tire) {
              setSelectedTire(tire);
            }
          }}
        />
        <TireModal
          tire={selectedTire}
          onClose={() => setSelectedTire(null)}
          onDelete={handleDeleteTire}
        />
      </main>
    </>
  );
}
