import { describe, expect, it } from "vitest";
import { tempoMinNaKm, predkoscKmH } from "./tempo-biegowe";

describe("tempo biegowe", () => {
  it("10 km w 50 min", () => {
    expect(tempoMinNaKm(10, 50)).toBe(5);
    expect(predkoscKmH(10, 50)).toBe(12);
  });

  it("5 km w 25 min", () => {
    expect(tempoMinNaKm(5, 25)).toBe(5);
  });
});
