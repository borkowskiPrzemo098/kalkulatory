import { describe, expect, it } from "vitest";
import { wagaIdealnaDevine } from "./waga-idealna";

describe("waga idealna (Devine)", () => {
  it("mężczyzna, 180 cm", () => {
    expect(wagaIdealnaDevine(180, "m")).toBeCloseTo(74.99, 1);
  });

  it("kobieta, 165 cm", () => {
    expect(wagaIdealnaDevine(165, "k")).toBeCloseTo(56.91, 1);
  });
});
