import { describe, expect, it } from "vitest";
import { przeliczObjetosc } from "./objetosc";

describe("przelicznik objętości", () => {
  it("10 l ≈ 2,642 galona US", () => {
    expect(przeliczObjetosc(10, "l", "galonUS")).toBeCloseTo(2.642, 2);
  });

  it("1 m3 = 1000 l", () => {
    expect(przeliczObjetosc(1, "m3", "l")).toBe(1000);
  });

  it("1000 ml = 1 l", () => {
    expect(przeliczObjetosc(1000, "ml", "l")).toBe(1);
  });
});
