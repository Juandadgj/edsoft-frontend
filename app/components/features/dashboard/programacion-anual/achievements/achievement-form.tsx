"use client";

import {
  ChangeEvent,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { Achievement } from "@/app/types";
import { saveAchievementAction } from "./actions";
import type { ActionState } from "./constants";
import { DEFAULT_REVALIDATE_PATH } from "./constants";
import { Button } from "@/app/components/ui/button";

interface AchievementFormProps {
  achievement?: Achievement | null;
  courseId?: number | null;
  period?: number | null;
  revalidatePath?: string;
  onClose: () => void;
}

const initialState: ActionState = {
  success: false,
  message: "",
};

const initialLocalState = {
  success: false,
  message: "",
};

const defaultValues = (
  achievement?: Achievement | null,
  courseId?: number | null,
  period?: number | null,
) => ({
  id_achievement: achievement?.id_achievement ?? null,
  description: achievement?.description ?? "",
  id_course: achievement?.id_course?.toString() ?? courseId?.toString() ?? "",
  period: achievement?.period?.toString() ?? period?.toString() ?? "",
});

export function AchievementForm({
  achievement,
  courseId,
  period,
  revalidatePath = DEFAULT_REVALIDATE_PATH,
  onClose,
}: AchievementFormProps) {
  const mode = achievement?.id_achievement ? "edit" : "create";
  const [values, setValues] = useState(() =>
    defaultValues(achievement, courseId, period),
  );
  const [localState, setLocalState] = useState(initialLocalState);
  const wasPendingRef = useRef(false);

  useEffect(() => {
    setValues(defaultValues(achievement, courseId, period));
    setLocalState(initialLocalState);
  }, [achievement, courseId, period]);

  const [state, formAction, isPending] = useActionState(saveAchievementAction, initialState);

  useEffect(() => {
    if (wasPendingRef.current && !isPending) {
      if (state.success) {
        setLocalState(initialLocalState);
        setValues(defaultValues(null, courseId, period));
        onClose();
      } else if (state.message) {
        setLocalState({ success: false, message: state.message });
      }
    }
    wasPendingRef.current = isPending;
  }, [isPending, state, courseId, period, onClose]);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };
  const closeModal = () => {
    onClose();
    setLocalState(initialLocalState);
  };
  const isInvalid =
    !values.description.trim() || !values.id_course || !values.period;
  return (
    <form
      action={(formData) => {
        formAction(formData);
      }}
      className="space-y-4"
    >
      {values.id_achievement && (
        <input
          type="hidden"
          name="id_achievement"
          value={values.id_achievement}
        />
      )}
      <input type="hidden" name="id_course" value={values.id_course} />
      <input type="hidden" name="period" value={values.period} />
      <input type="hidden" name="revalidatePath" value={revalidatePath} />

      {localState.message && !localState.success && (
        <div className="alert alert-error text-sm">{localState.message}</div>
      )}

      <label className="form-control text-sm flex flex-col gap-2">
        <span className="label-text text-xs text-foreground/70">
          Descripción del logro
        </span>
        <textarea
          name="description"
          value={values.description}
          onChange={handleChange}
          className="textarea textarea-bordered min-h-25 text-foreground w-full resize-none"
          placeholder="Describe el logro esperado..."
          required
        />
      </label>

      <div className="flex justify-end gap-2">
        <Button
          variant="destructive"
          type="button"
          onClick={closeModal}
          disabled={isPending}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isPending || isInvalid}>
          {isPending
            ? "Guardando..."
            : mode === "edit"
              ? "Actualizar"
              : "Guardar"}
        </Button>
      </div>
    </form>
  );
}
