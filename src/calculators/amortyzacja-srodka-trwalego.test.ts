import { describe, expect, it } from "vitest";
import { rocznyOdpis, okresAmortyzacjiLat } from "./amortyzacja-srodka-trwalego";

describe("amortyzacja środka trwałego", () => {
  it("12000 zł, stawka 20% => 2400 zł/rok", () => {
    expect(rocznyOdpis(12000, 20)).toBe(2400);
  });

  it("okres amortyzacji przy stawce 20% to 5 lat", () => {
    expect(okresAmortyzacjiLat(20)).toBe(5);
  });

  it("50000 zł, stawka 10% => 5000 zł/rok, okres 10 lat", () => {
    expect(rocznyOdpis(50000, 10)).toBe(5000);
    expect(okresAmortyzacjiLat(10)).toBe(10);
  });
});
