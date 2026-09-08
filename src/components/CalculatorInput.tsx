"use client";

import { CalculatorField } from "@/calculators/types";

interface CalculatorInputProps {
  field: CalculatorField;
  value: string;
  onChange: (value: string) => void;
}

export default function CalculatorInput({ field, value, onChange }: CalculatorInputProps) {
  const inputId = `field-${field.id}`;

  if (field.type === "date") {
    return (
      <div>
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-foreground">
          {field.label}
        </label>
        <input
          id={inputId}
          type="date"
          value={value}
          max={new Date().toISOString().slice(0, 10)}
          onChange={(e) => onChange(e.target.value)}
          className="focus-ring w-full rounded-lg border border-border-strong bg-surface px-3.5 py-2.5 text-base text-foreground"
        />
        {field.helpText && <p className="mt-1 text-xs text-muted">{field.helpText}</p>}
      </div>
    );
  }

  return (
    <div>
      <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-foreground">
        {field.label}
        {field.unit && <span className="text-muted"> ({field.unit})</span>}
      </label>
      <div className="relative">
        <input
          id={inputId}
          type="text"
          inputMode="decimal"
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="focus-ring w-full rounded-lg border border-border-strong bg-surface px-3.5 py-2.5 text-base text-foreground placeholder:text-muted-2"
          aria-describedby={field.helpText ? `${inputId}-help` : undefined}
        />
      </div>
      {field.helpText && (
        <p id={`${inputId}-help`} className="mt-1 text-xs text-muted">
          {field.helpText}
        </p>
      )}
    </div>
  );
}
