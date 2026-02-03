'use client';

import { useActionState, useEffect, useMemo, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { ScholarYear } from '@/app/types';
import {
  saveScholarYearAction,
} from './actions';
import type { ActionState } from './constants';
import { DEFAULT_REVALIDATE_PATH } from './constants';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';

interface SetYearFormProps {
  year?: ScholarYear | null;
  existingYears: number[];
  revalidatePath?: string;
  onClose: () => void;
}

const initialState: ActionState = {
  success: false,
  message: '',
};

const getDefaultValues = (year?: ScholarYear | null) => ({
  id_year: year?.id_year ? String(year.id_year) : '',
  rector: year?.rector ?? '',
  secretary: year?.secretary ?? '',
  comment: year?.comment ?? '',
});

export function SetYearForm({ year, existingYears, revalidatePath = DEFAULT_REVALIDATE_PATH, onClose }: SetYearFormProps) {
  const [values, setValues] = useState(() => getDefaultValues(year));
  const [localState, setLocalState] = useState({ success: false, message: '' });
  const wasPendingRef = useRef(false);
  const mode = year ? 'edit' : 'create';

  useEffect(() => {
    setValues(getDefaultValues(year));
    setLocalState({ success: false, message: '' });
  }, [year]);

  const [state, formAction, isPending] = useActionState(saveScholarYearAction, initialState);

  // Procesar resultado solo cuando la acción termina (transición de isPending)
  useEffect(() => {
    if (wasPendingRef.current && !isPending) {
      if (state.success) {
        setLocalState({ success: false, message: '' });
        setValues(getDefaultValues(null));
        onClose();
      } else if (state.message) {
        setLocalState({ success: false, message: state.message });
      }
    }
    wasPendingRef.current = isPending;
  }, [isPending, state, onClose]);

  const existingIds = useMemo(
    () => (mode === 'edit' ? existingYears.filter((id) => id !== year?.id_year) : existingYears),
    [existingYears, mode, year?.id_year]
  );

  const yearNumber = Number(values.id_year);
  const duplicateYear =
    mode === 'create' &&
    values.id_year.trim().length > 0 &&
    Number.isFinite(yearNumber) &&
    existingIds.includes(yearNumber);

  const isInvalidForm =
    !values.id_year ||
    !values.rector.trim() ||
    !values.secretary.trim() ||
    duplicateYear;

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="revalidatePath" value={revalidatePath} />
      <input type="hidden" name="mode" value={mode} />
      {localState.message && !localState.success && (
        <div className="alert alert-error text-sm">{localState.message}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="number"
          name="id_year"
          label="Año escolar"
          value={values.id_year}
          onChange={handleChange}
          placeholder="2026"
        />

        <Input
          type="text"
          name="rector"
          label="Rector(a)"
          value={values.rector}
          onChange={handleChange}
          placeholder="Nombre completo"
        />

        <Input
          type="text"
          name="secretary"
          label="Secretario(a)"
          value={values.secretary}
          onChange={handleChange}
          placeholder="Nombre completo"
        />

        <label className="flex flex-col gap-2 text-sm md:col-span-2">
          <span className="label-text text-xs text-foreground/70">Comentarios</span>
          <textarea
            name="comment"
            value={values.comment}
            onChange={handleChange}
            placeholder="Notas o comentarios adicionales"
            className="textarea textarea-bordered min-h-20 text-foreground resize-none w-full border border-gray-300"
          />
        </label>
      </div>

      {duplicateYear && (
        <p className="text-xs text-error">
          Ya existe un año académico con ese número. Ingrese un valor diferente.
        </p>
      )}

      <div className="flex justify-end gap-2">
        <Button variant="destructive" type="button" onClick={onClose} disabled={isPending}>
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={isPending || isInvalidForm}
        >
          {isPending ? 'Guardando...' : mode === 'edit' ? 'Actualizar' : 'Guardar'}
        </Button>
      </div>
    </form>
  );
}
