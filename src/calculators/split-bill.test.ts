import { describe, expect, it } from "vitest";
import { kwotaNaOsobe } from "./split-bill";

describe("podział rachunku", () => {
  it("240 zł, 4 osoby = 60 zł", () => {
    expect(kwotaNaOsobe(240, 4)).toBe(60);
  });

  it("100 zł, 3 osoby", () => {
    expect(kwotaNaOsobe(100, 3)).toBeCloseTo(33.33, 2);
  });
});
