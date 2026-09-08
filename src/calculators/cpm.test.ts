import { describe, expect, it } from "vitest";
import { obliczCpm } from "./cpm";

describe("cpm", () => {
  it("500 zł, 250000 wyświetleń", () => {
    expect(obliczCpm(500, 250000)).toBe(2);
  });

  it("1000 zł, 1000000 wyświetleń", () => {
    expect(obliczCpm(1000, 1000000)).toBe(1);
  });
});
