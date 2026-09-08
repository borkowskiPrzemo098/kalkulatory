import { describe, expect, it } from "vitest";
import { powierzchniaDoMalowania } from "./powierzchnia-malowania";

describe("powierzchnia malowania", () => {
  it("4x5 m, wysokość 2,5 m, otwory 4 m²", () => {
    expect(powierzchniaDoMalowania(4, 5, 2.5, 4)).toBe(41);
  });

  it("bez otworów", () => {
    expect(powierzchniaDoMalowania(3, 3, 2.5, 0)).toBe(30);
  });
});
