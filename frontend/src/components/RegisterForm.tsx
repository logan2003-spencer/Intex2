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
    <form onSubmit={handleSubmit} className="create-profile-form">
      <div className="form-group">
        <input
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <input
          name="fullName"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          name="phoneNumber"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>

      <div className="form-group">
        <input
          name="city"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          name="state"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </div>

      <div className="form-group">
        <input
          name="zipCode"
          placeholder="Zip Code"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
        <input
          name="age"
          type="number"
          placeholder="Age"
          value={age || ""}
          onChange={(e) => setAge(parseInt(e.target.value))}
        />
      </div>

      <div className="form-group">
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
      </div>

      <button type="submit">Register</button>

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

export default RegisterForm;
