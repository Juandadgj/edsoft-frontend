'use client';

import { ChangeEvent, useActionState, useEffect, useRef, useState } from 'react';
import { Area } from '@/app/types';
import {
  saveAreaAction,
} from './actions';
import type { ActionState } from './constants';
import { DEFAULT_REVALIDATE_PATH } from './constants';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Select } from '@/app/components/ui/select';

interface AreaFormProps {
  area?: Area | null;
  revalidatePath?: string;
  onClose: () => void;
}

const initialState: ActionState = {
  success: false,
  message: '',
};

const defaultValues = (area?: Area | null) => ({
  id_area: area?.id_area ?? null,
  name: area?.name ?? '',
  status: area?.status ?? 'active',
});

export function AreaForm({ area, revalidatePath = DEFAULT_REVALIDATE_PATH, onClose }: AreaFormProps) {
  const mode = area?.id_area ? 'edit' : 'create';
  const [values, setValues] = useState(() => defaultValues(area));
  const [localState, setLocalState] = useState({ success: false, message: '' });
  const wasPendingRef = useRef(false);

  useEffect(() => {
    setValues(defaultValues(area));
    setLocalState({ success: false, message: '' });
  }, [area]);

  const [state, formAction, isPending] = useActionState(saveAreaAction, initialState);

  // Procesar resultado solo cuando la acción termina (transición de isPending)
  useEffect(() => {
    if (wasPendingRef.current && !isPending) {
      if (state.success) {
        setLocalState({ success: false, message: '' });
        setValues(defaultValues(null));
        onClose();
      } else if (state.message) {
        setLocalState({ success: false, message: state.message });
      }
    }
    wasPendingRef.current = isPending;
  }, [isPending, state, onClose]);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const isInvalid = !values.name.trim();

  return (
    <form action={formAction} className="space-y-4">
      {values.id_area && (
        <input type="hidden" name="id_area" value={values.id_area} />
      )}
      <input type="hidden" name="revalidatePath" value={revalidatePath} />

      {localState.message && !localState.success && (
        <div className="alert alert-error text-sm">{localState.message}</div>
      )}

      <Input
        name="name"
        label="Nombre del área"
        value={values.name}
        onChange={handleChange}
        placeholder="Matemáticas"
        required
      />

      <Select
        name="status"
        label="Estado"
        value={values.status}
        onChange={handleChange}
      >
        <option value="active">Activo</option>
        <option value="inactive">Inactivo</option>
      </Select>

      <div className="flex justify-end gap-2">
        <Button variant="destructive" type="button" onClick={onClose} disabled={isPending}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isPending || isInvalid}>
          {isPending ? 'Guardando...' : mode === 'edit' ? 'Actualizar' : 'Guardar'}
        </Button>
      </div>
    </form>
  );
}
