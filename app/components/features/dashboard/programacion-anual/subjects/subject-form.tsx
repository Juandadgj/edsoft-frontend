'use client';

import { ChangeEvent, useActionState, useEffect, useRef, useState } from 'react';
import { Course, Area, Teacher, Group } from '@/app/types';
import {
  saveSubjectAction,
} from './actions';
import type { ActionState } from './constants';
import { DEFAULT_REVALIDATE_PATH } from './constants';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Select } from '@/app/components/ui/select';

interface SubjectFormProps {
  subject?: Course | null;
  groups: Group[];
  areas: Area[];
  teachers: Teacher[];
  selectedGroupId?: number | null;
  revalidatePath?: string;
  onClose: () => void;
}

const initialState: ActionState = {
  success: false,
  message: '',
};

const defaultValues = (subject?: Course | null, selectedGroupId?: number | null) => ({
  id_course: subject?.id_course ?? null,
  name: subject?.name ?? '',
  id_group: subject?.id_group?.toString() ?? selectedGroupId?.toString() ?? '',
  id_area: subject?.id_area?.toString() ?? '',
  id_teacher: subject?.id_teacher?.toString() ?? '',
  hour: subject?.hour?.toString() ?? '',
  percentage: subject?.percentage?.toString() ?? '',
  average: subject?.average ?? 'Si',
});

export function SubjectForm({
  subject,
  groups,
  areas,
  teachers,
  selectedGroupId,
  revalidatePath = DEFAULT_REVALIDATE_PATH,
  onClose,
}: SubjectFormProps) {
  const mode = subject ? 'edit' : 'create';
  const [values, setValues] = useState(() => defaultValues(subject, selectedGroupId));
  const [localState, setLocalState] = useState({ success: false, message: '' });
  const wasPendingRef = useRef(false);

  useEffect(() => {
    setValues(defaultValues(subject, selectedGroupId));
    setLocalState({ success: false, message: '' });
  }, [subject, selectedGroupId]);

  const [state, formAction, isPending] = useActionState(saveSubjectAction, initialState);

  // Procesar resultado solo cuando la acción termina (transición de isPending)
  useEffect(() => {
    if (wasPendingRef.current && !isPending) {
      if (state.success) {
        setLocalState({ success: false, message: '' });
        setValues(defaultValues(null, selectedGroupId));
        onClose();
      } else if (state.message) {
        setLocalState({ success: false, message: state.message });
      }
    }
    wasPendingRef.current = isPending;
  }, [isPending, state, onClose, selectedGroupId]);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const isInvalid =
    !values.name.trim() ||
    !values.id_group ||
    !values.id_area ||
    !values.id_teacher ||
    !values.hour;

  return (
    <form action={formAction} className="space-y-4">
      {values.id_course && (
        <input type="hidden" name="id_course" value={values.id_course} />
      )}
      <input type="hidden" name="revalidatePath" value={revalidatePath} />

      {localState.message && !localState.success && (
        <div className="alert alert-error text-sm">{localState.message}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          name="name"
          label="Nombre de la asignatura"
          value={values.name}
          onChange={handleChange}
          placeholder="Matemáticas"
          required
        />

        <Select
          name="id_group"
          value={values.id_group}
          onChange={handleChange}
          required
          className='hidden'
        >
          <option value="">Seleccione un grupo</option>
          {groups.map((group) => (
            <option key={group.id_group} value={group.id_group}>
              {group.level}° {group.sublevel}
            </option>
          ))}
        </Select>

        <Select
          name="id_area"
          label="Área"
          value={values.id_area}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un área</option>
          {areas.map((area) => (
            <option key={area.id_area} value={area.id_area}>
              {area.name}
            </option>
          ))}
        </Select>

        <Select
          name="id_teacher"
          label="Profesor"
          value={values.id_teacher}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un profesor</option>
          {teachers.map((teacher) => (
            <option key={teacher.id_teacher} value={teacher.id_teacher}>
              {teacher.name} {teacher.last_name}
            </option>
          ))}
        </Select>

        <Input
          type="number"
          name="hour"
          label="IHC (Intensidad horaria)"
          value={values.hour}
          onChange={handleChange}
          placeholder="4"
          min={1}
          required
        />

        <Input
          type="number"
          name="percentage"
          label="Porcentaje (%)"
          value={values.percentage}
          onChange={handleChange}
          placeholder="100"
          min={0}
          max={100}
        />

        <Select
          name="average"
          label="Promediar"
          value={values.average}
          onChange={handleChange}
        >
          <option value="Si">Sí</option>
          <option value="No">No</option>
        </Select>
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
