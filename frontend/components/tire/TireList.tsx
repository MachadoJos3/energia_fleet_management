import { Button } from "@/components/ui/button";
import {
  TrashIcon,
  PencilIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";
import { Tire } from "@/types/tire";
import { useRouter } from "next/navigation";

interface TireListProps {
  tiresList: Tire[];
  onDeleteTire: (tireId: number) => void;
}

const TireList = ({ tiresList, onDeleteTire }: TireListProps) => {
  const router = useRouter();

  return (
    <div className="border border-gray-200 bg-white p-6 rounded-lg shadow-md overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="p-4 text-left text-sm font-semibold text-gray-700">
              Data de Instalação
            </th>
            <th className="p-4 text-left text-sm font-semibold text-gray-700">
              KM na Instalação
            </th>
            <th className="p-4 text-left text-sm font-semibold text-gray-700">
              KM Previsto para Troca
            </th>
            <th className="p-4 text-left text-sm font-semibold text-gray-700">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {tiresList.length > 0 ? (
            tiresList.map((tire) => (
              <tr
                key={tire.id}
                className="hover:bg-gray-50 transition-colors border-b border-gray-100"
              >
                <td className="p-4 text-sm text-gray-700">
                  {new Date(tire.installation_date).toLocaleDateString("pt-BR")}
                </td>
                <td className="p-4 text-sm text-gray-700">
                  {tire.mileage_at_installation}
                </td>
                <td className="p-4 text-sm text-gray-700">
                  {tire.predicted_replacement_mileage}
                </td>
                <td className="p-4 flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      router.push(`/tire/${tire.vehicle_id}/edit/${tire.id}`)
                    }
                    className="flex items-center space-x-2"
                  >
                    <PencilIcon className="h-4 w-4" />
                    <span>Editar</span>
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDeleteTire(tire.id)}
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
              <td colSpan={4} className="p-4 text-sm text-gray-700 text-center">
                Nenhum pneu registrado
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

export default TireList;
