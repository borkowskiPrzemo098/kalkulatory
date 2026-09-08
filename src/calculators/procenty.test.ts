import { describe, expect, it } from "vitest";
import { obliczProcentZWartosci, obliczJakiProcentStanowi, obliczZmianeProcentowa } from "./procenty";

describe("procenty", () => {
  it("20% z 150 = 30", () => {
    expect(obliczProcentZWartosci(20, 150)).toBe(30);
  });

  it("jaki procent 30 stanowi z 150 = 20%", () => {
    expect(obliczJakiProcentStanowi(30, 150)).toBe(20);
  });

  it("zmiana ze 100 do 120 = wzrost 20%", () => {
    expect(obliczZmianeProcentowa(100, 120)).toBe(20);
  });

  it("zmiana ze 100 do 80 = spadek 20%", () => {
    expect(obliczZmianeProcentowa(100, 80)).toBe(-20);
  });

  it("dzielenie przez zero zwraca NaN", () => {
    expect(Number.isNaN(obliczJakiProcentStanowi(10, 0))).toBe(true);
  });
});
