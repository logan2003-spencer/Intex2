import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../components/CreateProfile.css";
const CreateProfile = () => {
  const location = useLocation();
  const { email } = location.state || { email: "" };  // Access the email from the passed state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: email,  // Pre-fill the email
    birthday: { month: "", day: "", year: "" },
    gender: "",
    city: "",
    state: "",
    zip: "",
  });
  useEffect(() => {
    // Set the email in the state if it was passed through location
    setFormData((prevData) => ({ ...prevData, email }));
  }, [email]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let formattedPhoneNumber = e.target.value.replace(/\D/g, "");
    if (formattedPhoneNumber.length <= 3) {
      formattedPhoneNumber = formattedPhoneNumber.replace(/(\d{0,3})/, "$1");
    } else if (formattedPhoneNumber.length <= 6) {
      formattedPhoneNumber = formattedPhoneNumber.replace(/(\d{3})(\d{0,3})/, "$1-$2");
    } else {
      formattedPhoneNumber = formattedPhoneNumber.replace(/(\d{3})(\d{3})(\d{0,4})/, "$1-$2-$3");
    }
    setFormData((prevData) => ({
      ...prevData,
      phoneNumber: formattedPhoneNumber,
    }));
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      birthday: { ...prevData.birthday, [name]: value },
    }));
  };
  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      gender: value,
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // Handle profile creation logic here
  };
  const renderYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= 1900; i--) {
      years.push(i);
    }
    return years.map((year) => (
      <option key={year} value={year}>
        {year}
      </option>
    ));
  };
  return (
    <div className="create-profile-page">
      <h2>Create Profile</h2>
      <form onSubmit={handleSubmit}>
        {/* First and Last Name in one line */}
        <div className="form-group">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* Phone Number and Email in one line */}
        <div className="form-group">
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handlePhoneNumberChange}
            maxLength={12}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* Birthday and Gender in one line */}
        <div className="form-group">
          <select
            name="month"
            value={formData.birthday.month}
            onChange={handleSelectChange}
            required
          >
            <option value="">Month</option>
            {["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"].map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          <select
            name="day"
            value={formData.birthday.day}
            onChange={handleSelectChange}
            required
          >
            <option value="">Day</option>
            {[...Array(31).keys()].map((day) => (
              <option key={day + 1} value={day + 1}>
                {day + 1}
              </option>
            ))}
          </select>
          <select
            name="year"
            value={formData.birthday.year}
            onChange={handleSelectChange}
            required
          >
            <option value="">Year</option>
            {renderYearOptions()}
          </select>
          <div className="gender">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleGenderChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleGenderChange}
              />
              Female
            </label>
          </div>
        </div>
        {/* Address in one line */}
        <div className="form-group">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleInputChange}
            required
          />
          
          <input
            type="text"
            name="zip"
            placeholder="Zip Code"
            value={formData.zip}
            onChange={handleInputChange}
            required
          />
          
            
        </div>
        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
};
export default CreateProfile;
