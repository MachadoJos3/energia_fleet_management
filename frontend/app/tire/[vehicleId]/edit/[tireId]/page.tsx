// app/tires/[vehicleId]/edit/[tireId]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Tire } from "@/types/tire";
import { getTiresByVehicleId } from "@/lib/api/tire";
import TireEdit from "@/components/tire/TireEdit";
import Header from "@/components/templates/Header";

export default function TireEditPage() {
  const params = useParams();
  const router = useRouter();
  const vehicleId = Number(params.vehicleId);
  const tireId = Number(params.tireId);
  const [tire, setTire] = useState<Tire | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTire = async () => {
      try {
        const tires = await getTiresByVehicleId(vehicleId);
        const foundTire = tires.find((t) => t.id === tireId);
        if (foundTire) {
          setTire(foundTire);
        } else {
          router.push(`/tire/${vehicleId}`);
        }
      } catch (error) {
        console.error("Erro ao buscar o pneu:", error);
        router.push(`/tire/${vehicleId}`);
      } finally {
        setLoading(false);
      }
    };

    fetchTire();
  }, [vehicleId, tireId, router]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!tire) {
    return null;
  }

  return (
    <>
      <Header />
      <main className="p-6">
        <TireEdit
          tire={tire}
          onBack={() => router.push(`/tire/${vehicleId}`)}
        />
      </main>
    </>
  );
}
