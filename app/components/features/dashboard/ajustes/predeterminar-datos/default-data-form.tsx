'use client';

import { useState, useActionState } from 'react';
import { Checkbox } from 'antd';
import { Check, X } from 'lucide-react';
import { ContainerComponents } from '@/app/components/shared/container';
import { Button } from '@/app/components/ui/button';
import { 
  ALL_SETTINGS_SECTIONS, 
  type SettingsSection, 
  type SettingItem 
} from './constants';
import { saveAllSettingsAction } from './actions';

interface DefaultDataFormProps {
  initialSections?: SettingsSection[];
  revalidatePath?: string;
}

const initialState = { success: false, message: '' };

export function DefaultDataForm({ 
  initialSections = ALL_SETTINGS_SECTIONS,
  revalidatePath = '/dashboard/ajustes/predeterminar-datos',
}: DefaultDataFormProps) {
  const [sections, setSections] = useState<SettingsSection[]>(initialSections);
  const [hasChanges, setHasChanges] = useState(false);
  const [state, formAction, isPending] = useActionState(saveAllSettingsAction, initialState);

  const handleItemChange = (sectionId: string, itemId: string, checked: boolean) => {
    setSections(prevSections =>
      prevSections.map(section => {
        if (section.id !== sectionId) return section;
        return {
          ...section,
          items: section.items.map(item =>
            item.id === itemId ? { ...item, checked } : item
          ),
        };
      })
    );
    setHasChanges(true);
  };

  const handleReset = () => {
    setSections(initialSections);
    setHasChanges(false);
  };

  return (
    <ContainerComponents>
      <div className="w-full flex items-center justify-between my-3">
        <h3>
          <strong className="text-xl text-foreground ps-8">
            Predeterminar datos
          </strong>
        </h3>
      </div>

      <form action={formAction}>
        <input type="hidden" name="revalidatePath" value={revalidatePath} />
        <input type="hidden" name="sections" value={JSON.stringify(sections)} />

        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.id} className="space-y-4">
              <h4 className="font-semibold text-lg text-foreground border-b border-muted-foreground pb-2">
                {section.title}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {section.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <Checkbox
                      checked={item.checked}
                      onChange={(e) => handleItemChange(section.id, item.id, e.target.checked)}
                      disabled={isPending}
                    />
                    <span className="text-sm text-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end pt-6 border-t border-muted-foreground mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            disabled={!hasChanges || isPending}
          >
            <X className="h-4 w-4 mr-2" />
            Restablecer
          </Button>
          <Button
            type="submit"
            disabled={!hasChanges || isPending}
            className="bg-main-blue hover:bg-main-blue/90 text-white"
          >
            <Check className="h-4 w-4 mr-2" />
            {isPending ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </div>

        {/* Status Message */}
        {state.message && (
          <div className={`mt-4 p-3 rounded-md ${state.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {state.message}
          </div>
        )}
      </form>
    </ContainerComponents>
  );
}
