import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Booking.css";

const Booking = () => {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();

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

  // 💰 REALISTIC PRICING MODEL
  const baseFare = Math.round(data?.car?.price * 0.6);
  const distanceCharge = Math.round(data?.car?.price * 0.25);
  const gst = Math.round(data?.car?.price * 0.15);

  const includedKm = 300;
  const extraPerKm = data?.car?.type === "Basic" ? 12 :
                     data?.car?.type === "SUV" ? 15 : 18;

  return (
    <div className="booking-page">
      <h1>Confirm Your Booking</h1>

      <div className="booking-content">

        {/* LEFT: DETAILS */}
        <div className="summary-card">

          <h2>{data?.car?.type}</h2>

          <p className="route">
            {data?.from} → {data?.to}
          </p>

          <p className="date">{data?.date}</p>

          {/* 🚗 CAR DETAILS */}
          <div className="car-info">
            <p>🚗 {data?.car?.seats} Seats</p>
            <p>⚙️ {data?.car?.transmission}</p>
            <p>👨‍✈️ Driver Included</p>
            <p>📍 {includedKm} kms included</p>
            <p>➕ Extra ₹{extraPerKm}/km after limit</p>
          </div>

          {/* 💰 PRICE BREAKDOWN */}
          <div className="price-box">

            <div className="price-row">
              <span>Base Fare</span>
              <span>₹{baseFare}</span>
            </div>

            <div className="price-row">
              <span>Distance Charges</span>
              <span>₹{distanceCharge}</span>
            </div>

            <div className="price-row">
              <span>GST (15%)</span>
              <span>₹{gst}</span>
            </div>

            <hr />

            <div className="price-total">
              <span>Total Amount</span>
              <span>₹{data?.car?.price}</span>
            </div>

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