import { describe, expect, it } from "vitest";
import { liczbaPlytek } from "./ilosc-plytek";

describe("ilość płytek", () => {
  it("20 m², płytka 0,09 m², zapas 10%", () => {
    expect(liczbaPlytek(20, 0.09, 10)).toBe(245);
  });

  it("bez zapasu", () => {
    expect(liczbaPlytek(9, 0.09, 0)).toBe(100);
  });
});
