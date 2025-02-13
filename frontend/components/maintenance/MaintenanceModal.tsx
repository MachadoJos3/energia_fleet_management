// components/maintenance/MaintenanceModal.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Maintenance } from "@/types/maintenance";

interface MaintenanceModalProps {
  maintenance: Maintenance | null;
  onClose: () => void;
  onDelete: () => void;
}

const MaintenanceModal = ({
  maintenance,
  onClose,
  onDelete,
}: MaintenanceModalProps) => {
  return (
    <Dialog open={!!maintenance} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Atenção</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <p>
            Você tem certeza que deseja apagar a manutenção do dia{" "}
            <strong>
              {maintenance &&
                new Date(maintenance.date).toLocaleDateString("pt-BR")}
            </strong>
            ?
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

export default MaintenanceModal;
