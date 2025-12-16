import React, { useEffect } from "react";

export default function LoadingScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => onFinish(), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "white"
    }}>
      <h2 style={{ fontSize: "22px", marginBottom: "15px" }}>FINAI</h2>
      <p>Powered by Salesforce Agentic AI</p>
      <div className="loader"></div>
    </div>
  );
}
