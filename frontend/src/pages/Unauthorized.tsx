import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();



  return (
    <div style={{ textAlign: "center", paddingTop: "80px" }}>
      <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>
      <p className="text-lg text-gray-700 mb-6">
        You must be logged in with the correct permissions to view this page.
      </p>
      <button
  onClick={() => navigate("/home")}  // Or navigate("/") for the homepage
  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
>
  ← Go Back
</button>

    </div>
  );
};

export default Unauthorized;
