"use client";

import { CalculatorField } from "@/calculators/types";
import DimensionLine from "./DimensionLine";

interface CalculatorInputProps {
  field: CalculatorField;
  value: string;
  onChange: (value: string) => void;
}

/** Ramka pola: cienka linia, przy fokusie pogrubiona zielona (jak linia widoczna na rysunku). */
export const fieldFrame =
  "flex h-12 w-full items-stretch border border-hair-strong bg-paper transition-[border-color,box-shadow] duration-150 hover:border-ink-3 focus-within:border-green focus-within:shadow-[inset_0_0_0_1px_var(--green)]";

export const fieldControl =
  "min-w-0 flex-1 bg-transparent px-3.5 text-[1.125rem] font-semibold text-ink outline-none placeholder:font-normal placeholder:text-ink-3";

export function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="caps mb-1.5 block text-[0.7rem] text-ink-2">
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
          <span
            aria-hidden
            className="caps flex shrink-0 items-center border-l border-hair px-3 text-[0.72rem] text-green"
          >
            {field.unit}
          </span>
        )}
      </div>
      {/* Pole jako wymiar: pod wartością linia wymiarowa ze strzałkami, przerysowana przy każdej zmianie. */}
      {field.type !== "date" && <DimensionLine animKey={value} className="mt-1.5" />}
      {field.helpText && (
        <p id={helpId} className="mt-1.5 text-[0.875rem] leading-snug text-ink-3">
          {field.helpText}
        </p>
      )}
    </div>
  );
}
