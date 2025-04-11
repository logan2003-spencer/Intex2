import React from "react";
import { useNavigate } from "react-router-dom";
import "../components/LoginPage.css";
import LoginForm from "../components/LoginForm";
import { Link } from 'react-router-dom';


const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="login-wrapper">
      <div className="login-topbar">
        <Link to="/" className="login-logo">
        CineNiche
      </Link>
        <button
          className="create-profile-btn"
          onClick={() => navigate("/create-profile")}
        >
          Create Profile
        </button>
      </div>

      <div className="login-form-container">
        <div className="login-card">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
