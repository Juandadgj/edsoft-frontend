'use client';

import {
  ChangeEvent,
  startTransition,
  useActionState,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react';
import { Group, Student } from '@/app/types';
import {
  createStudentWithEnrollmentAction,
  getStudentAction,
  saveStudentAction,
} from './actions';
import { StudentActionState, DEFAULT_REVALIDATE_PATH } from './constants';
import { Input } from '@/app/components/ui/input';
import { Select } from '@/app/components/ui/select';
import { Button } from '@/app/components/ui/button';
import Table from '@/app/components/ui/table';
import { getCourseLevel } from '@/app/shared/course-level';
import Modal from '@/app/components/ui/modal';
import {
  GENDER_OPTIONS,
  STUDENT_STATUS_OPTIONS,
  isFieldItem,
  isSectionItem,
  studentFormDefaults,
  studentFormSchema,
  StudentFormField,
  StudentFormSection,
} from './new-student-schema';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

interface NewStudentFormProps {
  groups: Group[];
  selectedYear: number | null;
  revalidatePath?: string;
  onSuccess?: () => void;
  studentId?: number | null;
}

const initialState: StudentActionState = {
  success: false,
  message: '',
};

type FormValues = Record<string, string>;

const buildDefaultValues = (student?: Student | null): FormValues => {
  const defaults = { ...studentFormDefaults };
  
  if (student) {
    // Mapear todos los campos del estudiante
    const studentRecord = student as unknown as Record<string, unknown>;
    Object.keys(defaults).forEach((key) => {
      const studentValue = studentRecord[key];
      if (studentValue !== undefined && studentValue !== null) {
        defaults[key] = String(studentValue);
      }
    });
    defaults.id_student = String(student.id_student);
  } else {
    defaults.id_student = '0';
    defaults.sex = defaults.sex || GENDER_OPTIONS[0].value;
    defaults.status = defaults.status || STUDENT_STATUS_OPTIONS[0].value;
  }
  
  return defaults;
};

const requiredFieldNames = studentFormSchema
  .filter(isFieldItem)
  .filter((field) => field.required)
  .map((field) => field.name);

export function NewStudentForm({
  groups,
  selectedYear,
  revalidatePath = DEFAULT_REVALIDATE_PATH,
  onSuccess,
  studentId,
}: NewStudentFormProps) {
  const [values, setValues] = useState<FormValues>(() => buildDefaultValues(null));
  const [localState, setLocalState] = useState({ success: false, message: '' });
  const [showGroupSelection, setShowGroupSelection] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());
  const wasPendingRef = useRef(false);

  const toggleSection = (sectionTitle: string) => {
    setCollapsedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionTitle)) {
        next.delete(sectionTitle);
      } else {
        next.add(sectionTitle);
      }
      return next;
    });
  };

  const isEditMode = Boolean(studentId);
  const actionHandler = isEditMode ? saveStudentAction : createStudentWithEnrollmentAction;

  const [state, formAction, isPending] = useActionState(actionHandler, initialState);
  const [isPendingStudent, transitionStudent] = useTransition();


  useEffect(() => {
    if (!studentId) {
      setValues(buildDefaultValues(null));
    } else {
      transitionStudent(async ()=> {
        const student =  await getStudentAction({ id_student: studentId });
        setValues(buildDefaultValues(student.data));
        setLocalState({ success: false, message: '' });
      })
    }
  }, [studentId]);

  useEffect(() => {
    if (wasPendingRef.current && !isPending) {
      if (state.success) {
        setLocalState({ success: true, message: state.message });
        if (isEditMode) {
          onSuccess?.();
        } else {
          setValues(buildDefaultValues(null));
          setSelectedGroup(null);
          setShowGroupSelection(false);
          setShowConfirmModal(false);
          onSuccess?.();
        }
      } else if (state.message) {
        setLocalState({ success: false, message: state.message });
        if (!isEditMode) {
          setShowConfirmModal(false);
        }
      }
    }
    wasPendingRef.current = isPending;
  }, [isPending, state, isEditMode, onSuccess]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleValidateAndSelectGroup = () => {
    const hasMissingFields = requiredFieldNames.some((fieldName) => !values[fieldName]?.trim());
    if (hasMissingFields) {
      setLocalState({
        success: false,
        message: 'Complete los campos obligatorios antes de continuar.',
      });
      return;
    }
    setLocalState({ success: false, message: '' });
    setShowGroupSelection(true);
  };

  const handleSelectGroup = (group: Group) => {
    setSelectedGroup(group);
    setShowConfirmModal(true);
  };

  const handleBackToForm = () => {
    setShowGroupSelection(false);
    setSelectedGroup(null);
  };

  const groupsColumns = useMemo(
    () => [
      {
        title: 'Curso',
        key: 'name',
        render: (_: unknown, record: Group) =>
          getCourseLevel(record.level, record.sublevel),
      },
      {
        title: 'Profesor del Grupo',
        key: 'representative',
        render: (_: unknown, record: Group) => record.representative || '-',
      },
      {
        title: 'Jornada',
        dataIndex: 'working_time',
        key: 'working_time',
      },
      {
        title: 'Matricular',
        key: 'enroll',
        render: (_: unknown, record: Group) => (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleSelectGroup(record)}
          >
            Seleccionar
          </Button>
        ),
      },
    ],
    [],
  );

  const isInvalid = requiredFieldNames.some((fieldName) => !values[fieldName]?.trim());

  const renderField = (field: StudentFormField) => {
    if (field.fieldType === 'select') {
      const options = field.options ?? [];
      return (
        <Select
          key={field.name}
          name={field.name}
          label={field.label}
          value={values[field.name] ?? ''}
          onChange={handleChange}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      );
    }

    const inputType = field.fieldType === `number` 
      ? 'number' 
      : field.fieldType === 'tel' 
        ? 'tel' 
        : field.fieldType === 'email' 
          ? 'email' 
          : field.fieldType === 'date' 
            ? 'date' 
            : 'text';

    return (
      <Input
        key={field.name}
        name={field.name}
        label={field.label}
        placeholder={field.placeholder}
        value={values[field.name] ?? ''}
        type={inputType}
        onChange={handleChange}
      />
    );
  };

  const renderSection = (section: StudentFormSection, index: number) => {
    const isCollapsed = collapsedSections.has(section.title);
    
    return (
      <div
        key={`section-${index}`}
        className="col-span-1 md:col-span-2 lg:col-span-3 w-full"
      >
        <div
          className={`flex items-center justify-between border-b pb-2 mt-6 first:mt-0 ${
            section.collapsible ? 'cursor-pointer hover:bg-base-200/50 rounded-t px-2 -mx-2' : ''
          }`}
          onClick={() => section.collapsible && toggleSection(section.title)}
        >
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {section.title}
            </h3>
            {section.description && (
              <p className="text-sm text-foreground/70 mt-1">{section.description}</p>
            )}
          </div>
          {section.collapsible && (
            <button
              type="button"
              className="p-1 hover:bg-base-300 rounded"
              aria-label={isCollapsed ? 'Expandir sección' : 'Colapsar sección'}
            >
              {isCollapsed ? (
                <ChevronDownIcon className="h-5 w-5" />
              ) : (
                <ChevronUpIcon className="h-5 w-5" />
              )}
            </button>
          )}
        </div>
      </div>
    );
  };

  if (showGroupSelection && !isEditMode) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">
            Seleccione el grupo para matricular al estudiante
          </h3>
          <Button variant="outline" onClick={handleBackToForm}>
            ← Volver al formulario
          </Button>
        </div>

        <div className="bg-base-100 p-4 rounded-lg border">
          <p className="text-sm text-foreground/70 mb-2">
            Estudiante: <strong>{values.name} {values.last_name}</strong>
          </p>
          <p className="text-sm text-foreground/70">
            Identificación: <strong>{values.identification}</strong>
          </p>
        </div>

        {groups.length > 0 ? (
          <Table columns={groupsColumns} data={groups} rowKey="id_group" />
        ) : (
          <div className="text-center py-10 text-sm text-foreground/70">
            No hay grupos disponibles para el año seleccionado.
          </div>
        )}

        <Modal
          open={showConfirmModal}
          close={() => setShowConfirmModal(false)}
          title="Confirmar Matrícula"
        >
          <form action={formAction} className="space-y-4">
            {Object.entries(values).map(([key, value]) => (
              <input key={key} type="hidden" name={key} value={value} />
            ))}
            <input type="hidden" name="id_group" value={selectedGroup?.id_group ?? ''} />
            <input type="hidden" name="year" value={selectedYear ?? new Date().getFullYear()} />
            <input type="hidden" name="revalidatePath" value={revalidatePath} />

            {localState.message && !localState.success && (
              <div className="alert alert-error text-sm">{localState.message}</div>
            )}

            <div className="text-center">
              <p className="mb-4">
                ¿Está seguro de matricular al estudiante{' '}
                <strong>{values.name} {values.last_name}</strong> en el curso{' '}
                <strong>
                  {getCourseLevel(selectedGroup?.level, selectedGroup?.sublevel)}
                </strong>
                ?
              </p>
            </div>

            <div className="flex justify-center gap-2">
              <Button
                type="button"
                variant="destructive"
                onClick={() => setShowConfirmModal(false)}
                disabled={isPending}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Matriculando...' : 'Matricular'}
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }

  const formContent = (
    <div className="space-y-6">
      {localState.message && (
        <div
          className={`alert text-sm ${
            localState.success ? 'alert-success' : 'alert-error'
          }`}
        >
          {localState.message}
        </div>
      )}

   
      {isEditMode && isPendingStudent && (
        <div className="alert alert-info text-sm">
          Cargando información del estudiante...
        </div>
      )}

      <div className="bg-base-100 p-6 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(() => {
            let currentSection: StudentFormSection | null = null;
            
            return studentFormSchema.map((item, index) => {
              if (isSectionItem(item)) {
                currentSection = item;
                return renderSection(item, index);
              }

              // Si la sección actual está colapsada, no mostrar los campos
              if (currentSection?.collapsible && collapsedSections.has(currentSection.title)) {
                return null;
              }

              return (
                <div key={item.name} className={item.colSpanClass ?? ''}>
                  {renderField(item)}
                </div>
              );
            });
          })()}
        </div>

        <div className="flex justify-end mt-6">
          {isEditMode ? (
            <Button type="submit" disabled={isPending || isPendingStudent || isInvalid}>
              {isPending ? 'Actualizando...' : 'Actualizar estudiante'}
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleValidateAndSelectGroup}
              disabled={isInvalid || isPendingStudent}
            >
              Continuar - Seleccionar Grupo
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  if (isEditMode) {
    return (
      <form action={formAction} className="space-y-6">
        <input type="hidden" name="id_student" value={values.id_student} />
        <input type="hidden" name="revalidatePath" value={revalidatePath} />
        {/* Hidden inputs for all form values */}
        {Object.entries(values).map(([key, value]) => (
          <input key={key} type="hidden" name={key} value={value} />
        ))}
        {formContent}
      </form>
    );
  }

  return formContent;
}
