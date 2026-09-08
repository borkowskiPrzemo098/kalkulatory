import { describe, expect, it } from "vitest";
import { nwd, nww } from "./nwd-nww";

describe("nwd i nww", () => {
  it("NWD(24,36)=12, NWW(24,36)=72", () => {
    expect(nwd(24, 36)).toBe(12);
    expect(nww(24, 36)).toBe(72);
  });

  it("NWD(17,5)=1 (liczby względnie pierwsze)", () => {
    expect(nwd(17, 5)).toBe(1);
  });

  it("NWW(4,6)=12", () => {
    expect(nww(4, 6)).toBe(12);
  });
});
