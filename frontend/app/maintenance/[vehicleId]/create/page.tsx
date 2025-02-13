"use client";

import { useRouter, useParams } from "next/navigation";
import MaintenanceCreate from "@/components/maintenance/MaintenanceCreate";
import Header from "@/components/templates/Header";

export default function MaintenanceCreatePage() {
  const router = useRouter();
  const params = useParams();
  const vehicleId = Number(params.vehicleId);

  const handleBack = () => {
    router.push(`/maintenance/${vehicleId}`);
  };

  return (
    <>
      <Header />
      <main className="p-6">
        <MaintenanceCreate vehicleId={vehicleId} onBack={handleBack} />
      </main>
    </>
  );
}
