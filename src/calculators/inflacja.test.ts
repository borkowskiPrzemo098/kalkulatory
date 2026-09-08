import { describe, expect, it } from "vitest";
import { realnaWartosc } from "./inflacja";

describe("inflacja", () => {
  it("1000 zł, inflacja 5%, 1 rok", () => {
    expect(realnaWartosc(1000, 5, 1)).toBeCloseTo(952.38, 2);
  });

  it("10000 zł, inflacja 8%, 3 lata", () => {
    expect(realnaWartosc(10000, 8, 3)).toBeCloseTo(7938.32, 2);
  });

  it("0% inflacji nie zmienia wartości", () => {
    expect(realnaWartosc(500, 0, 10)).toBeCloseTo(500, 6);
  });
});
