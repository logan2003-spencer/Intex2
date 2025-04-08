// src/pages/PrivacyPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
const PrivacyPage: React.FC = () => {
 const navigate = useNavigate(); // Set up the navigate function
 // Handle the home button click
 const handleHomeClick = () => {
  navigate("/"); // Navigate to the home page
 };
 return (
  <div className="p-6 max-w-4xl mx-auto text-gray-800">
   <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
   <p className="mb-4">
    At CineNiche, we value your privacy and are committed to protecting your personal data. This privacy policy outlines how we collect, use, and protect your information in accordance with the General Data Protection Regulation (GDPR).
   </p>
   <p className="mb-4">
    When you create an account with CineNiche, we collect information such as your email address, name, and password. We also gather data on your viewing history, preferences, device and browser details, and your IP address to manage content availability based on your region. Payment details are securely processed by trusted third-party payment providers.
   </p>
   <p className="mb-4">
    Your information helps us deliver a personalized streaming experience. We use this data to recommend content, process payments, improve our platform, send service-related updates, and fulfill any legal obligations.
   </p>
   <p className="mb-4">
    Under the GDPR, you have several important rights. These include the right to access your data, request corrections to inaccurate information, and ask for your data to be deleted (commonly known as the "right to be forgotten"). You can also withdraw consent for data use, object to certain types of processing, or request a copy of your data to transfer to another service.
   </p>
   <p className="mb-4">
    To enhance your experience, CineNiche uses cookies to remember your preferences, analyze usage patterns, and serve relevant content. You may manage your cookie preferences at any time through your browser settings or our cookie consent banner.
   </p>
   <p className="mb-4">
    We implement industry-standard security measures to keep your information safe. However, no system is entirely immune to risks. We encourage you to use a strong, unique password and to safeguard your account information.
   </p>
   <p className="mb-4">
    If you have any questions about our privacy practices or wish to exercise your data rights, please don’t hesitate to reach out to us at:
   </p>
   <p>
    <strong>Email:</strong> privacy@cineniche.com<br />
    <strong>Address:</strong> 123 Stream Lane, Hollywood, CA, 90028
   </p>
   {/* Home Button */}
   
  </div>
 );
};
export default PrivacyPage;





