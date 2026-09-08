import { describe, expect, it } from "vitest";
import { iloscFarbyLitry } from "./zuzycie-farby";

describe("zużycie farby", () => {
  it("41 m², wydajność 10 m²/l, 2 warstwy", () => {
    expect(iloscFarbyLitry(41, 10, 2)).toBeCloseTo(8.2, 6);
  });

  it("20 m², wydajność 5 m²/l, 1 warstwa", () => {
    expect(iloscFarbyLitry(20, 5, 1)).toBe(4);
  });
});
