import { describe, expect, it } from "vitest";
import { obliczMakroskladniki } from "./makroskladniki";

describe("makroskładniki", () => {
  it("2000 kcal, 30/30/40", () => {
    const w = obliczMakroskladniki(2000, 30, 30, 40);
    expect(w.bialkoG).toBeCloseTo(150, 6);
    expect(w.tluszczG).toBeCloseTo(66.67, 2);
    expect(w.weglowodanyG).toBeCloseTo(200, 6);
  });
});
