import React from "react";

export default function Square({ className, onClick, value }) {
  return (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  );
}
