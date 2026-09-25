"use client";

import { ChevronDown } from "lucide-react";
import { CalculatorField } from "@/calculators/types";
import { FieldLabel, fieldControl, fieldFrame } from "./CalculatorInput";

interface CalculatorSelectProps {
  field: CalculatorField;
  value: string;
  onChange: (value: string) => void;
}

/**
 * Krótka lista opcji = przełącznik (mniej stuknięć na telefonie),
 * średnia = lista pól wyboru, długa = natywny select.
 */
export default function CalculatorSelect({ field, value, onChange }: CalculatorSelectProps) {
  const inputId = `field-${field.id}`;
  const options = field.options ?? [];
  const segmented = options.length <= 4 && options.every((o) => o.label.length <= 14);
  const radioList = !segmented && options.length <= 5;

  if (segmented || radioList) {
    return (
      <fieldset>
        <legend className="caps mb-1.5 block text-[0.7rem] text-ink-2">{field.label}</legend>
        <div
          className="grid border border-hair-strong"
          style={segmented ? { gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` } : undefined}
        >
          {options.map((opt, i) => {
            const checked = value === opt.value;
            const divider = i > 0 ? (segmented ? "border-l border-hair-strong" : "border-t border-hair") : "";
            return (
              <label
                key={opt.value}
                className={`relative flex min-h-12 cursor-pointer items-center gap-3 px-3.5 py-2 text-[1rem] transition-colors duration-150 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:-outline-offset-2 has-[:focus-visible]:outline-green ${divider} ${
                  segmented ? "justify-center text-center" : ""
                } ${checked ? "z-10 bg-green-tint font-semibold text-ink shadow-[inset_0_0_0_1.5px_var(--frame)]" : "bg-paper text-ink-2 hover:bg-table hover:text-ink"}`}
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
                    className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-[1.5px] ${checked ? "border-frame" : "border-ink-3"}`}
                  >
                    {checked && <span className="h-2 w-2 rounded-full bg-frame" />}
                  </span>
                )}
                {opt.label}
              </label>
            );
          })}
        </div>
        {field.helpText && <p className="mt-1.5 text-[0.875rem] leading-snug text-ink-3">{field.helpText}</p>}
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
          className={`${fieldControl} cursor-pointer appearance-none pr-10`}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown aria-hidden className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-green" strokeWidth={2} />
      </div>
      {field.helpText && <p className="mt-1.5 text-[0.875rem] leading-snug text-ink-3">{field.helpText}</p>}
    </div>
  );
}
