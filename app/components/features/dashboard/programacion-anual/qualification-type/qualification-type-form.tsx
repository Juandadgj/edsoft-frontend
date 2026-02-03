'use client';

import { ChangeEvent, useActionState, useEffect, useRef, useState } from 'react';
import { TypeQualification } from '@/app/types';
import {
  saveQualificationTypeAction,
} from './actions';
import type { ActionState } from './constants';
import { DEFAULT_REVALIDATE_PATH } from './constants';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';

interface QualificationTypeFormProps {
  typeQualification?: TypeQualification | null;
  revalidatePath?: string;
  onClose: () => void;
}

const initialState: ActionState = {
  success: false,
  message: '',
};

const defaultValues = (typeQualification?: TypeQualification | null) => ({
  id_type_qual: typeQualification?.id_type_qual ?? null,
  name: typeQualification?.name ?? '',
  floor_score: typeQualification?.floor_score?.toString() ?? '',
  ceiling_score: typeQualification?.ceiling_score?.toString() ?? '',
  year: typeQualification?.year?.toString() ?? '',
});

export function QualificationTypeForm({ typeQualification, revalidatePath = DEFAULT_REVALIDATE_PATH, onClose }: QualificationTypeFormProps) {
  const mode = typeQualification ? 'edit' : 'create';
  const [values, setValues] = useState(() => defaultValues(typeQualification));
  const [localState, setLocalState] = useState({ success: false, message: '' });
  const wasPendingRef = useRef(false);

  useEffect(() => {
    setValues(defaultValues(typeQualification));
    setLocalState({ success: false, message: '' });
  }, [typeQualification]);

  const [state, formAction, isPending] = useActionState(saveQualificationTypeAction, initialState);

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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const parsedFloor = Number(values.floor_score);
  const parsedCeiling = Number(values.ceiling_score);
  const parsedYear = values.year ? Number(values.year) : null;

  const isInvalid =
    !values.name.trim() ||
    values.floor_score.trim() === '' ||
    values.ceiling_score.trim() === '' ||
    Number.isNaN(parsedFloor) ||
    Number.isNaN(parsedCeiling);

  return (
    <form action={formAction} className="space-y-4">
      {values.id_type_qual && (
        <input type="hidden" name="id_type_qual" value={values.id_type_qual} />
      )}
      <input type="hidden" name="revalidatePath" value={revalidatePath} />

      {localState.message && !localState.success && (
        <div className="alert alert-error text-sm">{localState.message}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          name="name"
          label="Nombre del tipo de nota"
          value={values.name}
          onChange={handleChange}
          placeholder="Desempeño"
        />

        <Input
          type="number"
          name="floor_score"
          label="Piso"
          value={values.floor_score}
          onChange={handleChange}
          placeholder="0"
        />

        <Input
          type="number"
          name="ceiling_score"
          label="Techo"
          value={values.ceiling_score}
          onChange={handleChange}
          placeholder="5"
        />

        <Input
          type="number"
          name="year"
          label="Año"
          value={values.year}
          onChange={handleChange}
          placeholder="2026"
        />
      </div>

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
