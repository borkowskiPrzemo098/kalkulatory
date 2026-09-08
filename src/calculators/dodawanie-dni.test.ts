import { describe, expect, it } from "vitest";
import { dodajDni } from "./dodawanie-dni";

describe("dodawanie dni do daty", () => {
  it("01.01.2026 + 30 dni = 31.01.2026", () => {
    const wynik = dodajDni(new Date("2026-01-01T00:00:00"), 30);
    expect(wynik.getFullYear()).toBe(2026);
    expect(wynik.getMonth()).toBe(0);
    expect(wynik.getDate()).toBe(31);
  });

  it("01.03.2026 - 10 dni = 19.02.2026", () => {
    const wynik = dodajDni(new Date("2026-03-01T00:00:00"), -10);
    expect(wynik.getMonth()).toBe(1);
    expect(wynik.getDate()).toBe(19);
  });
});
