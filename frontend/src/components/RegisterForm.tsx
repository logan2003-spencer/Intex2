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
  const [error, setError] = useState("");
  const [role] = useState("User");
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
    <><form onSubmit={handleSubmit} className="create-profile-form">
      <div className="form-group">
        <input
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required />
      </div>

      <div className="form-group">
        <input
          name="fullName"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => {
            const input = e.target.value;
            setFullName(input);

            const nameParts = input.trim().split(" ");
            const nameRegex = /^[A-Za-z]+$/;

            const isValid = nameParts.length === 2 &&
              nameParts.every((part) => nameRegex.test(part));

            if (!isValid) {
              setError("Please enter a valid name (first and last, letters only).");
            } else {
              setError("");
            }
          } }
          onBlur={() => {
            const nameParts = fullName.trim().split(" ");
            if (nameParts.length === 2) {
              const capitalized = nameParts
                .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
                .join(" ");
              setFullName(capitalized);
            }
          }}
          required />
    {error && <span className="tooltip-error">{error}</span>}
  </div>


  <div className="form-group">
  <input
    name="phoneNumber"
    placeholder="Phone Number"
    value={phoneNumber}
    onChange={(e) => {
      const input = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
      if (input.length <= 10) {
        setPhoneNumber(input);
      }
    }}
    onBlur={() => {
      const formatted = phoneNumber
        .replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'); // Format as 801-444-5555
      setPhoneNumber(formatted);
    }}
    required
  />
  {phoneNumber.length !== 12 && phoneNumber.length > 0 && (
    <span className="tooltip-error">Please enter a valid phone number (10 digits only).</span>
  )}
</div>



<div className="form-group">
  {/* City Input */}
  <input
    name="city"
    placeholder="City"
    value={city}
    onChange={(e) => {
      const input = e.target.value.replace(/[^A-Za-z]/g, ''); // Only allow letters
      setCity(input);
    }}
    onBlur={() => {
      // Capitalize the first letter and make the rest lowercase
      const capitalizedCity = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
      setCity(capitalizedCity);
    }}
    required
  />
  {/* State Dropdown */}
  <select
    name="state"
    value={state}
    onChange={(e) => setState(e.target.value)}
    required
  >
    <option value="">Select a state</option>
    {['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'].map((stateName) => (
      <option key={stateName} value={stateName}>{stateName}</option>
    ))}
  </select>
  {/* Error Messages */}
  {city && city.length > 0 && !/^[A-Za-z]+$/.test(city) && (
    <span className="tooltip-error">Please enter a valid city (letters only).</span>
  )}
  {state && state.length > 0 && state === '' && (
    <span className="tooltip-error">Please select a valid state.</span>
  )}
</div>




      <div className="form-group">
        <input
          name="zipCode"
          placeholder="Zip Code"
          value={zipCode}
          onChange={(e) => {
            const input = e.target.value.replace(/[^0-9]/g, ''); // Only allow numbers
            if (input.length <= 5) {
              setZipCode(input); // Set the zip code value if it's 5 digits or less
            }
          }}
          required
        />
        {zipCode.length !== 5 && zipCode.length > 0 && (
          <span className="tooltip-error">Please enter a valid 5-digit zip code.</span>
        )}
      </div>


      <div className="form-group">
        <input
          name="age"
          type="number"
          placeholder="Age"
          value={age || ""}
          onChange={(e) => setAge(parseInt(e.target.value))} />
      </div>
      <div className="form-group">
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
          <option value="Other">Other</option>
        </select>

        {/* <select value={role} onChange={(e) => setRole(e.target.value)}>
      <option value="User">User</option>
      <option value="Admin">Admin</option>
    </select> */}
      </div>
      <button type="submit">Register</button>
    </form>

    {Array.isArray(message) ? (
      <ul className="error-message">
        {message.map((err, idx) => (
          <li key={idx}>{err.description}</li>
        ))}
      </ul>
    ) : (
      message && <p className="error-message">{message}</p>
    )}
  </>
  );
};

export default RegisterForm;
