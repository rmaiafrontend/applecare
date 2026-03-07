import React from 'react';
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

export default function DeleteConfirmDialog({ open, onOpenChange, title, description, onConfirm }) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-[#18181b] border-white/[0.08] text-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">{title || 'Confirmar exclusao'}</AlertDialogTitle>
          <AlertDialogDescription className="text-white/40">
            {description || 'Esta acao nao pode ser desfeita. Deseja continuar?'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-white/[0.04] border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.08]">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-500 text-white border-0"
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
