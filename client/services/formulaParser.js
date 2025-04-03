import { Parser } from "expr-eval";
import DependencyGraph from "./dependencyGraph.js";

/*
    On updating formula, we need 
    1. to parse the formula and get the dependencies
    2. to update the dependency graph
    3. to evaluate the formula
    4. to update the value of the cell
    5. to update the value of the dependents
    6. to update the formula cache
    7. if in dfs while updating values, cyclcial dependency is found, update values of all cells in the cycle to null
*/

class FormulaParser {
  constructor(getCellByCoordinate, setCellByCoordinate, dependencyGraph = null) {
    this.parser = new Parser();
this.dependencyGraph = dependencyGraph || new DependencyGraph(); // Use injected instance or create a new one
    this.formulaCache = new Map();
    this.expression = null;

    this.getCellByCoordinate = getCellByCoordinate; // Injected function to fetch cell values
    this.setCellByCoordinate = setCellByCoordinate; // Injected function to set cell values
  }

  setFormula(cell, formula) {
    if (this.formulaCache.has(cell)) {
      const oldFormula = this.formulaCache.get(cell);

      if (oldFormula === formula) {
        return;
      }
    }

    this.formulaCache.set(cell, formula);

    this.expression = this.parser.parse(formula);

    const dependencies = this.expression.variables();

    // TODO: Update the table to use getDependencies to fetch them,
    // and call evaluateExpression with cellValues to get value
  }

  getDependencies() {
    return this.expression.variables();
  }

  evaluateExpression(cellValues) {
    if (!this.expression) return null;

    return this.expression.evaluate(cellValues);
  }
}

export default FormulaParser;

// const parser = new Parser();
// let parsed = parser.parse("A1 + B1 * 2 - C3");
// console.log(parsed.symbols());
// console.log(parsed.evaluate({ A1: 10, C3: 5, B1: 2 }));
// parsed = parser.parse("A1 + B1 * 2");
// console.log(parsed.symbols());
// console.log(parsed.evaluate({ A1: 10, C3: 5, B1: 2 }));
