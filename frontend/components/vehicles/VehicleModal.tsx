import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Vehicle } from "@/types/vehicles";

interface VehicleModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  onDelete: () => void;
}

const VehicleModal = ({ vehicle, onClose, onDelete }: VehicleModalProps) => {
  return (
    <Dialog open={!!vehicle} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Atenção</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <p>
            Você tem certeza que deseja apagar o veículo{" "}
            <strong>{vehicle?.model}</strong> ({vehicle?.license_plate})?
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VehicleModal;
