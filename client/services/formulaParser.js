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
  constructor(expression = null) {
    this.expression = expression;
    this.parser = new Parser();
    this.formula = expression ? this.parser.parse(expression) : null;
  }

  getExpression() {
    return this.expression;
  }

  setExpression(expression) {
    this.expression = expression;
    this.formula = this.parser.parse(expression);
  }

  /*
   * Returns the symbols in the expression. This is used to get the cell references in the formula.
   * @returns {Array} - An array of symbols in the expression.
   */
  getVariables() {
    return this.formula.variables();
  }

  /*
   * Evaluates the expression with the given cell values.
   * @param {Object} cellValues - An object containing cell values.
   * @returns {number | null}
   */
  evaluateExpression(cellValues) {
    if (!this.expression) return null;

    return this.formula.evaluate(cellValues);
  }
}

export default FormulaParser;
