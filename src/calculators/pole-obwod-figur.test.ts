import { describe, expect, it } from "vitest";
import { poleObwodKola, poleObwodProstokata, poleTrojkata } from "./pole-obwod-figur";

describe("pole i obwód figur", () => {
  it("koło r=3", () => {
    const { pole, obwod } = poleObwodKola(3);
    expect(pole).toBeCloseTo(28.27, 2);
    expect(obwod).toBeCloseTo(18.85, 2);
  });

  it("prostokąt 4x5", () => {
    const { pole, obwod } = poleObwodProstokata(4, 5);
    expect(pole).toBe(20);
    expect(obwod).toBe(18);
  });

  it("trójkąt podstawa 6, wysokość 4", () => {
    expect(poleTrojkata(6, 4)).toBe(12);
  });
});
