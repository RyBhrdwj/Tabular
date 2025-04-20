import React from "react";
import { use } from "react";
import { useState, useEffect } from "react";

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
function Cell({
  rowIndex,
  columnIndex,
  coordinate,
  value,
  formula,
  onChange,
  currentCell,
  setCurrentCell,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [cellValue, setCellValue] = useState("");

  function onClick() {
    if (currentCell != coordinate) {
      setCurrentCell(coordinate);
    } else if (!isEditing) {
      setIsEditing(true);
      setCellValue(formula || value);
    }
  }

  function onKeyDown(e) {
    if (e.key === "Enter") {
      submitValue();
      setIsEditing(false);
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setIsFocused(false);
      setCellValue(value);
    }
  }

  function submitValue() {
    if (cellValue[0] === "=" && cellValue.length > 1) {
      onChange(rowIndex, columnIndex, "#FORMULA", cellValue);
      setCellValue(value);
    } else {
      onChange(rowIndex, columnIndex, cellValue);
    }
  }

  function onBlur() {
    setIsEditing(false);
    setCurrentCell(null);

    submitValue();
  }

  useEffect(() => {
    if (coordinate === "A1") console.log("A1", currentCell === coordinate);
    setIsFocused(currentCell === coordinate);
    setCellValue(value);
  }, [value, currentCell, coordinate]);

  return (
    <input
      type="text"
      value={cellValue}
      readOnly={!isEditing}
      onClick={onClick}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      coordinate={coordinate}
      onChange={(e) => setCellValue(e.target.value)}
      className={[
        `${
          isFocused
            ? "bg-zinc-800 border-zinc-600"
            : "bg-zinc-900 border-zinc-700"
        }`,
        "border bg-transparent text-white h-full text-center w-full focus:outline-none",
      ].join(" ")}
    />
  );
}

export default Cell;
