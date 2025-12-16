import React from "react";

export default function ConsentScreen({ onAccept }) {
  return (
    <div className="consent-box">
      <h2>Consent Required</h2>
      <p>
        Before proceeding, please give consent to process your personal data
        as per DPDP Act 2023.
      </p>

      <button className="blue-btn" onClick={onAccept}>
        Agree & Continue
      </button>
    </div>
  );
}
