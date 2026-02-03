export type FieldPrimitive = string | number | boolean;

export interface ConfigOption {
  value: string | number;
  label: string;
}

export interface ConfigField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'checkbox' | 'radio';
  options?: ConfigOption[];
  defaultValue?: FieldPrimitive;
  placeholder?: string;
}

export type ConfigValue = Record<string, FieldPrimitive | undefined>;

export type ConfigSchema = ConfigField[];
