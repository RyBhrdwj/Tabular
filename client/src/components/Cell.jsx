import React from "react";

function Cell({ rowIndex, columnIndex, coordinate, value, onChange }) {
  return (
    <div>
      <input
        type="text"
        value={value}
        coordinate={coordinate}
        onChange={(e) => onChange(rowIndex, columnIndex, e.target.value)}
        onClick={(e) => console.log("Cell clicked:", coordinate)}
        className="bg-transparent text-white text-center w-full focus:outline-none"
      />
    </div>
  );
}

export default Cell;
