import { describe, expect, it } from "vitest";
import { zuzyciePaliwaLitry } from "./zuzycie-paliwa-trasa";

describe("zużycie paliwa na trasę", () => {
  it("300 km, spalanie 7 l/100km", () => {
    expect(zuzyciePaliwaLitry(300, 7)).toBe(21);
  });

  it("100 km, spalanie 5 l/100km", () => {
    expect(zuzyciePaliwaLitry(100, 5)).toBe(5);
  });
});
