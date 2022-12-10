import addNumbers from "../index";
import { it, describe, expect } from "vitest";

describe(">>>>>index.ts", () => {
  it("should return a sum of two numbers", () => {
    const a = 5;
    const b = 7;
    const expected = 12;

    expect(addNumbers(a, b)).toBe(expected);
  });
});
