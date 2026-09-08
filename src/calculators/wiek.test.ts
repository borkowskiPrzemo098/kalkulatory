import { describe, expect, it } from "vitest";
import { obliczWiek } from "./wiek";

describe("wiek", () => {
  it("od 15.03.1990 do 15.03.2024 = dokładnie 34 lata", () => {
    const wynik = obliczWiek(new Date(1990, 2, 15), new Date(2024, 2, 15));
    expect(wynik.lata).toBe(34);
    expect(wynik.miesiace).toBe(0);
    expect(wynik.dni).toBe(0);
  });

  it("od 20.01.2000 do 10.01.2024 = 23 lata, 11 miesięcy", () => {
    const wynik = obliczWiek(new Date(2000, 0, 20), new Date(2024, 0, 10));
    expect(wynik.lata).toBe(23);
    expect(wynik.miesiace).toBe(11);
  });

  it("liczba całkowitych dni jest dodatnia dla dat w przeszłości", () => {
    const wynik = obliczWiek(new Date(2020, 0, 1), new Date(2020, 0, 11));
    expect(wynik.calkowiteDni).toBe(10);
  });
});
