import { describe, expect, it } from "vitest";
import { przeliczWaluteRecznymKursem } from "./waluta-manualna";

describe("przelicznik walut z ręcznym kursem", () => {
  it("100 PLN, kurs 0,23 = 23 EUR", () => {
    expect(przeliczWaluteRecznymKursem(100, 0.23)).toBe(23);
  });

  it("50 USD, kurs 4,05 = 202,5 PLN", () => {
    expect(przeliczWaluteRecznymKursem(50, 4.05)).toBeCloseTo(202.5, 6);
  });
});
