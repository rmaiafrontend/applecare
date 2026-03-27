import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface RemoveItemDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function RemoveItemDialog({ open, onClose, onConfirm }: RemoveItemDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-[320px] rounded-3xl p-6">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-base font-bold text-center">
            Remover item?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-sm text-gray-400">
            Tem certeza que deseja remover este item do carrinho?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row gap-3 mt-2">
          <AlertDialogCancel className="flex-1 h-11 rounded-xl border-gray-200 text-sm font-medium">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="flex-1 h-11 rounded-xl bg-red-500 hover:bg-red-600 text-sm font-semibold"
          >
            Remover
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
