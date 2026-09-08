import { describe, expect, it } from "vitest";
import { konwertujSystem } from "./system-liczbowy";

describe("konwerter systemów liczbowych", () => {
  it("255 dziesiętnie = FF w hex", () => {
    expect(konwertujSystem("255", "dec", "hex")).toBe("FF");
  });

  it("1010 binarnie = 10 dziesiętnie", () => {
    expect(konwertujSystem("1010", "bin", "dec")).toBe("10");
  });

  it("FF hex = 11111111 binarnie", () => {
    expect(konwertujSystem("FF", "hex", "bin")).toBe("11111111");
  });

  it("10 dziesiętnie = 12 ósemkowo", () => {
    expect(konwertujSystem("10", "dec", "oct")).toBe("12");
  });
});
