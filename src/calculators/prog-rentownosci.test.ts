import { describe, expect, it } from "vitest";
import { progRentownosciSztuki } from "./prog-rentownosci";

describe("próg rentowności", () => {
  it("koszty stałe 10000, cena 50, koszt zmienny 30", () => {
    expect(progRentownosciSztuki(10000, 50, 30)).toBe(500);
  });

  it("koszty stałe 5000, cena 20, koszt zmienny 10", () => {
    expect(progRentownosciSztuki(5000, 20, 10)).toBe(500);
  });
});
