// src/components/Table.jsx
import React from "react";
import "../styles/Admin.css";

/**
 * Reusable Admin Table Component
 * columns = [{ key: "name", label: "Name" }]
 * data = [{ name: "Yoga", price: 250 }]
 * actions = (row) => JSX buttons
 */
export default function Table({ columns = [], data = [], actions }) {
  if (!data.length) {
    return <p style={{ marginTop: "20px" }}>No data available.</p>;
  }

  return (
    <div className="table-container">
      <table className="admin-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            {actions && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {columns.map((col) => (
                <td key={col.key}>
                  {row[col.key] !== undefined ? row[col.key] : "—"}
                </td>
              ))}
              {actions && <td>{actions(row)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
