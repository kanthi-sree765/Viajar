import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    if (!formData.from || !formData.to || !formData.date) {
      alert("Please fill all fields");
      return;
    }

    navigate("/results", { state: formData });
  };

  return (
    <div className="home">
      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">ViAjar</h2>
        <button 
            className="contact-btn"
            onClick={() => navigate("/contact")}
         >
            Contact
        </button>
      </nav>

      {/* Hero */}
      <div className="hero">
        <h1>Book Your Ride Anytime 🚗</h1>
        <p>Safe. Affordable. Reliable travel across cities.</p>

        {/* Search Box */}
        <div className="search-card">
          <input
            type="text"
            name="from"
            placeholder="Pickup Location"
            value={formData.from}
            onChange={handleChange}
          />

          <input
            type="text"
            name="to"
            placeholder="Drop Location"
            value={formData.to}
            onChange={handleChange}
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />

          <button onClick={handleSearch}>Search Cars</button>
        </div>
      </div>
    </div>
  );
};

export default Home;