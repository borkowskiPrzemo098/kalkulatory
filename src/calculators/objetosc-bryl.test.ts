import { describe, expect, it } from "vitest";
import { objetoscSzescianu, objetoscWalca, objetoscKuli, objetoscStozka } from "./objetosc-bryl";

describe("objętość brył", () => {
  it("sześcian a=3 => 27", () => {
    expect(objetoscSzescianu(3)).toBe(27);
  });

  it("kula r=3", () => {
    expect(objetoscKuli(3)).toBeCloseTo(113.1, 1);
  });

  it("walec r=2 h=5", () => {
    expect(objetoscWalca(2, 5)).toBeCloseTo(62.83, 2);
  });

  it("stożek r=3 h=6", () => {
    expect(objetoscStozka(3, 6)).toBeCloseTo(56.55, 2);
  });
});
