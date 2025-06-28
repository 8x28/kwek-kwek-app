import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const MAX_USERS = 100;
let registeredUsers = 0;

function App() {
  const [nickname, setNickname] = useState("");
  const [socialType, setSocialType] = useState("Tiktok");
  const [handle, setHandle] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [registrationNumber, setRegistrationNumber] = useState(null);

  const handleSubmit = async () => {
    if (registeredUsers >= MAX_USERS) {
      alert("Registration is full. Only 100 users can register.");
      return;
    }

    const templateParams = {
      nickname,
      socialType,
      handle,
    };

    try {
      await emailjs.send(
        "your_service_id",     // Replace with your actual service ID
        "your_template_id",    // Replace with your template ID
        templateParams,
        "your_public_key"      // Replace with your public key from EmailJS
      );
      registeredUsers++;
      setRegistrationNumber(registeredUsers);
      setSubmitted(true);
    } catch (error) {
      alert("Something went wrong. Try again.");
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", paddingTop: "50px" }}>
      {!submitted ? (
        <>
          <input
            type="text"
            placeholder="Your Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <select
            value={socialType}
            onChange={(e) => setSocialType(e.target.value)}
            style={{ width: "100%", marginBottom: "10px" }}
          >
            <option value="Tiktok">Tiktok</option>
            <option value="Facebook">Facebook</option>
            <option value="Twitter">Twitter</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            placeholder="Your Social Media Handle"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <button onClick={handleSubmit} style={{ width: "100%" }}>
            Submit
          </button>
        </>
      ) : (
        <div style={{ textAlign: "center" }}>
          <p>Thank you for registering!</p>
          <p>Your registration number is: <strong>{registrationNumber}</strong></p>
        </div>
      )}
    </div>
  );
}

export default App;
