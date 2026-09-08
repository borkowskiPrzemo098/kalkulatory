import { describe, expect, it } from "vitest";
import { roznicaDni } from "./roznica-dni";

describe("różnica dni między datami", () => {
  it("01.01.2026 do 31.01.2026 = 30 dni", () => {
    expect(roznicaDni(new Date("2026-01-01T00:00:00"), new Date("2026-01-31T00:00:00"))).toBe(30);
  });

  it("ta sama data = 0 dni", () => {
    expect(roznicaDni(new Date("2026-05-01T00:00:00"), new Date("2026-05-01T00:00:00"))).toBe(0);
  });

  it("data wcześniejsza daje wynik ujemny", () => {
    expect(roznicaDni(new Date("2026-05-10T00:00:00"), new Date("2026-05-01T00:00:00"))).toBe(-9);
  });
});
