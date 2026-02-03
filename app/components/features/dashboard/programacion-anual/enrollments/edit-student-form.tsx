"use client";

import {
  ChangeEvent,
  useActionState,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { Student } from "@/app/types";
import { getStudentAction, saveStudentAction } from "./actions";
import { StudentActionState, DEFAULT_REVALIDATE_PATH } from "./constants";
import { Input } from "@/app/components/ui/input";
import { Select } from "@/app/components/ui/select";
import { Button } from "@/app/components/ui/button";
import {
  GENDER_OPTIONS,
  STUDENT_STATUS_OPTIONS,
  isFieldItem,
  isSectionItem,
  studentFormDefaults,
  studentFormSchema,
  StudentFormField,
  StudentFormSection,
} from "./new-student-schema";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

interface EditStudentFormProps {
  studentId: number;
  revalidatePath?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const initialState: StudentActionState = {
  success: false,
  message: "",
};

type FormValues = Record<string, string>;

const buildDefaultValues = (student?: Student | null): FormValues => {
  const defaults = { ...studentFormDefaults };

  if (student) {
    const studentRecord = student as unknown as Record<string, unknown>;
    Object.keys(defaults).forEach((key) => {
      const studentValue = studentRecord[key];
      if (studentValue !== undefined && studentValue !== null) {
        defaults[key] = String(studentValue);
      }
    });
    defaults.id_student = String(student.id_student);
  } else {
    defaults.id_student = "0";
    defaults.sex = defaults.sex || GENDER_OPTIONS[0].value;
    defaults.status = defaults.status || STUDENT_STATUS_OPTIONS[0].value;
  }

  return defaults;
};

const requiredFieldNames = studentFormSchema
  .filter(isFieldItem)
  .filter((field) => field.required)
  .map((field) => field.name);

export function EditStudentForm({
  studentId,
  revalidatePath = DEFAULT_REVALIDATE_PATH,
  onSuccess,
  onCancel,
}: EditStudentFormProps) {
  const [values, setValues] = useState<FormValues>(() =>
    buildDefaultValues(null),
  );
  const [localState, setLocalState] = useState({ success: false, message: "" });
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(
    new Set(),
  );
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

  const [state, formAction, isPending] = useActionState(
    saveStudentAction,
    initialState,
  );
  const [isPendingStudent, transitionStudent] = useTransition();
  
  useEffect(() => {
    if (!studentId) {
      setValues(buildDefaultValues(null));
    } else {
      transitionStudent(async () => {
        const student = await getStudentAction({ id_student: studentId });
        setValues(buildDefaultValues(student.data));
        setLocalState({ success: false, message: "" });
      });
    }
  }, [studentId]);

  useEffect(() => {
    if (wasPendingRef.current && !isPending) {
      if (state.success) {
        setLocalState({ success: true, message: state.message });
        onSuccess?.();
      } else if (state.message) {
        setLocalState({ success: false, message: state.message });
      }
    }
    wasPendingRef.current = isPending;
  }, [isPending, state, onSuccess]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const isInvalid = requiredFieldNames.some(
    (fieldName) => !values[fieldName]?.trim(),
  );

  const renderField = (field: StudentFormField) => {
    if (field.fieldType === "select") {
      const options = field.options ?? [];
      return (
        <Select
          key={field.name}
          name={field.name}
          label={field.label}
          value={values[field.name] ?? ""}
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

    const inputType =
      field.fieldType === "number"
        ? "number"
        : field.fieldType === "tel"
          ? "tel"
          : field.fieldType === "email"
            ? "email"
            : field.fieldType === "date"
              ? "date"
              : "text";

    return (
      <Input
        key={field.name}
        name={field.name}
        label={field.label}
        placeholder={field.placeholder}
        value={values[field.name] ?? ""}
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
            section.collapsible
              ? "cursor-pointer hover:bg-base-200/50 rounded-t px-2 -mx-2"
              : ""
          }`}
          onClick={() => section.collapsible && toggleSection(section.title)}
        >
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {section.title}
            </h3>
            {section.description && (
              <p className="text-sm text-foreground/70 mt-1">
                {section.description}
              </p>
            )}
          </div>
          {section.collapsible && (
            <button
              type="button"
              className="p-1 hover:bg-base-300 rounded"
              aria-label={isCollapsed ? "Expandir sección" : "Colapsar sección"}
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

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="id_student" value={values.id_student} />
      <input type="hidden" name="revalidatePath" value={revalidatePath} />
      {/* Hidden inputs for all form values */}
      {Object.entries(values).map(([key, value]) => (
        <input key={key} type="hidden" name={key} value={value} />
      ))}

      <div className="space-y-6">
        {localState.message && (
          <div
            className={`alert text-sm ${
              localState.success ? "alert-success" : "alert-error"
            }`}
          >
            {localState.message}
          </div>
        )}

        {/* {studentError && (
          <div className="alert alert-error text-sm">
            {(studentError as Error).message}
          </div>
        )} */}

        {isPendingStudent && (
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

                if (
                  currentSection?.collapsible &&
                  collapsedSections.has(currentSection.title)
                ) {
                  return null;
                }

                return (
                  <div key={item.name} className={item.colSpanClass ?? ""}>
                    {renderField(item)}
                  </div>
                );
              });
            })()}
          </div>

          <div className="flex justify-end gap-2 mt-6">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isPending}
              >
                Cancelar
              </Button>
            )}
            <Button
              type="submit"
              disabled={isPending || isPendingStudent || isInvalid}
            >
              {isPending ? "Actualizando..." : "Actualizar estudiante"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
