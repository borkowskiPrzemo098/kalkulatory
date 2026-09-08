import { describe, expect, it } from "vitest";
import { wiekLudzkiZwierzecia } from "./wiek-psa-kota";

describe("wiek psa/kota w latach ludzkich", () => {
  it("1 rok = 15 lat ludzkich", () => {
    expect(wiekLudzkiZwierzecia(1)).toBe(15);
  });

  it("2 lata = 24 lata ludzkie", () => {
    expect(wiekLudzkiZwierzecia(2)).toBe(24);
  });

  it("5 lat = 36 lat ludzkich", () => {
    expect(wiekLudzkiZwierzecia(5)).toBe(36);
  });

  it("10 lat = 56 lat ludzkich", () => {
    expect(wiekLudzkiZwierzecia(10)).toBe(56);
  });
});
