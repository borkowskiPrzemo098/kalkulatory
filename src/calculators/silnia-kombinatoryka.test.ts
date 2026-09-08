import { describe, expect, it } from "vitest";
import { silnia, permutacje, kombinacje } from "./silnia-kombinatoryka";

describe("silnia i kombinatoryka", () => {
  it("5! = 120", () => {
    expect(silnia(5)).toBe(120);
  });

  it("0! = 1", () => {
    expect(silnia(0)).toBe(1);
  });

  it("V(5,2) = 20", () => {
    expect(permutacje(5, 2)).toBe(20);
  });

  it("C(5,2) = 10", () => {
    expect(kombinacje(5, 2)).toBe(10);
  });

  it("C(6,3) = 20", () => {
    expect(kombinacje(6, 3)).toBe(20);
  });
});
