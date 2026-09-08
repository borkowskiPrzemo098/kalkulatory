import { describe, expect, it } from "vitest";
import { obliczBMI, interpretacjaBMI } from "./bmi";

describe("bmi", () => {
  it("70 kg, 175 cm -> BMI ~22.86", () => {
    expect(obliczBMI(70, 175)).toBeCloseTo(22.857, 2);
  });

  it("interpretacja wagi prawidłowej", () => {
    expect(interpretacjaBMI(22)).toBe("waga prawidłowa");
  });

  it("interpretacja niedowagi i otyłości", () => {
    expect(interpretacjaBMI(17.5)).toBe("niedowaga");
    expect(interpretacjaBMI(32)).toBe("otyłość I stopnia");
  });
});
