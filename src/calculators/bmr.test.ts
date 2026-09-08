import { describe, expect, it } from "vitest";
import { obliczBMR } from "./bmr";

describe("bmr (wzór Mifflina-St Jeora)", () => {
  it("kobieta, 65 kg, 168 cm, 30 lat -> BMR ~1401.5", () => {
    // 10*65 + 6.25*168 - 5*30 - 161 = 650 + 1050 - 150 - 161 = 1389
    expect(obliczBMR(65, 168, 30, "kobieta")).toBeCloseTo(1389, 6);
  });

  it("mężczyzna, 80 kg, 180 cm, 30 lat -> BMR", () => {
    // 10*80 + 6.25*180 - 5*30 + 5 = 800 + 1125 - 150 + 5 = 1780
    expect(obliczBMR(80, 180, 30, "mezczyzna")).toBeCloseTo(1780, 6);
  });
});
