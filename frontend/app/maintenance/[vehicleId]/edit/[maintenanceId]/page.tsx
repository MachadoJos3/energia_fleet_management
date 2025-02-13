"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Maintenance } from "@/types/maintenance";
import { useMaintenance } from "@/hooks/useMaintenance";
import MaintenanceEdit from "@/components/maintenance/MaintenanceEdit";
import Header from "@/components/templates/Header";

export default function MaintenanceEditPage() {
  const params = useParams();
  const router = useRouter();
  const vehicleId = Number(params.vehicleId);
  const maintenanceId = Number(params.maintenanceId);
  const [maintenance, setMaintenance] = useState<Maintenance | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaintenance = async () => {
      try {
        // Busca todas as manutenções do veículo
        const response = await fetch(
          `http://localhost:3000/api/vehicles/${vehicleId}/maintenance`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar as manutenções");
        }

        const data = await response.json();

        // Filtra a manutenção pelo maintenanceId
        const foundMaintenance = data.find(
          (m: Maintenance) => m.id === maintenanceId
        );

        if (foundMaintenance) {
          setMaintenance(foundMaintenance);
        } else {
          router.push(`/maintenance/${vehicleId}`); // Redireciona se não encontrar
        }
      } catch (error) {
        console.error("Erro ao buscar a manutenção:", error);
        router.push(`/maintenance/${vehicleId}`); // Redireciona em caso de erro
      } finally {
        setLoading(false);
      }
    };

    fetchMaintenance();
  }, [maintenanceId, vehicleId, router]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!maintenance) {
    return null;
  }

  return (
    <>
      <Header />
      <main className="p-6">
        <MaintenanceEdit
          maintenance={maintenance}
          onBack={() => router.push(`/maintenance/${vehicleId}`)}
        />
      </main>
    </>
  );
}
