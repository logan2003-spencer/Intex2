// src/pages/LoginPage.tsx
import React from "react"; // Import React
import "../components/LoginPage.css"; 
import LoginForm from "../components/LoginForm"; // adjust the path if needed

const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
