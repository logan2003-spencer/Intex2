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
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
