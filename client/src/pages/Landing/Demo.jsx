import React, { useState, useEffect } from 'react';

const sampleData = [
  ['', 'A', 'B', 'C', 'D', 'E', 'F'],
  ['1', '125', '', '', '', '', ''],
  ['2', '', '', '', '', '', ''],
  ['3', '', '', '', '', '', ''],
  ['4', '', '', '', '', '625', ''],
  ['5', '', '', '', '', '', '33'],
  ['6', '', '', '', '', '', '']
];

function Demo() {
  const [selectedCell, setSelectedCell] = useState({ row: 1, col: 1 });
  const [animatedCells, setAnimatedCells] = useState(new Set());

  useEffect(() => {
    const interval = setInterval(() => {
      const filledCells = [
        { row: 1, col: 1 },
        { row: 4, col: 5 },
        { row: 5, col: 6 }
      ];
      const randomCell = filledCells[Math.floor(Math.random() * filledCells.length)];
      setAnimatedCells(new Set([`${randomCell.row}-${randomCell.col}`]));
      
      setTimeout(() => {
        setAnimatedCells(new Set());
      }, 1000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            See It In Action
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Experience the clean, intuitive interface that makes working with data effortless
          </p>
        </div>
        
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden shadow-2xl">
          {/* Header Bar */}
          <div className="bg-gray-800 px-6 py-4 border-b border-gray-700 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-white font-semibold text-lg">Tabular</span>
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-gray-400">Cell: A{selectedCell.row}</span>
                <span className="text-gray-400">Formula:</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded text-sm transition-colors">
                Add Row
              </button>
              <button className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded text-sm transition-colors">
                Add Column
              </button>
              <button className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded text-sm transition-colors">
                Save Sheet
              </button>
            </div>
          </div>
          
          {/* Spreadsheet Grid */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody>
                {sampleData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, colIndex) => {
                      const isHeader = rowIndex === 0 || colIndex === 0;
                      const isSelected = !isHeader && rowIndex === selectedCell.row && colIndex === selectedCell.col;
                      const cellKey = `${rowIndex}-${colIndex}`;
                      const isAnimated = animatedCells.has(cellKey);
                      
                      return (
                        <td
                          key={colIndex}
                          className={`
                            border border-gray-600 h-12 min-w-[80px] text-center relative
                            ${isHeader 
                              ? 'bg-gray-700 text-gray-300 font-semibold' 
                              : 'bg-gray-800/30 text-gray-200 hover:bg-gray-700/30 cursor-pointer'
                            }
                            ${isSelected ? 'bg-blue-600/20 border-blue-500' : ''}
                            ${isAnimated ? 'animate-pulse bg-green-500/20' : ''}
                            transition-all duration-200
                          `}
                          onClick={() => !isHeader && setSelectedCell({ row: rowIndex, col: colIndex })}
                        >
                          {cell && (
                            <span className={isAnimated ? 'text-green-300' : ''}>
                              {cell}
                            </span>
                          )}
                          {isSelected && (
                            <div className="absolute inset-0 border-2 border-blue-500 pointer-events-none" />
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-400">
            Interactive demo - Click on any cell to select it
          </p>
        </div>
      </div>
    </section>
  );
}

export default Demo;