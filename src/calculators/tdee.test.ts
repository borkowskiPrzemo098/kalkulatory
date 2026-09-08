import { describe, expect, it } from "vitest";
import { bmrMifflinStJeor, tdee } from "./tdee";

describe("tdee", () => {
  it("mężczyzna 80kg, 180cm, 30 lat", () => {
    expect(bmrMifflinStJeor(80, 180, 30, "m")).toBe(1780);
    expect(tdee(1780, 1.55)).toBeCloseTo(2759, 0);
  });

  it("kobieta 65kg, 165cm, 28 lat", () => {
    expect(bmrMifflinStJeor(65, 165, 28, "k")).toBeCloseTo(1380.25, 2);
  });
});
