import { describe, expect, it } from "vitest";
import { obliczZuzytePaliwo, obliczKosztPrzejazdu } from "./paliwo";

describe("spalanie paliwa", () => {
  it("300 km przy 6,5 l/100km -> 19,5 l", () => {
    expect(obliczZuzytePaliwo(300, 6.5)).toBeCloseTo(19.5, 6);
  });

  it("19,5 l przy cenie 6,30 zł/l -> 122,85 zł", () => {
    expect(obliczKosztPrzejazdu(19.5, 6.3)).toBeCloseTo(122.85, 6);
  });
});
