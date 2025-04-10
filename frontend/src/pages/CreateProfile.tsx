// src/pages/CreateProfile.tsx
import React from "react";
import "../components/CreateProfile.css";
import RegisterForm from "../components/RegisterForm";
import logo from "../img/logo.png";


const CreateProfile: React.FC = () => {
  return (
    <div className="create-profile-wrapper">
      <div className="logo-container">
      <img src={logo} alt="CineNiche Logo" className="logo" />
      </div>
      <div className="create-profile-page">
        <h2>Create Your Profile</h2>
        <RegisterForm />
      </div>
    </div>
  );
};

export default CreateProfile;
