"use client";

import { CalculatorField } from "@/calculators/types";

interface CalculatorSelectProps {
  field: CalculatorField;
  value: string;
  onChange: (value: string) => void;
}

export default function CalculatorSelect({ field, value, onChange }: CalculatorSelectProps) {
  const inputId = `field-${field.id}`;

  return (
    <div>
      <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-foreground">
        {field.label}
      </label>
      <select
        id={inputId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="focus-ring w-full rounded-lg border border-border-strong bg-surface px-3.5 py-2.5 text-base text-foreground"
      >
        {field.options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {field.helpText && <p className="mt-1 text-xs text-muted">{field.helpText}</p>}
    </div>
  );
}
