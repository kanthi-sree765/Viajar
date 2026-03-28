import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    time: "",
    tripType: "oneway",
  });

  const [returnDate, setReturnDate] = useState("");
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);

  const fetchLocations = async (query, type) => {
    if (!query) return;

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=6&q=${query}`
      );
      const data = await res.json();

      const filtered = data
        .filter((p) => p.address?.country === "India")
        .slice(0, 5);

      if (type === "from") setFromSuggestions(filtered);
      else setToSuggestions(filtered);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    if (name === "from") fetchLocations(value, "from");
    if (name === "to") fetchLocations(value, "to");
  };

  const formatPlace = (place) => {
    const addr = place.address;
    const name =
      addr?.railway ||
      addr?.airport ||
      addr?.city ||
      addr?.town ||
      addr?.village;

    return `${name}, ${addr?.state || ""}`;
  };

  const selectLocation = (place, type) => {
    setFormData({
      ...formData,
      [type]: formatPlace(place),
    });

    if (type === "from") setFromSuggestions([]);
    else setToSuggestions([]);
  };

  const handleSearch = () => {
    const { from, to, date, time } = formData;

    if (!from || !to || !date || !time) {
      alert("Please fill all fields");
      return;
    }

    if (from === to) {
      alert("Pickup and Drop cannot be same");
      return;
    }

    navigate("/results", { state: { ...formData, returnDate } });
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

        {/* 🚗 PREMIUM ANIMATION */}
        <div className="animation-container">
            <div className="road"></div>

            <div className="car">
                <div className="car-top"></div>
                <div className="car-body"></div>
                <div className="wheel front"></div>
                <div className="wheel back"></div>
            </div>
         </div>

        {/* Search Card */}
        <div className="search-card">

          <select
            name="tripType"
            value={formData.tripType}
            onChange={handleChange}
          >
            <option value="oneway">One Way</option>
            <option value="roundtrip">Round Trip</option>
          </select>

          {/* FROM */}
          <div className="input-group">
            <input
              type="text"
              name="from"
              placeholder="Pickup Location"
              value={formData.from}
              onChange={handleChange}
            />
            {fromSuggestions.length > 0 && (
              <div className="suggestion-box">
                {fromSuggestions.map((place, i) => (
                  <div
                    key={i}
                    className="suggestion-item"
                    onClick={() => selectLocation(place, "from")}
                  >
                    <span className="icon">📍</span>
                    <div>
                      <strong>{formatPlace(place)}</strong>
                      <p>{place.display_name}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* TO */}
          <div className="input-group">
            <input
              type="text"
              name="to"
              placeholder="Drop Location"
              value={formData.to}
              onChange={handleChange}
            />
            {toSuggestions.length > 0 && (
              <div className="suggestion-box">
                {toSuggestions.map((place, i) => (
                  <div
                    key={i}
                    className="suggestion-item"
                    onClick={() => selectLocation(place, "to")}
                  >
                    <span className="icon">📍</span>
                    <div>
                      <strong>{formatPlace(place)}</strong>
                      <p>{place.display_name}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* DATE */}
          <input
            type="date"
            name="date"
            value={formData.date}
            min={new Date().toISOString().split("T")[0]}
            onChange={handleChange}
          />

          {/* RETURN DATE */}
          {formData.tripType === "roundtrip" && (
            <input
              type="date"
              value={returnDate}
              min={formData.date}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          )}

          {/* TIME */}
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
          />

          <button onClick={handleSearch}>Search Cars</button>
        </div>
      </div>
    </div>
  );
};

export default Home;