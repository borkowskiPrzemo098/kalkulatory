import { describe, expect, it } from "vitest";
import { kosztPodrozy } from "./koszt-podrozy";

describe("koszt podróży samochodem", () => {
  it("300 km, spalanie 7 l/100km, cena 6,5 zł/l", () => {
    expect(kosztPodrozy(300, 7, 6.5)).toBeCloseTo(136.5, 2);
  });

  it("100 km, spalanie 5 l/100km, cena 6 zł/l", () => {
    expect(kosztPodrozy(100, 5, 6)).toBe(30);
  });
});
