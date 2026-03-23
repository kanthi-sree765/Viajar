import { useLocation, useNavigate } from "react-router-dom";
import "./Success.css";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  return (
    <div className="success-page">
      <div className="success-card">

        <h1>🎉 Booking Confirmed!</h1>
        <p className="subtitle">
          Your ride has been successfully booked.
        </p>

        {/* 🚗 DETAILS */}
        <div className="trip-details">
          <h3>{data?.car?.type}</h3>

          <p className="route">
            {data?.from} → {data?.to}
          </p>

          <p className="date">{data?.date}</p>

          <div className="extra-info">
            <p>🚗 {data?.car?.seats} Seats</p>
            <p>⚙️ {data?.car?.transmission}</p>
            <p>👨‍✈️ Driver Assigned</p>
            <p>📞 Driver will contact you shortly</p>
          </div>

          <div className="price">
            ₹{data?.car?.price}
          </div>
        </div>

        {/* 🔥 BUTTON */}
        <div className="actions">
          <button onClick={() => navigate("/")}>
             Book Another Ride
          </button>
        </div>

      </div>
    </div>
  );
};

export default Success;