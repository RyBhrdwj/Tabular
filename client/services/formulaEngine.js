import { Table } from "./tableService.js";
import DependencyGraph from "./dependencyGraph.js";
import FormulaParser from "./formulaParser.js";

class FormulaEngineMediator {
  constructor(table, dependencyGraph) {
    this.table = table;
    this.dependencyGraph = dependencyGraph;
    this.formulaParser = new FormulaParser();
  }

  setTable(table) {
    this.table = table;
  }

  updateFormulaAndDependents(cell, formula) {

    this.formulaParser.setExpression(formula);
    const dependencies = this.formulaParser.getVariables();

    this.dependencyGraph.updateDependencies(cell, dependencies);
    
    const { hasCycle, evaluationOrder } = this.dependencyGraph.getCellEvaluationOrder(cell);

    if (hasCycle) {
        evaluationOrder.forEach((cell) => {
            this.table.setCell(cell.row, cell.col, '#CYCLE');
        });

        return;
    }

    // for every cell, find depdencies, get values, evalue and set value
    const cellFormulas = this.table.getCellsByCoordinate(evaluationOrder, { returnType: "formula" }); // value, formula for each cell

    Object.keys(cellFormulas).forEach((coordinate) => {

        this.formulaParser.setExpression(cellFormulas[coordinate]);

        // FIXME: #ERROR if formula invalid OR variable not found / invalid
        
        const requiredCellValues = this.formulaParser.getVariables();
        const requiredValues = this.table.getCellsByCoordinate(requiredCellValues, { returnType: "value" });
        const evaluatedValue = this.formulaParser.evaluateExpression(requiredValues);
        
        this.table.setCellByCoordinate(cell, evaluatedValue);
    });
  }
}

export default FormulaEngineMediator;

// TESTING PURPOSE ONLY
const formulaEngine = new FormulaEngineMediator(new Table(), new DependencyGraph());
formulaEngine.table.setCellByCoordinate("B1", 5);
formulaEngine.table.setCellByCoordinate("C1", 5);
formulaEngine.table.setCellByCoordinate("A1", 0, "B1 + C1");
formulaEngine.updateFormulaAndDependents("A1", "B1 + C1");
console.log(formulaEngine.dependencyGraph.getDependencies("A1"));
console.log(formulaEngine.table.getCellByCoordinate("B1")); // Should print 5
console.log(formulaEngine.table.getCellsByCoordinate(["A1", "B1", "C1"], { returnType: "value" })); // Should print the values of A1, B1, and C1
console.log(formulaEngine.table.getCellByCoordinate("A1")); // Should print the evaluated value of A1 based on B1 and C1