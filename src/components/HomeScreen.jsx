import React from "react";

export default function HomeScreen({ onStart }) {
  return (
    <div className="center-screen">
      <h1>FINAI – AI Loan Assistant</h1>
      <button className="blue-btn" onClick={onStart}>
        Ask FINAI
      </button>
    </div>
  );
}
