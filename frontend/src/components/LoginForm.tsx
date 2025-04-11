// src/components/LoginForm.tsx
import React, { useState } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";


const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<
    string | { code: string; description: string }[] | null
  >(null);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login(email, password);

    if (result.success) {
      setMessage("Login successful!");
      navigate("/home"); // or wherever you want to go after login
    } else {
      setMessage(result.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleLogin} className="login-form">
      <h2>Login to CineNiche</h2>
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>

      {Array.isArray(message) ? (
        <ul className="error-message">
          {message.map((err, idx) => (
            <li key={idx}>{err.description}</li>
          ))}
        </ul>
      ) : (
        message && <p className="error-message">{message}</p>
      )}
    </form>
  );
};

export default LoginForm;
