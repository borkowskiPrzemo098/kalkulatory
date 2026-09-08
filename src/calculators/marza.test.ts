import { describe, expect, it } from "vitest";
import { obliczMarze, obliczNarzut } from "./marza";

describe("marża i narzut", () => {
  it("zakup 80, sprzedaż 100 -> marża 20%, narzut 25%", () => {
    expect(obliczMarze(80, 100)).toBeCloseTo(20, 6);
    expect(obliczNarzut(80, 100)).toBeCloseTo(25, 6);
  });

  it("dzielenie przez zero zwraca NaN", () => {
    expect(Number.isNaN(obliczMarze(10, 0))).toBe(true);
    expect(Number.isNaN(obliczNarzut(0, 10))).toBe(true);
  });
});
