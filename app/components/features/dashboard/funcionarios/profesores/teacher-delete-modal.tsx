'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { Teacher } from '@/app/types';
import { deleteTeacherAction, ActionState } from './actions';
import Modal from '@/app/components/ui/modal';
import { Button } from '@/app/components/ui/button';

interface TeacherDeleteModalProps {
  open: boolean;
  teacher: Teacher;
  onClose: () => void;
}

const initialState: ActionState = {
  success: false,
  message: '',
};

export function TeacherDeleteModal({ open, teacher, onClose }: TeacherDeleteModalProps) {
  const [state, formAction, isPending] = useActionState(deleteTeacherAction, initialState);
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
    <Modal open={open} title="Eliminar Docente">
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="id_teacher" value={teacher.id_teacher} />
        
        {localState.message && !localState.success && (
          <div className="alert alert-error text-sm">{localState.message}</div>
        )}

        <p className='text-foreground'>
          ¿Está seguro de eliminar al docente{' '}
          <strong>{teacher.name} {teacher.last_name}</strong>?
        </p>

        <div className="flex justify-end gap-2">
          <Button type="button" variant={"destructive"} onClick={onClose} disabled={isPending}>
            Cancelar
          </Button>
          <Button type="submit"  disabled={isPending}>
            {isPending ? 'Eliminando...' : 'Eliminar'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
