import { Table } from "./tableService.js";
import DependencyGraph from "./dependencyGraph.js";
import FormulaParser from "./formulaParser.js";

// TODO: Implement a reset method to clear everything
class FormulaEngineMediator {
  constructor(table, dependencyGraph) {
    this.table = table;
    this.dependencyGraph = dependencyGraph;
    this.formulaParser = new FormulaParser();
  }

  setTable(table) {
    this.table = table;

    for (const row of this.table.rows) {
      for (const col of this.table.cols) {
        const coordinate = `${this.table.getColumnName(col)}${row}`;
        const formula = this.table.getCellFormulaByCoordinate(coordinate);
        
        if (formula) {
          this.formulaParser.setExpression(formula);
          const dependencies = this.formulaParser.getVariables();

          this.dependencyGraph.updateDependencies(coordinate, dependencies);
        }
      }
    }
  }

  // TODO: Implement a value cache to avoid recalculating the same value multiple times
  updateDependents(cell) {
    const { hasCycle, evaluationOrder } =
      this.dependencyGraph.getCellEvaluationOrder(cell);

    if (hasCycle) {
      evaluationOrder.forEach((cell) => {
        this.table.setCell(cell.row, cell.col, "#CYCLE");
      });

      return;
    }

    // for every cell, find depdencies, get values, evalue and set value
    const cellFormulas = this.table.getCellsByCoordinate(evaluationOrder, {
      returnType: "formula",
    });

    Object.keys(cellFormulas).forEach((coordinate) => {
      this.formulaParser.setExpression(cellFormulas[coordinate]);

      // FIXME: #ERROR if formula invalid OR variable not found / invalid
      const requiredCellValues = this.formulaParser.getVariables();
      const requiredValues = this.table.getCellsByCoordinate(
        requiredCellValues,
        { returnType: "value" }
      );
      const evaluatedValue =
        this.formulaParser.evaluateExpression(requiredValues);

      this.table.setCellByCoordinate(coordinate, evaluatedValue);
    });
  }

  updateFormulaAndDependents(cell, formula) {
    if (formula[0] === "=") {
      formula = formula.slice(1);
    }

    this.formulaParser.setExpression(formula);
    const dependencies = this.formulaParser.getVariables();

    this.dependencyGraph.updateDependencies(cell, dependencies);

    this.updateDependents(cell);

    return;
  }
}

export default new FormulaEngineMediator(new Table(), new DependencyGraph());