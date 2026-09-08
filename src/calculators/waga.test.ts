import { describe, expect, it } from "vitest";
import { przeliczWage } from "./waga";

describe("przelicznik wagi", () => {
  it("70 kg ≈ 154,32 funta", () => {
    expect(przeliczWage(70, "kg", "funt")).toBeCloseTo(154.32, 1);
  });

  it("1 funt ≈ 0,4536 kg", () => {
    expect(przeliczWage(1, "funt", "kg")).toBeCloseTo(0.4536, 4);
  });

  it("1000 g = 1 kg", () => {
    expect(przeliczWage(1000, "g", "kg")).toBe(1);
  });
});
