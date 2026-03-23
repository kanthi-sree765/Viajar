import { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) {
      alert("Please fill all fields");
      return;
    }

    alert("Message sent successfully ✅");
  };

  return (
    <div className="contact-page">
      <h1>Get in Touch</h1>
      <p className="subtitle">We’d love to hear from you</p>

      <div className="contact-content">

        {/* LEFT */}
        <div className="contact-info">
          <h2>Contact Information</h2>

          <div className="info-box">
            <p>📞 +91 9876543210</p>
            <p>📧 support@viajar.com</p>
            <p>📍 Hubli, Karnataka</p>
          </div>

          <p className="small-text">
            Our team usually responds within a few hours.
          </p>
        </div>

        {/* RIGHT */}
        <div className="contact-form">
          <h2>Send Message</h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
          />

          <textarea
            name="message"
            placeholder="Write your message..."
            onChange={handleChange}
          />

          <button onClick={handleSubmit}>
            Send Message
          </button>
        </div>

      </div>
    </div>
  );
};

export default Contact;