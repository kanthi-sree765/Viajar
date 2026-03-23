import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Booking.css";

const Booking = () => {
  const location = useLocation();
  const data = location.state;
  const navigate=useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    pickup: data?.from || "",
    drop: data?.to || "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!form.name || !form.phone) {
      alert("Please fill all details");
      return;
    }

    navigate("/success", {
    state: {
        ...data,
        car: data?.car,
    },
    });
  };

  return (
    <div className="booking-container">
      <h1>Confirm Your Booking</h1>

      <div className="booking-content">
        
        {/* LEFT: SUMMARY */}
        <div className="summary-card">
          <h2>{data?.car?.type}</h2>
          <p className="route">
            {data?.from} → {data?.to}
          </p>
          <p className="date">{data?.date}</p>

          <div className="price-box">
            ₹{data?.car?.price}
          </div>
        </div>

        {/* RIGHT: FORM */}
        <div className="form-card">
          <h3>Passenger Details</h3>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
          />

          <input
            type="text"
            name="pickup"
            placeholder="Pickup Location"
            value={form.pickup}
            onChange={handleChange}
          />

          <input
            type="text"
            name="drop"
            placeholder="Drop Location"
            value={form.drop}
            onChange={handleChange}
          />

          <button onClick={handleSubmit}>
            Confirm Booking
          </button>
        </div>

      </div>
    </div>
  );
};

export default Booking;