"use client";
import React, { FC } from "react";

interface TableProps {
  selectedValues: Record<string, any>;
  handleReset: () => void;
}

const Table: FC<TableProps> = ({ selectedValues, handleReset }) => {
  return (
    <div className="m-8 flex flex-col">
      <button
        onClick={handleReset}
        className="bg-gray-500 shadow-md px-6 py-2 rounded-lg mb-8 self-start"
      >
        Reset
      </button>
      <table className="w-full">
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(selectedValues).map(([key, value]) => (
            <tr key={key}>
              <td className="text-center py-2">{key}</td>
              <td className="text-center py-2">{value.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
