import { describe, expect, it } from "vitest";
import { obliczRateAnnuitetowa } from "./raty-kredytu";

describe("raty kredytu", () => {
  it("20 000 zł, 9,5% rocznie, 36 rat -> rata ~640,44 zł", () => {
    const rata = obliczRateAnnuitetowa(20000, 9.5, 36);
    expect(rata).toBeCloseTo(640.66, 1);
  });

  it("oprocentowanie 0% -> rata to kwota / liczba rat", () => {
    const rata = obliczRateAnnuitetowa(12000, 0, 12);
    expect(rata).toBeCloseTo(1000, 6);
  });
});
