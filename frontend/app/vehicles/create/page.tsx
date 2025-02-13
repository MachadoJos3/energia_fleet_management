"use client";
import { useRouter } from "next/navigation";
import VehicleCreate from "@/components/vehicles/VehicleCreate";
import Header from "@/components/templates/Header";

export default function VehicleCreatePage() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/vehicles");
  };

  return (
    <>
      <Header />
      <main className="p-6">
        <VehicleCreate onBack={handleBack} />
      </main>
    </>
  );
}
