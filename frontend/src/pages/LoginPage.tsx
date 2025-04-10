// src/pages/LoginPage.tsx
import React from "react";
import "../components/LoginPage.css";
import LoginForm from "../components/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <div className="login-page-container">
      <div className="login-box">
        <h1 className="login-title">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
