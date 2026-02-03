"use client";

import React, { useCallback, useState } from "react";
import { Button } from "@/app/components/ui/button";
import type { ConfigField, ConfigValue } from "@/app/types";
import { RenderField } from "@/app/components/shared/render-field/render-field";
import {
  FieldValue,
  FormField,
} from "@/app/components/shared/render-field/types";

interface ConfigurationProps {
  fields: FormField[];
  onSubmit?: () => void;
  initialData?: any;
  formData: Record<string, FieldValue>;
  onChange: (id: string, value: FieldValue) => void;
  loading?: boolean;
}

export function Configuration({
  fields,
  onSubmit,
  initialData = {},
  formData,
  onChange,
  loading,
}: ConfigurationProps) {
  
  return (
    <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-2">
      {fields.map((field) => (
        <RenderField
          key={field.id}
          field={field}
          formData={formData}
          handleChange={onChange}
          label={field.label}
        />
      ))}
      <div className="flex justify-center items-center col-span-1 md:col-span-2">
        <Button type="button" onClick={onSubmit} disabled={loading}>
          Generar certificado
        </Button>
      </div>
    </div>
  );
}

export default Configuration;
