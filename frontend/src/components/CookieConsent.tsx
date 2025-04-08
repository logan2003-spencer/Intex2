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
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50 text-sm flex flex-col sm:flex-row justify-between items-center">
      <p className="text-center sm:text-left mb-2 sm:mb-0">
        We use cookies to enhance your experience.{" "}
        <a href="/privacy" className="underline text-blue-300">Learn more</a>
      </p>
      <div className="flex gap-2 mt-2 sm:mt-0">
        <button
          onClick={handleDecline}
          className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-white"
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
