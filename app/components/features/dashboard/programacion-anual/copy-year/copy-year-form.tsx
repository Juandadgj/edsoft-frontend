'use client';

import { useActionState, useState } from 'react';
import { ContainerComponents } from '@/app/components/shared/container';
import {
  copyYearAction,
} from './actions';
import type { ActionState } from './constants';
import { DEFAULT_REVALIDATE_PATH } from './constants';

interface CopyYearFormProps {
  revalidatePath?: string;
}

const initialState: ActionState = {
  success: false,
  message: '',
};

export function CopyYearForm({ revalidatePath = DEFAULT_REVALIDATE_PATH }: CopyYearFormProps) {
  const [options, setOptions] = useState({
    copySubjects: true,
    copyRecommendations: true,
    copyAchievements: true,
    copyIndicators: true,
  });

  const action = copyYearAction;
  const [state, formAction, isPending] = useActionState(action, initialState);

  const handleCheckboxChange = (key: keyof typeof options) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const hasSelection = Object.values(options).some((v) => v);

  return (
    <ContainerComponents>
      <div className="w-full flex items-center justify-between my-3">
        <div>
          <strong className="text-xl text-foreground ps-1">Copiar Año Anterior</strong>
          <p className="text-sm text-foreground/70">
            Copie la configuración del año académico anterior al año actual.
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <form action={formAction} className="w-full max-w-md space-y-4">
          <input type="hidden" name="revalidatePath" value={revalidatePath} />
          {state.message && (
            <div className={`alert ${state.success ? 'alert-success' : 'alert-error'} text-sm`}>
              {state.message}
            </div>
          )}

          <div className="bg-base-100 rounded-2xl p-6 space-y-4">
            <div className="form-control">
              <label className="label cursor-pointer justify-between">
                <span className="label-text text-foreground">Asignaturas</span>
                <input
                  type="checkbox"
                  name="copySubjects"
                  className="checkbox checkbox-primary"
                  checked={options.copySubjects}
                  onChange={() => handleCheckboxChange('copySubjects')}
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer justify-between">
                <span className="label-text text-foreground">Recomendaciones</span>
                <input
                  type="checkbox"
                  name="copyRecommendations"
                  className="checkbox checkbox-primary"
                  checked={options.copyRecommendations}
                  onChange={() => handleCheckboxChange('copyRecommendations')}
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer justify-between">
                <span className="label-text text-foreground">Logros</span>
                <input
                  type="checkbox"
                  name="copyAchievements"
                  className="checkbox checkbox-primary"
                  checked={options.copyAchievements}
                  onChange={() => handleCheckboxChange('copyAchievements')}
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer justify-between">
                <span className="label-text text-foreground">Indicadores de Logros</span>
                <input
                  type="checkbox"
                  name="copyIndicators"
                  className="checkbox checkbox-primary"
                  checked={options.copyIndicators}
                  onChange={() => handleCheckboxChange('copyIndicators')}
                />
              </label>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="btn btn-primary px-8"
              disabled={isPending || !hasSelection}
            >
              {isPending ? 'Copiando...' : 'Generar copia'}
            </button>
          </div>
        </form>
      </div>
    </ContainerComponents>
  );
}
