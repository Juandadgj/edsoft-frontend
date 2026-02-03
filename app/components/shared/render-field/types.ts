export type FieldValue =
  | string
  | boolean
  | number
  | string[]
  | undefined
  | null;

export interface FormOption {
  value: string;
  label: string;
}

export type FormFieldType =
  | "radio"
  | "checkbox"
  | "select"
  | "text" // Para inputs de texto simples
  | "number" // Para inputs numéricos simples
  | "heading"
  | "group" // <-- Nuevo tipo para agrupar otros campos
  | "checkboxGroup"
  | "date"
  | "file";


export interface FormField {
  id: string;
  label: string;
  type: FormFieldType;
  options?: FormOption[];
  defaultValue?: FieldValue;

  subFields?: FormField[]; // Para tipos 'group' o 'checkboxGroup'

  conditionalRender?: (formData: Record<string, FieldValue>) => boolean;
  className?: string;
}