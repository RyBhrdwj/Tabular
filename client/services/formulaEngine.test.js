import { describe, it, expect } from "vitest";
import formulaEngine from "./formulaEngine.js";

describe("formulaEngine instance (default export)", () => {
  it("should evaluate formulas and update dependents", () => {
    formulaEngine.table.setCellByCoordinate("B1", "6");
    formulaEngine.table.setCellByCoordinate("C1", "5");
    formulaEngine.table.setCellByCoordinate("A1", "ab", "=B1 + C1");
    formulaEngine.updateFormulaAndDependents("A1", "B1 + C1");

    expect(Number(formulaEngine.table.getCellByCoordinate("A1").value)).toBe(11);
    expect(Number(formulaEngine.table.getCellByCoordinate("B1").value)).toBe(6);
    expect(Number(formulaEngine.table.getCellByCoordinate("C1").value)).toBe(5);
  });

  it("should update dependencies and recalculate values", () => {
    formulaEngine.table.setCellByCoordinate("B1", "6");
    formulaEngine.table.setCellByCoordinate("C1", "5");
    formulaEngine.table.setCellByCoordinate("A1", "ab", "=B1 + C1");
    formulaEngine.updateFormulaAndDependents("A1", "B1 + C1");
    formulaEngine.table.setCellByCoordinate("B1", "", "=C1 + 2");
    formulaEngine.updateFormulaAndDependents("B1", "C1 + 2");
    formulaEngine.table.setCellByCoordinate("D2", "", "=B1 + 2");
    formulaEngine.updateFormulaAndDependents("D2", "B1 + 2");

    expect(Number(formulaEngine.table.getCellByCoordinate("B1").value)).toBe(7);
    expect(Number(formulaEngine.table.getCellByCoordinate("D2").value)).toBe(9);
    expect(Number(formulaEngine.table.getCellByCoordinate("A1").value)).toBe(12);
  });

  it("should return correct dependencies", () => {
    formulaEngine.table.setCellByCoordinate("A1", "", "=B1 + C1");
    formulaEngine.updateFormulaAndDependents("A1", "B1 + C1");
    expect(formulaEngine.dependencyGraph.getDependencies("A1")).toContain("B1");
    expect(formulaEngine.dependencyGraph.getDependencies("A1")).toContain("C1");
  });
});
