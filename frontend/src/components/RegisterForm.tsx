import React, { useState } from "react";
import { register } from "../services/auth";
import { useNavigate } from "react-router-dom";

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [age, setAge] = useState<number>();
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("User");
  const [message, setMessage] = useState<
    string | { code: string; description: string }[] | null
  >(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await register({
      email,
      password,
      fullName,
      phoneNumber,
      city,
      state,
      zipCode,
      age,
      gender,
      role,
    });

    setMessage(result.message || "Registration failed");
    if (result.success) navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <input
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <input
        placeholder="State"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      <input
        placeholder="Zip Code"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
      />
      <input
        placeholder="Age"
        type="number"
        value={age || ""}
        onChange={(e) => setAge(parseInt(e.target.value))}
      />
      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="">Select Gender</option>
        <option value="Female">Female</option>
        <option value="Male">Male</option>
        <option value="Other">Other</option>
      </select>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="User">User</option>
        <option value="Admin">Admin</option>
      </select>
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded"
      >
        Register
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

export default RegisterForm;
