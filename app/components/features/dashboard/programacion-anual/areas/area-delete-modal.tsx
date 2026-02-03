'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import Modal from '@/app/components/ui/modal';
import { Area } from '@/app/types';
import {
  deleteAreaAction,
} from './actions';
import type { ActionState } from './constants';
import { DEFAULT_REVALIDATE_PATH } from './constants';
import { Button } from '@/app/components/ui/button';

interface AreaDeleteModalProps {
  open: boolean;
  area: Area | null;
  revalidatePath?: string;
  onClose: () => void;
}

const initialState: ActionState = {
  success: false,
  message: '',
};

export function AreaDeleteModal({
  open,
  area,
  revalidatePath = DEFAULT_REVALIDATE_PATH,
  onClose,
}: AreaDeleteModalProps) {
  const [state, formAction, isPending] = useActionState(deleteAreaAction, initialState);
  const [localState, setLocalState] = useState({ success: false, message: '' });
  const wasPendingRef = useRef(false);

  // Reset estado local cuando se abre el modal
  useEffect(() => {
    if (open) {
      setLocalState({ success: false, message: '' });
    }
  }, [open]);

  // Procesar resultado solo cuando la acción termina (transición de isPending)
  useEffect(() => {
    if (wasPendingRef.current && !isPending) {
      if (state.success) {
        setLocalState({ success: false, message: '' });
        onClose();
      } else if (state.message) {
        setLocalState({ success: false, message: state.message });
      }
    }
    wasPendingRef.current = isPending;
  }, [isPending, state, onClose]);

  return (
    <Modal open={open} title="Eliminar área">
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="id_area" value={area?.id_area ?? ''} />
        <input type="hidden" name="revalidatePath" value={revalidatePath} />

        {localState.message && !localState.success && (
          <div className="alert alert-error text-sm">{localState.message}</div>
        )}

        <p className="text-foreground">
          ¿Desea eliminar el área <strong>{area?.name ?? ''}</strong>? Esta acción no se puede deshacer.
        </p>

        <div className="flex justify-end gap-2">
          <Button variant="destructive" type="button" onClick={onClose} disabled={isPending}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Eliminando...' : 'Eliminar'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
