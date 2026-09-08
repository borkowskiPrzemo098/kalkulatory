import { describe, expect, it } from "vitest";
import { obliczRabat } from "./rabat";

describe("rabat", () => {
  it("cena 200, rabat 15% -> rabat 30, cena po rabacie 170", () => {
    const { wartoscRabatu, cenaPoRabacie } = obliczRabat(200, 15);
    expect(wartoscRabatu).toBeCloseTo(30, 6);
    expect(cenaPoRabacie).toBeCloseTo(170, 6);
  });

  it("rabat 0% nie zmienia ceny", () => {
    const { cenaPoRabacie } = obliczRabat(100, 0);
    expect(cenaPoRabacie).toBe(100);
  });

  it("rabat 100% daje cenę 0", () => {
    const { cenaPoRabacie } = obliczRabat(100, 100);
    expect(cenaPoRabacie).toBe(0);
  });
});
