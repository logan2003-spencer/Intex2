import React, { useState } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | { code: string; description: string }[] | null>(null);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login(email, password);

    if (result.success) {
      setMessage("Login successful!");
      navigate("/dashboard"); // or wherever you want to go after login
    } else {
      setMessage(result.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded"
        required
      />
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        Login
      </button>
      {Array.isArray(message) ? (
  <ul className="text-sm text-red-600 space-y-1 text-center">
    {message.map((err, idx) => (
      <li key={idx}>{err.description}</li>
    ))}
  </ul>
) : (
  message && <p className="text-sm text-red-600 text-center">{message}</p>
)}

    </form>
  );
};

export default LoginForm;
