export type FieldType = "number" | "select" | "date";

export interface FieldOption {
  value: string;
  label: string;
}

export interface CalculatorField {
  id: string;
  label: string;
  type: FieldType;
  unit?: string;
  placeholder?: string;
  defaultValue?: string;
  min?: number;
  max?: number;
  step?: number;
  options?: FieldOption[];
  helpText?: string;
  dependsOn?: { field: string; value: string };
}

export interface ResultScaleBand {
  from: number;
  to: number;
  label: string;
}

/** Opcjonalna podziałka: wynik rysowany na swojej skali (np. BMI). */
export interface ResultScale {
  min: number;
  max: number;
  value: number;
  bands: ResultScaleBand[];
}

export interface ResultLine {
  label: string;
  value: string;
  highlight?: boolean;
  scale?: ResultScale;
}

export interface CalculationOutcome {
  results: ResultLine[];
  error?: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface CalculatorExample {
  input: string;
  output: string;
}

export interface CalculatorConfig {
  slug: string;
  name: string;
  shortName?: string;
  shortDescription: string;
  metaDescription: string;
  category: string;
  tags: string[];
  fields: CalculatorField[];
  calculate: (values: Record<string, string>) => CalculationOutcome;
  intro: string;
  howTo: string[];
  formula?: string;
  examples: CalculatorExample[];
  faq: FaqItem[];
  popular?: boolean;
}
