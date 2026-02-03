'use client';

import { ChangeEvent, useActionState, useEffect, useRef, useState } from 'react';
import { Group, Teacher } from '@/app/types';
import {
  saveGroupAction,
} from './actions';
import type { ActionState } from './constants';
import { DEFAULT_REVALIDATE_PATH } from './constants';
import { CourseLevelEnum } from '@/app/shared/course-level';
import { Button } from '@/app/components/ui/button';
import { Select } from '@/app/components/ui/select';

interface GroupFormProps {
  group?: Group | null;
  teachers: Teacher[];
  selectedYearId: number | null;
  revalidatePath?: string;
  onClose: () => void;
}

const initialState: ActionState = {
  success: false,
  message: '',
};

const SUBLEVEL_OPTIONS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

const WORKING_TIMES = [
  { value: 'M', label: 'Mañana' },
  { value: 'T', label: 'Tarde' },
  { value: 'N', label: 'Noche' },
  { value: 'S', label: 'Sabatina' },
];

const levelOptions = Object.entries(CourseLevelEnum)
  .filter(([, value]) => typeof value === 'number')
  .map(([label, value]) => ({ label, value: value as number }))
  .sort((a, b) => a.value - b.value);

const defaultValues = (group?: Group | null) => ({
  level: group?.level?.toString() ?? '',
  sublevel: group?.sublevel ?? '',
  working_time: group?.working_time ?? '',
  representative: group?.representative?.toString() ?? '',
});

export function GroupForm({
  group,
  teachers,
  selectedYearId,
  revalidatePath = DEFAULT_REVALIDATE_PATH,
  onClose,
}: GroupFormProps) {
  const isEditing = Boolean(group && group.id_group);
  const resolvedYearId = group?.id_year ?? selectedYearId;
  const [values, setValues] = useState(() => defaultValues(group));
  const [localState, setLocalState] = useState({ success: false, message: '' });
  const wasPendingRef = useRef(false);

  useEffect(() => {
    setValues(defaultValues(group));
    setLocalState({ success: false, message: '' });
  }, [group]);

  const [state, formAction, isPending] = useActionState(saveGroupAction, initialState);

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

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const isInvalid = !values.level || !values.sublevel || !values.working_time || !values.representative;
  const disableSubmit = (!resolvedYearId && !isEditing) || isInvalid;

  return (
    <form action={formAction} className="space-y-4">
      {isEditing && (
        <input type="hidden" name="id_group" value={group?.id_group} />
      )}
      {resolvedYearId && (
        <input type="hidden" name="id_year" value={resolvedYearId} />
      )}
      <input type="hidden" name="revalidatePath" value={revalidatePath} />

      {localState.message && !localState.success && (
        <div className="alert alert-error text-sm">{localState.message}</div>
      )}

      {!resolvedYearId && !isEditing && (
        <div className="alert alert-warning text-sm">
          Debe seleccionar un año en Programación Anual &gt; Establecer año antes de crear grupos.
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <Select
          name="level"
          label="Curso"
          value={values.level}
          onChange={handleChange}
          required
          disabled={isPending}
        >
          <option value="" disabled>
            Seleccione un curso
          </option>
          {levelOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>

        <Select
          name="sublevel"
          label="Grupo"
          value={values.sublevel}
          onChange={handleChange}
          required
          disabled={isPending}
        >
          <option value="" disabled>
            Seleccione un grupo
          </option>
          {SUBLEVEL_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>

        <Select
          name="working_time"
          label="Jornada"
          value={values.working_time}
          onChange={handleChange}
          required
          disabled={isPending}
        >
          <option value="" disabled>
            Seleccione una jornada
          </option>
          {WORKING_TIMES.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>

        <Select
          name="representative"
          label="Profesor de grupo"
          value={values.representative}
          onChange={handleChange}
          required
          disabled={isPending}
        >
          <option value="" disabled>
            Seleccione un profesor
          </option>
          {teachers.map((teacher) => (
            <option key={teacher.id_teacher} value={teacher.id_teacher}>
              {[teacher.name, teacher.last_name].filter(Boolean).join(' ')}
            </option>
          ))}
        </Select>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="destructive" type="button" onClick={onClose} disabled={isPending}>
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={isPending || disableSubmit}
        >
          {isPending ? 'Guardando...' : isEditing ? 'Actualizar' : 'Crear'}
        </Button>
      </div>
    </form>
  );
}
