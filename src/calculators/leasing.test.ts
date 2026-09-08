import { describe, expect, it } from "vitest";
import { obliczLeasing } from "./leasing";

describe("leasing", () => {
  it("100000 zł, wpłata 10%, wykup 20%, 36 mies., 6%", () => {
    const w = obliczLeasing(100000, 10, 20, 36, 6);
    expect(w.kwotaFinansowana).toBe(90000);
    expect(w.wartoscWykupu).toBe(20000);
    expect(w.rataMiesieczna).toBeCloseTo(2394.44, 2);
  });

  it("50000 zł, wpłata 0%, wykup 10%, 24 mies., 8%", () => {
    const w = obliczLeasing(50000, 0, 10, 24, 8);
    expect(w.rataMiesieczna).toBeCloseTo(2208.33, 2);
  });
});
