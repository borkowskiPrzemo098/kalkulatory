import { describe, expect, it } from "vitest";
import { tetnoKarvonen } from "./tetno-treningowe";

describe("tętno treningowe (Karvonen)", () => {
  it("30 lat, spoczynkowe 60, 70% intensywności", () => {
    expect(tetnoKarvonen(30, 60, 70)).toBe(151);
  });

  it("30 lat, spoczynkowe 60, 50% intensywności", () => {
    expect(tetnoKarvonen(30, 60, 50)).toBe(125);
  });

  it("30 lat, spoczynkowe 60, 85% intensywności", () => {
    expect(tetnoKarvonen(30, 60, 85)).toBeCloseTo(170.5, 1);
  });
});
