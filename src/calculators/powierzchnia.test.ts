import { describe, expect, it } from "vitest";
import { przeliczPowierzchnie } from "./powierzchnia";

describe("przelicznik powierzchni", () => {
  it("5000 m2 = 0,5 ha", () => {
    expect(przeliczPowierzchnie(5000, "m2", "hektar")).toBe(0.5);
  });

  it("1 hektar = 100 arów", () => {
    expect(przeliczPowierzchnie(1, "hektar", "ar")).toBe(100);
  });

  it("1 ar = 100 m2", () => {
    expect(przeliczPowierzchnie(1, "ar", "m2")).toBe(100);
  });
});
