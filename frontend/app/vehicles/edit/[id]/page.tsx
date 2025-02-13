"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Vehicle } from "@/types/vehicles";
import { useVehicles } from "@/hooks/useVehicles";
import VehicleEdit from "@/components/vehicles/VehicleEdit";
import Header from "@/components/templates/Header";
import { useParams } from "next/navigation";

export default function VehicleEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const { vehicles, loading } = useVehicles();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    if (!loading) {
      const foundVehicle = vehicles.find((v) => v.id === parseInt(id));
      if (foundVehicle) {
        setVehicle(foundVehicle);
      } else {
        router.push("/vehicles");
      }
    }
  }, [loading, vehicles, id, router]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!vehicle) {
    return null;
  }

  return (
    <>
      <Header />
      <main className="p-6">
        <VehicleEdit
          vehicle={vehicle}
          onBack={() => router.push("/vehicles")}
        />
      </main>
    </>
  );
}
