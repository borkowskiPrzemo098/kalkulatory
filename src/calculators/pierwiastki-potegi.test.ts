import { describe, expect, it } from "vitest";
import { potega, pierwiastek } from "./pierwiastki-potegi";

describe("potęgi i pierwiastki", () => {
  it("2^10 = 1024", () => {
    expect(potega(2, 10)).toBe(1024);
  });

  it("pierwiastek 3. stopnia z 27 = 3", () => {
    expect(pierwiastek(27, 3)).toBeCloseTo(3, 6);
  });

  it("pierwiastek kwadratowy z 16 = 4", () => {
    expect(pierwiastek(16, 2)).toBe(4);
  });

  it("pierwiastek 3. stopnia z -8 = -2", () => {
    expect(pierwiastek(-8, 3)).toBeCloseTo(-2, 6);
  });

  it("pierwiastek kwadratowy z liczby ujemnej to NaN", () => {
    expect(Number.isNaN(pierwiastek(-4, 2))).toBe(true);
  });
});
