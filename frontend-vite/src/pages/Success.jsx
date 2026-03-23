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

        <p>Your ride has been successfully booked.</p>

        <div className="trip-details">
          <h3>{data?.car?.type}</h3>
          <p>{data?.from} → {data?.to}</p>
          <p>{data?.date}</p>
          <p><strong>₹{data?.car?.price}</strong></p>
        </div>

        <button onClick={() => navigate("/")}>
          Book Another Ride
        </button>
      </div>
    </div>
  );
};

export default Success;