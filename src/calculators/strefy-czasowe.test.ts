import { describe, expect, it } from "vitest";
import { przeliczGodzine } from "./strefy-czasowe";

describe("przelicznik stref czasowych", () => {
  it("12:00, różnica -6 godzin = 06:00, ten sam dzień", () => {
    const w = przeliczGodzine(12, 0, -6);
    expect(w.godzina).toBe(6);
    expect(w.dzien).toBe("ten sam dzień");
  });

  it("22:00, różnica +5 godzin = 03:00, dzień później", () => {
    const w = przeliczGodzine(22, 0, 5);
    expect(w.godzina).toBe(3);
    expect(w.dzien).toBe("dzień później");
  });

  it("2:00, różnica -5 godzin = 21:00, dzień wcześniej", () => {
    const w = przeliczGodzine(2, 0, -5);
    expect(w.godzina).toBe(21);
    expect(w.dzien).toBe("dzień wcześniej");
  });
});
