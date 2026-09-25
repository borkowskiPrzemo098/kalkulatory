"use client";

import { Check, ChevronDown } from "lucide-react";
import { CalculatorField } from "@/calculators/types";
import { FieldLabel, fieldControl, fieldFrame } from "./CalculatorInput";

interface CalculatorSelectProps {
  field: CalculatorField;
  value: string;
  onChange: (value: string) => void;
}

/**
 * Krótkie opcje = duże przyciski obok siebie, średnie = duże przyciski jeden pod drugim,
 * długa lista = natywny select. Wybrana opcja: pełna zieleń, dobrze widoczna.
 */
export default function CalculatorSelect({ field, value, onChange }: CalculatorSelectProps) {
  const inputId = `field-${field.id}`;
  const options = field.options ?? [];
  const segmented = options.length <= 6 && options.every((o) => o.label.length <= 14);
  const stacked = !segmented && options.length <= 5;

  if (segmented || stacked) {
    return (
      <fieldset>
        <legend className="mb-2 block text-[1rem] font-semibold text-ink">{field.label}</legend>
        <div
          className={segmented ? "flex flex-wrap gap-2" : "grid gap-2"}
        >
          {options.map((opt) => {
            const checked = value === opt.value;
            return (
              <label
                key={opt.value}
                className={`relative flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-2.5 text-[1rem] font-semibold transition-colors duration-150 has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-sun-600 ${
                  segmented ? "min-w-[4.5rem] flex-1 justify-center whitespace-nowrap text-center" : ""
                } ${
                  checked
                    ? "border-green-700 bg-green-700 text-white"
                    : "border-line bg-white text-ink-2 hover:border-green-200 hover:bg-green-50 hover:text-ink"
                }`}
              >
                <input
                  type="radio"
                  name={inputId}
                  value={opt.value}
                  checked={checked}
                  onChange={() => onChange(opt.value)}
                  className="sr-only"
                />
                {!segmented && (
                  <span
                    aria-hidden
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                      checked ? "border-white bg-white text-green-700" : "border-line-strong"
                    }`}
                  >
                    {checked && <Check className="h-4 w-4" strokeWidth={3} />}
                  </span>
                )}
                {opt.label}
              </label>
            );
          })}
        </div>
        {field.helpText && <p className="mt-2 text-[0.9375rem] leading-snug text-ink-3">{field.helpText}</p>}
      </fieldset>
    );
  }

  return (
    <div>
      <FieldLabel htmlFor={inputId}>{field.label}</FieldLabel>
      <div className={`${fieldFrame} relative`}>
        <select
          id={inputId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${fieldControl} cursor-pointer appearance-none pr-12 text-[1.0625rem]`}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown aria-hidden className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-green-700" strokeWidth={2.5} />
      </div>
      {field.helpText && <p className="mt-2 text-[0.9375rem] leading-snug text-ink-3">{field.helpText}</p>}
    </div>
  );
}
