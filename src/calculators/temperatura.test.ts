import { describe, expect, it } from "vitest";
import { celsjuszNaFahrenheita, fahrenheitNaCelsjusz, celsjuszNaKelwiny, przeliczTemperature } from "./temperatura";

describe("przelicznik temperatury", () => {
  it("20°C = 68°F", () => {
    expect(celsjuszNaFahrenheita(20)).toBe(68);
  });

  it("0°C = 273,15 K", () => {
    expect(celsjuszNaKelwiny(0)).toBe(273.15);
  });

  it("32°F = 0°C", () => {
    expect(fahrenheitNaCelsjusz(32)).toBe(0);
  });

  it("przelicznik c->k->f spójny", () => {
    expect(przeliczTemperature(100, "c", "f")).toBe(212);
    expect(przeliczTemperature(212, "f", "c")).toBeCloseTo(100, 6);
  });
});
