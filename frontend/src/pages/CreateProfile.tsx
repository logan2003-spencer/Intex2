// src/pages/CreateProfile.tsx
import React from "react";
import RegisterForm from "../components/RegisterForm"; // Adjust path if needed

const CreateProfile: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Create Your Profile</h1>
        <RegisterForm />
      </div>
    </div>
  );
};

export default CreateProfile;
