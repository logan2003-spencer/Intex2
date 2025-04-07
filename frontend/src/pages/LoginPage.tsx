// src/pages/LoginPage.tsx
import React, { useState } from "react";
import "../components/LoginPage.css"; 
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    // You can handle authentication here
  };
  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};
export default LoginPage;
