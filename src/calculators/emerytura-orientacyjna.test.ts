import { describe, expect, it } from "vitest";
import { szacowanyKapital, szacowanaEmeryturaMiesieczna } from "./emerytura-orientacyjna";

describe("orientacyjny kalkulator emerytalny", () => {
  it("6000 zł, 420 mies., waloryzacja 3%", () => {
    const kapital = szacowanyKapital(6000, 420, 3);
    expect(kapital).toBeCloseTo(868519.36, 1);
    expect(szacowanaEmeryturaMiesieczna(kapital)).toBeCloseTo(3618.83, 1);
  });

  it("5000 zł, 120 mies., waloryzacja 0%", () => {
    const kapital = szacowanyKapital(5000, 120, 0);
    expect(kapital).toBeCloseTo(117120, 6);
    expect(szacowanaEmeryturaMiesieczna(kapital)).toBeCloseTo(488, 6);
  });
});
