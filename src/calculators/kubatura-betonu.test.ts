import { describe, expect, it } from "vitest";
import { kubaturaBetonuM3 } from "./kubatura-betonu";

describe("kubatura betonu", () => {
  it("5x4 m, grubość 0,1 m", () => {
    expect(kubaturaBetonuM3(5, 4, 0.1)).toBe(2);
  });

  it("3x3 m, grubość 0,15 m", () => {
    expect(kubaturaBetonuM3(3, 3, 0.15)).toBeCloseTo(1.35, 6);
  });
});
