import React, { useState, useEffect } from "react";
import { Grid } from "react-virtualized";
import { Table } from "../services/tableService";
import Cell from "./components/Cell";

// New Initial Table Definition
const newInitTable = {
  10: { 2: { value: "ab", formula: "" } },
  2: { 3: { value: "afdsf", formula: "" } },
};

function App() {
  const [tableInstance, setTableInstance] = useState(null);
  const [currentCell, setCurrentCell] = useState("");

  useEffect(() => {
    const table = new Table(
      newInitTable,
      // {},
      Array.from({ length: 1001 }, (_, i) => i),
      Array.from({ length: 53 }, (_, i) => i)
    );
    // const table = new Table();

    setTableInstance(table);
  }, []);

  const handleInputChange = (rowIndex, columnIndex, value) => {
    if (tableInstance) {
      const updatedTableInstance = Table.copy(tableInstance);
      updatedTableInstance.setCell(rowIndex, columnIndex, value);
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
    const value = cell?.value || "";
    const formula = cell?.formula || "";
    const cellCoordinate = `${tableInstance?.getColumnName(columnIndex)}${rowIndex}`;

    return (
      <div
        key={key}
        style={style}
        className="flex justify-center items-center"
        onClick={(e) => {
          e.stopPropagation();
          setCurrentCell(cellCoordinate);
        }}
      >
        <Cell
          rowIndex={rowIndex}
          columnIndex={columnIndex}
          coordinate={`${tableInstance?.getColumnName(columnIndex)}${rowIndex}`}
          value={value}
          formula={formula}
          onChange={handleInputChange}
          currentCell={currentCell}
          setCurrentCell={setCurrentCell}
        />
      </div>
    );
  };

  return (
    <>
      <div className={"w-full h-[10vh] bg-zinc-800 flex justify-space-between"}>
      <span>{currentCell}</span>
      <button
        onClick={handleAddRow}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Row After First Row
      </button>
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

export default App;
