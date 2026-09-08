import { describe, expect, it } from "vitest";
import { nettoZBrutto, bruttoZNetto } from "./vat";

describe("vat", () => {
  it("123 zł brutto przy 23% VAT = 100 zł netto", () => {
    expect(nettoZBrutto(123, 23)).toBeCloseTo(100, 6);
  });

  it("100 zł netto przy 23% VAT = 123 zł brutto", () => {
    expect(bruttoZNetto(100, 23)).toBeCloseTo(123, 6);
  });

  it("0% VAT nie zmienia kwoty", () => {
    expect(nettoZBrutto(100, 0)).toBe(100);
    expect(bruttoZNetto(100, 0)).toBe(100);
  });

  it("108 zł brutto przy 8% VAT = 100 zł netto", () => {
    expect(nettoZBrutto(108, 8)).toBeCloseTo(100, 6);
  });
});
