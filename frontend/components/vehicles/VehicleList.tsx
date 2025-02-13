import { useState } from "react";
import { useVehicles } from "@/hooks/useVehicles";
import { Button } from "@/components/ui/button";
import { Vehicle } from "@/types/vehicles";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import {
  TrashIcon,
  EyeIcon,
  WrenchIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import VehicleModal from "./VehicleModal";
import { useRouter } from "next/navigation";

interface VehicleListProps {
  onSelectVehicle: (vehicle: Vehicle) => void;
}

export const VehicleList = ({ onSelectVehicle }: VehicleListProps) => {
  const { vehicles, loading, handleDelete } = useVehicles();
  const { toast } = useToast();
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const router = useRouter();

  const handleDeleteWithToast = async () => {
    if (selectedVehicle) {
      try {
        await handleDelete(selectedVehicle.id);
        toast({
          title: "Veículo apagado",
          description: "O veículo foi removido com sucesso.",
          className: "custom-toast-success",
          duration: 3000,
        });
        setSelectedVehicle(null);
      } catch (error) {
        toast({
          title: "Erro",
          description: "Não foi possível apagar o veículo.",
          variant: "destructive",
          duration: 5000,
        });
      }
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600">Carregando, aguarde...</p>;
  }

  return (
    <>
      <Toaster />
      <div className="border border-gray-200 bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Modelo
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Ano
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Placa
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Quilometragem
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {vehicles.length > 0 ? (
              vehicles.map((vehicle) => (
                <tr
                  key={vehicle.id}
                  className="hover:bg-gray-50 transition-colors border-b border-gray-100"
                >
                  <td className="p-4 text-sm text-gray-700">{vehicle.model}</td>
                  <td className="p-4 text-sm text-gray-700">{vehicle.year}</td>
                  <td className="p-4 text-sm text-gray-700">
                    {vehicle.license_plate}
                  </td>
                  <td className="p-4 text-sm text-gray-700">
                    {vehicle.mileage} Km
                  </td>
                  <td className="p-4 flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        router.push(`/vehicles/edit/${vehicle.id}`)
                      }
                      className="flex items-center space-x-2"
                    >
                      <EyeIcon className="h-4 w-4" />
                      <span>Visualizar</span>
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => router.push(`/maintenance/${vehicle.id}`)}
                      className="flex items-center space-x-2"
                    >
                      <WrenchIcon className="h-4 w-4" />
                      <span>Manutenção</span>
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => router.push(`/tire/${vehicle.id}`)}
                      className="flex items-center space-x-2"
                    >
                      <TruckIcon className="h-4 w-4" />
                      <span>Pneu</span>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setSelectedVehicle(vehicle)}
                      className="flex items-center space-x-2"
                    >
                      <TrashIcon className="h-4 w-4" />
                      <span>Apagar</span>
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="p-4 text-sm text-gray-700 text-center"
                >
                  Nenhuma informação disponível
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <VehicleModal
        vehicle={selectedVehicle}
        onClose={() => setSelectedVehicle(null)}
        onDelete={handleDeleteWithToast}
      />
    </>
  );
};

export default VehicleList;
