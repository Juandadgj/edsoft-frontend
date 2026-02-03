'use client';

import { ChangeEvent, useActionState, useEffect, useRef, useState } from 'react';
import { Teacher } from '@/app/types';
import { saveTeacherAction, ActionState } from './actions';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';

interface TeacherFormProps {
  teacher?: Teacher | null;
  onClose: () => void;
  onSuccess?: () => void;
}

const initialState: ActionState = {
  success: false,
  message: '',
};

const defaultValues = (teacher?: Teacher | null) => ({
  id_teacher: teacher?.id_teacher ?? 0,
  name: teacher?.name ?? '',
  last_name: teacher?.last_name ?? '',
  identification: teacher?.identification ?? '',
  phone: teacher?.phone ?? '',
  email: teacher?.email ?? '',
  degree: teacher?.degree ?? '',
  direction: teacher?.direction ?? '',
  type_id: teacher?.type_id ?? 1,
});

export function TeacherForm({ teacher, onClose, onSuccess }: TeacherFormProps) {
  const mode = teacher?.id_teacher ? 'edit' : 'create';
  const [values, setValues] = useState(() => defaultValues(teacher));
  const [localState, setLocalState] = useState({ success: false, message: '' });
  const wasPendingRef = useRef(false);

  useEffect(() => {
    setValues(defaultValues(teacher));
    setLocalState({ success: false, message: '' });
  }, [teacher]);

  const [state, formAction, isPending] = useActionState(saveTeacherAction, initialState);

  // Procesar resultado solo cuando la acción termina (transición de isPending)
  useEffect(() => {
    if (wasPendingRef.current && !isPending) {
      if (state.success) {
        setLocalState({ success: false, message: '' });
        setValues(defaultValues(null));
        onSuccess?.();
        onClose();
      } else if (state.message) {
        setLocalState({ success: false, message: state.message });
      }
    }
    wasPendingRef.current = isPending;
  }, [isPending, state, onClose, onSuccess]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const isInvalid = !values.name.trim() || !values.last_name.trim() || !values.identification.trim();

  return (
    <form action={formAction} className="space-y-4">
      {values.id_teacher > 0 && (
        <input type="hidden" name="id_teacher" value={values.id_teacher} />
      )}
      <input type="hidden" name="type_id" value={values.type_id} />

      {localState.message && !localState.success && (
        <div className="alert alert-error text-sm">{localState.message}</div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <Input
          name="name"
          label="Nombre"
          placeholder="Nombre"
          value={values.name}
          onChange={handleChange}
        />
        <Input
          name="last_name"
          label="Apellido"
          placeholder="Apellido"
          value={values.last_name}
          onChange={handleChange}
        />
        <Input
          name="identification"
          label="Identificación"
          placeholder="Identificación"
          value={values.identification}
          onChange={handleChange}
        />
        <Input
          name="phone"
          label="Teléfono"
          placeholder="Teléfono"
          value={values.phone}
          onChange={handleChange}
        />
        <Input
          name="email"
          label="Email"
          placeholder="Email"
          type="email"
          value={values.email}
          onChange={handleChange}
        />
        <Input
          name="degree"
          label="Grado/Título"
          placeholder="Grado/Título"
          value={values.degree}
          onChange={handleChange}
        />
        <Input
          name="direction"
          label="Dirección"
          placeholder="Dirección"
          value={values.direction}
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button variant="destructive" type="button" onClick={onClose} disabled={isPending}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isPending || isInvalid}>
          {isPending ? 'Guardando...' : mode === 'edit' ? 'Actualizar' : 'Crear'}
        </Button>
      </div>
    </form>
  );
}
