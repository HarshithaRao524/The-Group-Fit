import React from "react";
import "../styles/Admin.css";

export default function ConfirmDialog({ 
  open, 
  title = "Confirm Action", 
  message = "Are you sure?", 
  onConfirm, 
  onCancel 
}) {
  if (!open) return null;

  return (
    <div className="confirm-dialog-overlay">
      <div className="confirm-dialog">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="confirm-buttons">
          <button className="btn-confirm" onClick={onConfirm}>
            Yes
          </button>
          <button className="btn-cancel" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}
