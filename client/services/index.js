import { proxy, subscribe as subscribeToProxy } from "valtio";
import { Table } from "./tableService.js";
import formulaEngine from "./formulaEngine.js";

// TODO: IMPLEMENT THIS IN REACT
// STATE IS A SNAPSHOT
// FORMULA ENGINE MEDIATOR USES THE PROXY AS REFERENCE TO THE TABLE
// PROXY IS A REFERENCE TO THE TABLE

const tableProxy = proxy(new Table());
formulaEngine.setTable(tableProxy);

subscribeToProxy(tableProxy, () => {
  console.log("Table changed");
});

tableProxy.setCellByCoordinate("A1", 10);
console.log("change 1")

console.log(tableProxy.getCellByCoordinate("B1"));

tableProxy.setCellByCoordinate("B1", 0, "=A1 + 5");
console.log("change 2")

console.log(tableProxy.getCellByCoordinate("B1"));

formulaEngine.updateFormulaAndDependents("B1", "A1 + 5");
tableProxy.setCellByCoordinate("A1", 15);
console.log("change 3")

console.log(tableProxy.getCellByCoordinate("B1"));
