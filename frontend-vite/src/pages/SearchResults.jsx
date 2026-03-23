import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./SearchResults.css";

const cars = [
  {
    type: "Basic",
    seats: 4,
    transmission: "Manual",
    price: 1500,
    icon: "🚗",
  },
  {
    type: "SUV",
    seats: 6,
    transmission: "Automatic",
    price: 3500,
    icon: "🚙",
  },
  {
    type: "Minivan",
    seats: 7,
    transmission: "Automatic",
    price: 4000,
    icon: "🚐",
  },
];

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  const [selectedCar, setSelectedCar] = useState(cars[1]); // default SUV

  const handleBooking = () => {
    navigate("/booking", {
      state: {
        ...data,
        car: selectedCar,
      },
    });
  };

  return (
    <div className="selection-page">
      
      {/* Title */}
      <h1>Choose a Car</h1>

      {/* Route Info (small detail – makes it real) */}
      {data && (
        <p style={{ marginBottom: "20px", color: "#555" }}>
          {data.from} → {data.to} | {data.date}
        </p>
      )}

      {/* Car Options */}
      <div className="car-options">
        {cars.map((car, index) => (
          <div
            key={index}
            className={`car-option ${
              selectedCar.type === car.type ? "active" : ""
            }`}
            onClick={() => setSelectedCar(car)}
          >
            <span style={{ fontSize: "26px" }}>{car.icon}</span>
            <p>{car.type}</p>
          </div>
        ))}
      </div>

      {/* Selected Car Details */}
      <div className="car-details">
        <h2>{selectedCar.type}</h2>
        <p>{selectedCar.seats} Seats</p>
        <p>{selectedCar.transmission}</p>
        <h3>₹{selectedCar.price}</h3>
      </div>

      {/* Button */}
      <button className="rent-btn" onClick={handleBooking}>
        Book Now
      </button>
    </div>
  );
};

export default SearchResults;