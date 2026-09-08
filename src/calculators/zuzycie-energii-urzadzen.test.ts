import { describe, expect, it } from "vitest";
import { zuzycieEnergiiKwh } from "./zuzycie-energii-urzadzen";

describe("zużycie energii urządzeń", () => {
  it("2000 W, 1 godz./dzień, 30 dni", () => {
    expect(zuzycieEnergiiKwh(2000, 1, 30)).toBe(60);
  });

  it("100 W, 5 godz./dzień, 30 dni", () => {
    expect(zuzycieEnergiiKwh(100, 5, 30)).toBe(15);
  });
});
