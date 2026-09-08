import { describe, expect, it } from "vitest";
import { odsetkiZaOpoznienie } from "./odsetki-ustawowe";

describe("odsetki ustawowe", () => {
  it("1000 zł, stawka 11,5%, 30 dni", () => {
    expect(odsetkiZaOpoznienie(1000, 11.5, 30)).toBeCloseTo(9.45, 2);
  });

  it("5000 zł, stawka 12%, 90 dni", () => {
    expect(odsetkiZaOpoznienie(5000, 12, 90)).toBeCloseTo(147.95, 2);
  });

  it("0 dni opóźnienia daje 0 odsetek", () => {
    expect(odsetkiZaOpoznienie(1000, 10, 0)).toBe(0);
  });
});
