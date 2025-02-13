// app/tires/[vehicleId]/create/page.tsx
"use client";

import { useRouter, useParams } from "next/navigation";
import TireCreate from "@/components/tire/TireCreate";
import Header from "@/components/templates/Header";

export default function TireCreatePage() {
  const router = useRouter();
  const params = useParams();
  const vehicleId = Number(params.vehicleId);

  const handleBack = () => {
    router.push(`/tires/${vehicleId}`);
  };

  return (
    <>
      <Header />
      <main className="p-6">
        <TireCreate vehicleId={vehicleId} onBack={handleBack} />
      </main>
    </>
  );
}
