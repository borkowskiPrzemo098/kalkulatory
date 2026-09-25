"use client";

import { CalculatorField } from "@/calculators/types";

interface CalculatorInputProps {
  field: CalculatorField;
  value: string;
  onChange: (value: string) => void;
}

/** Duże pole (56 px), gruba ramka, przy fokusie zielona ramka + miętowa poświata. */
export const fieldFrame =
  "flex h-14 w-full items-center rounded-xl border-2 border-line bg-white transition-[border-color,box-shadow] duration-150 hover:border-line-strong focus-within:border-green-700 focus-within:shadow-[0_0_0_4px_var(--green-100)]";

export const fieldControl =
  "h-full min-w-0 flex-1 rounded-xl bg-transparent px-4 text-[1.25rem] font-bold text-ink outline-none placeholder:font-normal placeholder:text-ink-3";

export function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-[1rem] font-semibold text-ink">
      {children}
    </label>
  );
}

export default function CalculatorInput({ field, value, onChange }: CalculatorInputProps) {
  const inputId = `field-${field.id}`;
  const helpId = field.helpText ? `${inputId}-help` : undefined;

  return (
    <div>
      <FieldLabel htmlFor={inputId}>
        {field.label}
        {field.unit && <span className="sr-only"> ({field.unit})</span>}
      </FieldLabel>
      <div className={fieldFrame}>
        {field.type === "date" ? (
          <input
            id={inputId}
            type="date"
            value={value}
            max={new Date().toISOString().slice(0, 10)}
            onChange={(e) => onChange(e.target.value)}
            aria-describedby={helpId}
            className={fieldControl}
          />
        ) : (
          <input
            id={inputId}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-describedby={helpId}
            className={fieldControl}
          />
        )}
        {field.unit && field.type !== "date" && (
          <span aria-hidden className="mr-2 shrink-0 rounded-lg bg-green-50 px-2.5 py-1.5 text-[1rem] font-bold text-green-800">
            {field.unit}
          </span>
        )}
      </div>
      {field.helpText && (
        <p id={helpId} className="mt-2 text-[0.9375rem] leading-snug text-ink-3">
          {field.helpText}
        </p>
      )}
    </div>
  );
}
