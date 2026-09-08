import { describe, expect, it } from "vitest";
import { przyspieszenieMs2 } from "./przyspieszenie-predkosc";

describe("przyspieszenie", () => {
  it("0 do 100 km/h w 10 s", () => {
    expect(przyspieszenieMs2(0, 100, 10)).toBeCloseTo(2.78, 2);
  });

  it("50 do 90 km/h w 5 s", () => {
    expect(przyspieszenieMs2(50, 90, 5)).toBeCloseTo(2.22, 2);
  });
});
