import { describe, expect, it } from "vitest";
import { liczbaCegiel } from "./liczba-cegiel";

describe("liczba cegieł/bloczków", () => {
  it("10 m², 50 szt./m², zapas 5%", () => {
    expect(liczbaCegiel(10, 50, 5)).toBe(525);
  });

  it("20 m², 45 szt./m², bez zapasu", () => {
    expect(liczbaCegiel(20, 45, 0)).toBe(900);
  });
});
