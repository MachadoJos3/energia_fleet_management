// components/tires/TireModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tire } from "@/types/tire";

interface TireModalProps {
  tire: Tire | null;
  onClose: () => void;
  onDelete: () => void;
}

const TireModal = ({ tire, onClose, onDelete }: TireModalProps) => {
  return (
    <Dialog open={!!tire} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Atenção</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <p>
            Você tem certeza que deseja apagar o pneu instalado em{" "}
            <strong>
              {tire &&
                new Date(tire.installation_date).toLocaleDateString("pt-BR")}
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

export default TireModal;
