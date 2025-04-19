import React from "react";
import { useState } from "react";

/*
  Global State :
    currentCell 

  On click, set to focus -- update currentCell
  If focused, onClick, set to edit -- fetch formula || value and put in input box
  On change, update the value in the cell as local state
  On pressing Enter, update the value in cell and remove edit mode
  On pressing Esc, remove edit mode
  If in focus and not in edit mode, on pressing Esc, 
*/

// added formula as parameter to Cell component
function Cell({ rowIndex, columnIndex, coordinate, value, formula, onChange, currentCell, setCurrentCell }) {
  // In edit mode, place formula in input box
  // In view mode, place value in input box
  // Pressing enter, remove focus from input box and update value in cell

  const isCurrentCell = currentCell === coordinate;

  return (
      <input
        type="text"
        value={value}
        coordinate={coordinate}
        onChange={(e) => onChange(rowIndex, columnIndex, e.target.value)}
        className={
          [`${isCurrentCell ? 'bg-zinc-800 border-zinc-600' : 'bg-zinc-900 border-zinc-700'}`,
          "border bg-transparent text-white h-full text-center w-full focus:outline-none"].join(" ")
        }
      />
  );
}

export default Cell;
