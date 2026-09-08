import { describe, expect, it } from "vitest";
import { nettoZBrutto, bruttoZNetto } from "./vat";

describe("brutto-netto (współdzielona logika z vat.ts)", () => {
  it("1000 zł brutto przy 23% VAT -> ok. 813,01 zł netto", () => {
    expect(nettoZBrutto(1000, 23)).toBeCloseTo(813.008130081, 3);
  });

  it("813,01 zł netto przy 23% VAT -> ok. 1000 zł brutto", () => {
    expect(bruttoZNetto(813.008130081, 23)).toBeCloseTo(1000, 3);
  });
});
