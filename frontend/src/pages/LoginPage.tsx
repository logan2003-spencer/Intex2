<<<<<<< HEAD
// src/pages/LoginPage.tsx
import React from "react";
import "../components/LoginPage.css";
import LoginForm from "../components/LoginForm";
=======
import React from "react"; 
import { useNavigate } from "react-router-dom"; 
import "../components/LoginPage.css"; 
import LoginForm from "../components/LoginForm"; 
>>>>>>> 424cb9e43b34832028e833d50bca331b3b67f0ef

const LoginPage: React.FC = () => {
  const navigate = useNavigate(); 

  return (
<<<<<<< HEAD
    <div className="login-page-container">
      <div className="login-box">
=======
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
>>>>>>> 424cb9e43b34832028e833d50bca331b3b67f0ef
        <h1 className="login-title">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
