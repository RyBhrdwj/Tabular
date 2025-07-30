import { proxy, subscribe } from "valtio";
import { Table } from "../services/tableService.js";
import formulaEngine from "../services/formulaEngine.js";

/**
 * README
 * This file wires up `tableState` (Valtio proxy) with the formula engine.
 * Always import `formulaEngine` from here to ensure it's correctly bound.
 */

const tableState = proxy(new Table());

console.log("Formula engine initialized with table state:", tableState);

formulaEngine.setTable(tableState);

const subscribeToTableState = (callback, ...args) => {
  subscribe(tableState, () => {
    callback(...args);
  });
};

export { tableState, formulaEngine, subscribeToTableState };
