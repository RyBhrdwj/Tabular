import React, { useState, useEffect, useRef } from "react";
import { Grid } from "react-virtualized";
import { Table } from "../services/tableService";
import CellL from "./components/Cell";
import CellM from "./components/CellM.jsx";
import { tableState, subscribeToTableState } from "../store/tableStore.js";
import { useSnapshot } from "valtio";

const useMigrated = 1;
const Cell = useMigrated ? CellM : CellL;

subscribeToTableState(() =>
  console.log(
    "State UPdated",
    tableState.getCellByCoordinate(tableState.currentCell)
  )
);

// New Initial Table Definition
// const newInitTable = {
//   1: { 1: { value: "HELLO WORLD", formula: "" } },
//   2: { 1: { value: "TRY", formula: "" }, 2: { value: "FORMULA", formula: "" } },
// };

function AppM() {
  console.log("Migrated App Rendered");
  const tableSnapshot = useSnapshot(tableState);

  const handleInputChange = (rowIndex, columnIndex, value, formula = "") => {
    // tableState.setCell(rowIndex, columnIndex, value, formula);
  };

  const handleAddRow = () => {
    // TODO: Make this method dynamic
    tableState.addRowAfter(1);
  };

  const cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
    if (rowIndex === 0 && columnIndex === 0) {
      return (
        <div
          key={key}
          style={style}
          className="bg-zinc-950/50 border border-gray-100 flex justify-center items-center font-bold text-white"
        >
          {/* Empty top-left corner */}
        </div>
      );
    }

    if (rowIndex === 0) {
      return (
        <div
          key={key}
          style={style}
          className="bg-zinc-950/50 border border-gray-100 flex justify-center items-center font-bold text-white"
        >
          {tableState.getColumnName(columnIndex)}
        </div>
      );
    }

    if (columnIndex === 0) {
      return (
        <div
          key={key}
          style={style}
          className="bg-zinc-950/50 border border-gray-100 flex justify-center items-center font-bold text-white"
        >
          {rowIndex}
        </div>
      );
    }

    const cell = tableState?.getCell(rowIndex, columnIndex);
    const value = cell?.value || (cell?.value === 0 ? 0 : "");
    const formula = cell?.formula || cell?.value === 0 || "";
    const cellCoordinate = `${tableState?.getColumnName(
      columnIndex
    )}${rowIndex}`;

    return (
      <div key={key} style={style} className="flex justify-center items-center">
        <Cell
          rowIndex={rowIndex}
          columnIndex={columnIndex}
          coordinate={cellCoordinate}
          value={value} // TODO - No need to pass this down, use tableState directly
          formula={formula} // TODO - No need to pass this down, use tableState directly
          onChange={handleInputChange} // TODO - No need to pass this down, use tableState directly
          // currentCell={currentCell}
          // setCurrentCell={setCurrentCell}
          // tableInstance={tableInstance}
        />
      </div>
    );
  };

  return (
    <>
      <div className="w-full h-[10vh] bg-zinc-800 flex justify-between items-center px-4">
        <div className="text-white font-bold text-2xl">Tabular</div>
        <div className="flex items-center space-x-4">
          <span className="text-white bg-zinc-900 px-3 py-2 rounded min-w-[100px]">
            Cell : <b>{tableSnapshot.currentCell}</b>
          </span>
          <span className="text-white bg-zinc-900 px-3 py-2 rounded min-w-[200px]">
            Formula :{" "}
            <b>
              {tableSnapshot
                ?.getCellByCoordinate(tableSnapshot.currentCell)
                ?.formula?.slice(1) || ""}
            </b>
          </span>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleAddRow}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-transform transform hover:scale-105"
          >
            Add Row
          </button>
          <button
            onClick={() => {
              tableState.addColumnAfter(1);
            }}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-transform transform hover:scale-105"
          >
            Add Column
          </button>
          <button
            onClick={() => {
              console.log("Save sheet functionality to be implemented");
            }}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-transform transform hover:scale-105"
          >
            Save Sheet
          </button>
        </div>
      </div>
      <Grid
        cellRenderer={cellRenderer}
        columnCount={tableState?.cols.length || 53}
        columnWidth={100}
        height={0.9 * window.innerHeight}
        rowCount={tableState?.rows.length || 1000}
        rowHeight={30}
        width={window.innerWidth}
      />
    </>
  );
}

function AppL() {
  const [tableInstance, setTableInstance] = useState(null);
  const [currentCell, setCurrentCell] = useState("A1");
  console.log(tableInstance);

  useEffect(() => {
    // const table = new Table(
    //   newInitTable,
    //   Array.from({ length: 1001 }, (_, i) => i),
    //   Array.from({ length: 53 }, (_, i) => i)
    // );
    const table = new Table();

    setTableInstance(table);
  }, []);

  const handleInputChange = (rowIndex, columnIndex, value, formula = "") => {
    if (tableInstance) {
      const updatedTableInstance = Table.copy(tableInstance);
      updatedTableInstance.setCell(rowIndex, columnIndex, value, formula);
      setTableInstance(updatedTableInstance);
    }
  };

  const handleAddRow = () => {
    if (tableInstance) {
      const updatedTableInstance = Table.copy(tableInstance);
      updatedTableInstance.addRowAfter(1);
      setTableInstance(updatedTableInstance);
    }
  };

  const cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
    if (rowIndex === 0 && columnIndex === 0) {
      return (
        <div
          key={key}
          style={style}
          className="bg-zinc-950/50 border border-gray-100 flex justify-center items-center font-bold text-white"
        >
          {/* Empty top-left corner */}
        </div>
      );
    }

    if (rowIndex === 0) {
      return (
        <div
          key={key}
          style={style}
          className="bg-zinc-950/50 border border-gray-100 flex justify-center items-center font-bold text-white"
        >
          {tableInstance?.getColumnName(columnIndex)}
        </div>
      );
    }

    if (columnIndex === 0) {
      return (
        <div
          key={key}
          style={style}
          className="bg-zinc-950/50 border border-gray-100 flex justify-center items-center font-bold text-white"
        >
          {rowIndex}
        </div>
      );
    }

    const cell = tableInstance?.getCell(rowIndex, columnIndex);
    const value = cell?.value || (cell?.value === 0 ? 0 : "");
    const formula = cell?.formula || cell?.value === 0 || "";
    const cellCoordinate = `${tableInstance?.getColumnName(
      columnIndex
    )}${rowIndex}`;

    return (
      <div key={key} style={style} className="flex justify-center items-center">
        <Cell
          rowIndex={rowIndex}
          columnIndex={columnIndex}
          coordinate={cellCoordinate}
          value={value}
          formula={formula}
          onChange={handleInputChange}
          currentCell={currentCell}
          setCurrentCell={setCurrentCell}
          tableInstance={tableInstance}
        />
      </div>
    );
  };

  return (
    <>
      <div className="w-full h-[10vh] bg-zinc-800 flex justify-between items-center px-4">
        <div className="text-white font-bold text-2xl">Tabular</div>
        <div className="flex items-center space-x-4">
          <span className="text-white bg-zinc-900 px-3 py-2 rounded min-w-[100px]">
            Cell : <b>{currentCell}</b>
          </span>
          <span className="text-white bg-zinc-900 px-3 py-2 rounded min-w-[200px]">
            Formula :{" "}
            <b>
              {tableInstance
                ?.getCellByCoordinate(currentCell)
                ?.formula.slice(1) || ""}
            </b>
          </span>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleAddRow}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-transform transform hover:scale-105"
          >
            Add Row
          </button>
          <button
            onClick={() => {
              if (tableInstance) {
                const updatedTableInstance = Table.copy(tableInstance);
                updatedTableInstance.addColumnAfter(1);
                setTableInstance(updatedTableInstance);
              }
            }}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-transform transform hover:scale-105"
          >
            Add Column
          </button>
          <button
            onClick={() => {
              console.log("Save sheet functionality to be implemented");
            }}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-transform transform hover:scale-105"
          >
            Save Sheet
          </button>
        </div>
      </div>
      <Grid
        cellRenderer={cellRenderer}
        columnCount={tableInstance?.cols.length || 53}
        columnWidth={100}
        height={0.9 * window.innerHeight}
        rowCount={tableInstance?.rows.length || 1000}
        rowHeight={30}
        width={window.innerWidth}
      />
    </>
  );
}

// testing valtio
// function App() {

//   let table = useSnapshot(tableState);
//   const count = useRef(55);

//   return (
//     <>
//     <h1>Hello World</h1>
//     <h1>{table?.currentCell || "none selected"}</h1>
//     <button onClick={() => {tableState.currentCell = 55}}> update cell</button>
//     <Child/>
//     </>
//   );
// }

export default useMigrated ? AppM : AppL;
