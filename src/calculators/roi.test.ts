import { describe, expect, it } from "vitest";
import { obliczRoi } from "./roi";

describe("roi", () => {
  it("1500 zł zwrotu, 1000 zł kosztu = 50%", () => {
    expect(obliczRoi(1500, 1000)).toBe(50);
  });

  it("800 zł zwrotu, 1000 zł kosztu = -20% (strata)", () => {
    expect(obliczRoi(800, 1000)).toBe(-20);
  });
});
