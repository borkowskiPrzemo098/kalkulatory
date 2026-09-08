import { describe, expect, it } from "vitest";
import { przeliczCisnienie } from "./cisnienie";

describe("przelicznik ciśnienia", () => {
  it("2,2 bar ≈ 31,9 psi", () => {
    expect(przeliczCisnienie(2.2, "bar", "psi")).toBeCloseTo(31.9, 0);
  });

  it("1 atm ≈ 1,013 bar", () => {
    expect(przeliczCisnienie(1, "atm", "bar")).toBeCloseTo(1.01325, 4);
  });

  it("1000 Pa = 10 hPa", () => {
    expect(przeliczCisnienie(1000, "pa", "hpa")).toBe(10);
  });
});
