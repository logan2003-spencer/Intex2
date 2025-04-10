// src/pages/CreateProfile.tsx
import React from "react";
import "../components/CreateProfile.css";
import RegisterForm from "../components/RegisterForm";

const CreateProfile: React.FC = () => {
  return (
    <div className="create-profile-wrapper">
      <div className="logo-container">
        <img src="/logo.png" alt="CineNiche Logo" className="logo" />
      </div>
      <div className="create-profile-page">
        <h2>Create Your Profile</h2>
        <RegisterForm />
      </div>
    </div>
  );
};

export default CreateProfile;
