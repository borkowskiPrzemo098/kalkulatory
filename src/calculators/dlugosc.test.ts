import { describe, expect, it } from "vitest";
import { przeliczDlugosc } from "./dlugosc";

describe("przelicznik długości", () => {
  it("1000 m = 1 km", () => {
    expect(przeliczDlugosc(1000, "m", "km")).toBe(1);
  });

  it("1 mila ≈ 1609,344 m", () => {
    expect(przeliczDlugosc(1, "mila", "m")).toBeCloseTo(1609.344, 3);
  });

  it("1 m ≈ 39,37 cala", () => {
    expect(przeliczDlugosc(1, "m", "cal")).toBeCloseTo(39.37, 2);
  });
});
