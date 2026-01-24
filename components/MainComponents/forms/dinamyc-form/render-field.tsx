import { Checkbox } from "@/components/ui/checkbox";
import { Radio } from "@/components/ui/radio";
import { Select } from "@/components/ui/select";
import { FieldValue, FormField, FormOption } from "./types/types";
import { Input } from "@/components/Input";

interface RenderFieldProps {
  field: FormField;
  formData: Record<string, FieldValue>;
  handleChange: (id: string, value: FieldValue) => void;
  label?: string;
}

export const RenderField: React.FC<RenderFieldProps> = ({
  field,
  formData,
  handleChange,
}) => {
  if (field.conditionalRender && !field.conditionalRender(formData)) {
    return null;
  }
  if (field.type === "heading") {
    return (
      <h3 key={field.id} className="text-black text-lg font-semibold mt-6 mb-2 col-span-1 md:col-span-2 lg:col-span-3">
        {field.label}
      </h3>
    );
  }
  if (field.type === "group" && field.subFields) {
    return (
      <div
        key={field.id}
        className="space-y-4 p-2 border rounded-lg bg-gray-50"
      >
        {field.label && (
          <label className="block text-black text-sm">{field.label}</label>
        )}
        <div className="">
          {field.subFields.map((subField) => (
            <RenderField
              key={subField.id}
              field={subField}
              formData={formData}
              handleChange={handleChange}
              label={subField.label}
            />
          ))}
        </div>
      </div>
    );
  }
  if (field.type === "radio" && field.options) {
    return (
      <div
        key={field.id}
        className="space-y-4 p-2 border rounded-lg bg-gray-50"
      >
        {field.label && (
          <label className="block text-black text-sm">{field.label}</label>
        )}
        <div
          role="radiogroup"
          aria-labelledby={`${field.id}-label`}
          className="space-y-2"
        >
          <span id={`${field.id}-label`} className="sr-only">
            {field.label}
          </span>
          {field.options.map((option: FormOption, index: number) => (
            <Radio
              key={index}
              name={field.id}
              label={option.label}
              value={option.value}
              onChange={(e) => handleChange(field.id, e.target.value)}
            />
          ))}
        </div>
      </div>
    );
  }
  if (field.type === "select" && field.options) {
    return (
      <div
        key={field.id}
        className=" border rounded-lg bg-gray-50 p-2"
      >
        <Select
          id={field.id}
          value={formData[field.id] as string}
          onChange={(e) => handleChange(field.id, e.target.value)}
          className="w-full"
          label={field.label}
        >
          {field.options.map((option: FormOption) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>
    );
  }
  // --- Renderizar CHECKBOX GROUPS (se mantiene) ---
  if (field.type === "checkboxGroup" && field.subFields) {
    return (
      <div key={field.id} className="space-y-4 border rounded-lg bg-gray-50">
        <div className="space-y-2 pl-4">
          {field.subFields.map((subField: FormField) => (
            <div key={subField.id} className="flex items-center">
              <Checkbox
                id={subField.id}
                checked={formData[subField.id] as boolean}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(subField.id, e.target.checked)
                }
                label={subField.label}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (field.type === "checkbox") {
    return (
      <div
        key={field.id}
        className="flex items-center p-2  border rounded-lg bg-gray-50"
      >
        <Checkbox
          id={field.id}
          checked={formData[field.id] as boolean}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(field.id, e.target.checked)
          }
          label={field.label}
        />
      </div>
    );
  }
  if (field.type === "text") {
    return (
      <div
        key={field.id}
        className="flex items-center p-2  border rounded-lg bg-gray-50 w-full"
      >
        <Input
          id={field.id}
          value={formData[field.id] as string}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(field.id, e.target.value)
          }
          label={field.label}
        />
      </div>
    );
  }
  if (field.type === "date") {
    return (
      <div
        key={field.id}
        className="flex items-center p-2  border rounded-lg bg-gray-50"
      >
        <Input type="date" name="" id="" />
      </div>
    );
  }
  if (field.type === "file") {
    return (
      <div
        key={field.id}
        className="flex items-center p-2  border rounded-lg bg-gray-50"
      >
        <Input type="file" name="" id="" />
      </div>
    );
  }
  return (
    <div key={field.id}>
      <p className="text-red-500">Tipo de campo no soportado: {field.type}</p>
    </div>
  );
};
