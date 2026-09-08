import { describe, expect, it } from "vitest";
import { przeliczPredkosc } from "./predkosc";

describe("przelicznik prędkości", () => {
  it("100 km/h ≈ 62,14 mph", () => {
    expect(przeliczPredkosc(100, "kmh", "mph")).toBeCloseTo(62.14, 1);
  });

  it("1 węzeł ≈ 1,852 km/h", () => {
    expect(przeliczPredkosc(1, "wezel", "kmh")).toBeCloseTo(1.852, 3);
  });

  it("36 km/h = 10 m/s", () => {
    expect(przeliczPredkosc(36, "kmh", "ms")).toBeCloseTo(10, 6);
  });
});
