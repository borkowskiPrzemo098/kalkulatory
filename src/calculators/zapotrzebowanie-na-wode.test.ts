import { describe, expect, it } from "vitest";
import { dziennaDawkaWodyMl } from "./zapotrzebowanie-na-wode";

describe("zapotrzebowanie na wodę", () => {
  it("70 kg, 60 min aktywności", () => {
    expect(dziennaDawkaWodyMl(70, 60)).toBe(3010);
  });

  it("80 kg, brak aktywności", () => {
    expect(dziennaDawkaWodyMl(80, 0)).toBe(2640);
  });
});
