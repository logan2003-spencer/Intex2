// src/pages/LoginPage.tsx
import React from "react"; // Import React
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../components/LoginPage.css"; 
import LoginForm from "../components/LoginForm"; // adjust the path if needed
const LoginPage: React.FC = () => {
  const navigate = useNavigate(); // Define navigate using useNavigate
  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <header className="header">
        <div className="logo">CineNiche</div>
        <nav>
          <button className="sign-in-btn" onClick={() => navigate("/create-profile")}>
            Create Profile
          </button>
        </nav>
      </header>
      <div className="max-w-md w-full bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
