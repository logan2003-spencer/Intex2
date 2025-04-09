import React, { useEffect, useState } from "react";

const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#1a1a1a",
        color: "white",
        padding: "1rem",
        zIndex: 1000,
        fontSize: "0.875rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 -2px 10px rgba(0,0,0,0.3)",
      }}
    >
      <p style={{ textAlign: "center", maxWidth: "600px" }}>
        We use cookies to enhance your experience.{" "}
        <a href="/privacy" style={{ color: "#4dabf7", textDecoration: "underline" }}>
          Learn more
        </a>
      </p>
      <div style={{ display: "flex", gap: "0.75rem" }}>
        <button
          onClick={handleDecline}
          style={{
            backgroundColor: "#555",
            color: "white",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
