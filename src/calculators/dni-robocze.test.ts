import { describe, expect, it } from "vitest";
import { liczbaDniRoboczych } from "./dni-robocze";

describe("dni robocze między datami", () => {
  it("poniedziałek 2026-01-05 do piątku 2026-01-09 = 5 dni", () => {
    expect(liczbaDniRoboczych(new Date("2026-01-05T00:00:00"), new Date("2026-01-09T00:00:00"))).toBe(5);
  });

  it("pełny tydzień (pon-niedz) = 5 dni roboczych", () => {
    expect(liczbaDniRoboczych(new Date("2026-01-05T00:00:00"), new Date("2026-01-11T00:00:00"))).toBe(5);
  });

  it("ten sam dzień roboczy = 1 dzień", () => {
    expect(liczbaDniRoboczych(new Date("2026-01-05T00:00:00"), new Date("2026-01-05T00:00:00"))).toBe(1);
  });
});
