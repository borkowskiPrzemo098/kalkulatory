import { describe, expect, it } from "vitest";
import { liczbaRolekTapety } from "./zuzycie-tapet";

describe("zużycie tapet", () => {
  it("41 m², rolka 0,53x10,05 m", () => {
    expect(liczbaRolekTapety(41, 0.53, 10.05)).toBe(8);
  });

  it("dokładna wielokrotność", () => {
    expect(liczbaRolekTapety(10, 1, 5)).toBe(2);
  });
});
