import { describe, expect, it } from "vitest";
import { wartoscKoncowaLokaty } from "./lokata-procent-skladany";

describe("lokata - procent składany", () => {
  it("10000 zł, 5% rocznie, 3 lata, kapitalizacja roczna", () => {
    expect(wartoscKoncowaLokaty(10000, 5, 3, 1)).toBeCloseTo(11576.25, 2);
  });

  it("1000 zł, 12% rocznie, 1 rok, kapitalizacja miesięczna", () => {
    expect(wartoscKoncowaLokaty(1000, 12, 1, 12)).toBeCloseTo(1126.83, 2);
  });

  it("5000 zł, 3% rocznie, 2 lata, kapitalizacja kwartalna", () => {
    expect(wartoscKoncowaLokaty(5000, 3, 2, 4)).toBeCloseTo(5307.99, 2);
  });

  it("0% oprocentowania nie zmienia kapitału", () => {
    expect(wartoscKoncowaLokaty(1000, 0, 5, 12)).toBeCloseTo(1000, 6);
  });
});
