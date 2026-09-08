import { describe, expect, it } from "vitest";
import { dataEmerytury } from "./wiek-emerytalny";

describe("wiek emerytalny", () => {
  it("kobieta ur. 15.03.1990 -> emerytura 15.03.2050", () => {
    const d = dataEmerytury(new Date("1990-03-15T00:00:00"), "k");
    expect(d.getFullYear()).toBe(2050);
    expect(d.getMonth()).toBe(2);
    expect(d.getDate()).toBe(15);
  });

  it("mężczyzna ur. 01.01.2000 -> emerytura 01.01.2065", () => {
    const d = dataEmerytury(new Date("2000-01-01T00:00:00"), "m");
    expect(d.getFullYear()).toBe(2065);
  });
});
