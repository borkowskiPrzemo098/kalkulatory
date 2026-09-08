import { describe, expect, it } from "vitest";
import { bruttoNaNettoUproszczony } from "./wynagrodzenie-netto-brutto";

describe("wynagrodzenie netto z brutto (uproszczone)", () => {
  it("5000 zł brutto", () => {
    const w = bruttoNaNettoUproszczony(5000);
    expect(w.zus).toBeCloseTo(685.5, 2);
    expect(w.zdrowotna).toBeCloseTo(388.305, 2);
    expect(w.zaliczkaPit).toBe(188);
    expect(w.netto).toBeCloseTo(3738.195, 2);
  });

  it("8000 zł brutto", () => {
    const w = bruttoNaNettoUproszczony(8000);
    expect(w.netto).toBeCloseTo(5783.912, 2);
  });

  it("3500 zł brutto", () => {
    const w = bruttoNaNettoUproszczony(3500);
    expect(w.zaliczkaPit).toBe(32);
    expect(w.netto).toBeCloseTo(2716.3365, 2);
  });
});
