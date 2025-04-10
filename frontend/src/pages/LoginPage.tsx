<<<<<<< HEAD
import React from "react"; 
import { useNavigate } from "react-router-dom"; 
import "../components/LoginPage.css"; 
import LoginForm from "../components/LoginForm"; 

const LoginPage: React.FC = () => {
  const navigate = useNavigate(); 

  return (
    <div className="login-page">
      <header >
        <div className="logo">CineNiche</div>
        <nav>
          <button className="sign-in-btn" onClick={() => navigate("/create-profile")}>
            Create Profile
          </button>
        </nav>
      </header>

      <div className="login-form-container">
        <h1 className="login-title">Login</h1>
=======
// src/pages/LoginPage.tsx
import React from "react"; // Import React
import "../components/LoginPage.css"; 
import LoginForm from "../components/LoginForm"; // adjust the path if needed

const LoginPage: React.FC = () => {
  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
>>>>>>> 9290b3d5fd0f6200094209f2f352458deae07589
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
