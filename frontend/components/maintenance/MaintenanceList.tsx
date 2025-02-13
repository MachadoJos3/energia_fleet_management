import { Button } from "@/components/ui/button";
import {
  TrashIcon,
  PencilIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";
import { Maintenance } from "@/types/maintenance";
import { useRouter } from "next/navigation";

interface MaintenanceListProps {
  maintenanceList: Maintenance[];
  onDeleteMaintenance: (maintenanceId: number) => void;
}

const MaintenanceList = ({
  maintenanceList,
  onDeleteMaintenance,
}: MaintenanceListProps) => {
  const router = useRouter();

  return (
    <div className="border border-gray-200 bg-white p-6 rounded-lg shadow-md overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="p-4 text-left text-sm font-semibold text-gray-700">
              Data
            </th>
            <th className="p-4 text-left text-sm font-semibold text-gray-700">
              Descrição
            </th>
            <th className="p-4 text-left text-sm font-semibold text-gray-700">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {maintenanceList.length > 0 ? (
            maintenanceList.map((maintenance) => (
              <tr
                key={maintenance.id}
                className="hover:bg-gray-50 transition-colors border-b border-gray-100"
              >
                <td className="p-4 text-sm text-gray-700">
                  {new Date(maintenance.date).toLocaleDateString("pt-BR")}
                </td>
                <td className="p-4 text-sm text-gray-700">
                  {maintenance.description}
                </td>
                <td className="p-4 flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      router.push(
                        `/maintenance/${maintenance.vehicle_id}/edit/${maintenance.id}`
                      )
                    }
                    className="flex items-center space-x-2"
                  >
                    <PencilIcon className="h-4 w-4" />
                    <span>Editar</span>
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDeleteMaintenance(maintenance.id)}
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
              <td colSpan={3} className="p-4 text-sm text-gray-700 text-center">
                Nenhuma manutenção registrada
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Button
        variant="outline"
        size="sm"
        onClick={() => router.push(`/vehicles`)}
        className="mt-4 flex items-center space-x-2 text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
      >
        <ChevronLeftIcon className="h-4 w-4" />
        <span>Voltar</span>
      </Button>
    </div>
  );
};

export default MaintenanceList;
