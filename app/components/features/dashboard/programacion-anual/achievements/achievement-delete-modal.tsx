'use client';

import { useActionState, useEffect, useMemo, useRef, useState } from 'react';
import Modal from '@/app/components/ui/modal';
import { Achievement } from '@/app/types';
import {
  deleteAchievementAction,
} from './actions';
import type { ActionState } from './constants';
import { DEFAULT_REVALIDATE_PATH } from './constants';
import { Button } from '@/app/components/ui/button';

interface AchievementDeleteModalProps {
  open: boolean;
  achievement: Achievement | null;
  revalidatePath?: string;
  onClose: () => void;
}

const initialState: ActionState = {
  success: false,
  message: '',
};

const initialLocalState = {
  success: false,
  message: '',
};

export function AchievementDeleteModal({
  open,
  achievement,
  revalidatePath = DEFAULT_REVALIDATE_PATH,
  onClose,
}: AchievementDeleteModalProps) {
  const action = useMemo(() => deleteAchievementAction, []);
  const [state, formAction, isPending] = useActionState(action, initialState);
  const [localState, setLocalState] = useState(initialLocalState);
  const wasPendingRef = useRef(false);

  // Reset estado local cuando se abre el modal
  useEffect(() => {
    if (open) {
      setLocalState(initialLocalState);
    }
  }, [open]);

  // Procesar resultado solo cuando la acción termina (transición de isPending)
  useEffect(() => {
    if (wasPendingRef.current && !isPending) {
      if (state.success) {
        setLocalState(initialLocalState);
        onClose();
      } else if (state.message) {
        setLocalState({ success: false, message: state.message });
      }
    }
    wasPendingRef.current = isPending;
  }, [isPending, state, onClose]);

  const truncatedDescription = achievement?.description
    ? achievement.description.length > 50
      ? `${achievement.description.slice(0, 50)}...`
      : achievement.description
    : '';

  return (
    <Modal open={open} title="Eliminar logro">
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="id_achievement" value={achievement?.id_achievement ?? ''} />
        <input type="hidden" name="revalidatePath" value={revalidatePath} />

        {localState.message && !localState.success && (
          <div className="alert alert-error text-sm">{localState.message}</div>
        )}

        <p className='text-foreground'>
          ¿Desea eliminar el logro <strong>&quot;{truncatedDescription}&quot;</strong>? Esta acción no se puede deshacer.
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
