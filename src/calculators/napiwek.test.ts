import { describe, expect, it } from "vitest";
import { obliczNapiwek } from "./napiwek";

describe("napiwek", () => {
  it("200 zł, napiwek 10%, 4 osoby", () => {
    const w = obliczNapiwek(200, 10, 4);
    expect(w.kwotaNapiwku).toBe(20);
    expect(w.razem).toBe(220);
    expect(w.naOsobe).toBe(55);
  });

  it("100 zł, napiwek 0%, 2 osoby", () => {
    const w = obliczNapiwek(100, 0, 2);
    expect(w.naOsobe).toBe(50);
  });
});
