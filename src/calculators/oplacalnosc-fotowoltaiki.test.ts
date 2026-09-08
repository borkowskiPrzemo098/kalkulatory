import { describe, expect, it } from "vitest";
import { opłacalnoscFotowoltaiki } from "./oplacalnosc-fotowoltaiki";

describe("opłacalność fotowoltaiki", () => {
  it("25000 zł, 6000 kWh/rok, 0,9 zł/kWh, autokonsumpcja 70%", () => {
    const w = opłacalnoscFotowoltaiki(25000, 6000, 0.9, 70);
    expect(w.rocznaOszczednosc).toBeCloseTo(3780, 6);
    expect(w.okresZwrotuLat).toBeCloseTo(6.61, 1);
  });
});
