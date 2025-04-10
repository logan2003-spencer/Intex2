// pages/Unauthorized.tsx
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold mb-4">🚫 Access Denied</h1>
      <p className="mb-6">You must be logged in to view this page.</p>
      <Link to="/" className="text-blue-500 underline">← Go Back</Link>
    </div>
  );
};

export default Unauthorized;
