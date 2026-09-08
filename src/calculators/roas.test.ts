import { describe, expect, it } from "vitest";
import { obliczRoas } from "./roas";

describe("roas", () => {
  it("5000 zł przychodu, 1000 zł wydatków", () => {
    expect(obliczRoas(5000, 1000)).toBe(5);
  });

  it("3000 zł przychodu, 1500 zł wydatków", () => {
    expect(obliczRoas(3000, 1500)).toBe(2);
  });
});
