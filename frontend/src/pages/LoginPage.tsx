import React from "react";
import { useNavigate } from "react-router-dom";
import "../components/LoginPage.css";
import LoginForm from "../components/LoginForm";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="login-wrapper">
      <div className="login-header">
        <div className="login-logo">CineNiche</div>
        <button
          className="create-profile-btn"
          onClick={() => navigate("/create-profile")}
        >
          Create Profile
        </button>
      </div>

      <div className="login-form-container">
        <h1 className="login-title">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
