import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./SearchResults.css";


const baseCars = [
  {
    name: "WagonR",
    seats: 4,
    transmission: "Manual",
    basePrice: 4500,
    image: "https://img.icons8.com/color/512/car--v1.png",
  },
  {
    name: "Dzire",
    seats: 4,
    transmission: "Automatic",
    basePrice: 5000,
    image: "https://img.icons8.com/color/512/sedan.png",
  },
  {
    name: "Ertiga",
    seats: 6,
    transmission: "Automatic",
    basePrice: 7000,
    image: "https://cdn-icons-png.flaticon.com/512/3774/3774278.png",
  },
];


const SearchResults = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [cars, setCars] = useState([]);

  const dynamicPrice = (base) => {
    let price = base;

    const day = new Date(state?.date).getDay();
    if (day === 0 || day === 6) price *= 1.2;

    const hour = parseInt(state?.time?.split(":")[0] || 10);
    if (hour >= 8 && hour <= 11) price *= 1.1;

    price *= 1 + Math.random() * 0.1;

    return Math.round(price);
  };

  useEffect(() => {
    const updated = baseCars.map((car) => ({
      ...car,
      price: dynamicPrice(car.basePrice),
      oldPrice: Math.round(car.basePrice * 1.3),
    }));
    setCars(updated);
  }, []);

  return (
    <div className="results-page">

      {/* 🔝 TOP BAR */}
      <div className="top-bar">
        <div>
          <h2>{state?.from} → {state?.to}</h2>
          <p>{state?.date} | {state?.time}</p>
        </div>

        <button onClick={() => navigate("/")}>
          Modify Search
        </button>
      </div>

      {/* 🚗 CAR LIST */}
      <div className="car-list">
        {cars.map((car, i) => (
          <div key={i} className="car-card">

            {/* LEFT */}
            <div className="car-left">
              <img src={car.image} alt="car" />

              <div>
                <h3>{car.name}</h3>
                <p>{car.seats} Seats • AC • {car.transmission}</p>

                <div className="features">
                  <span>✔ Driver included</span>
                  <span>✔ Free cancellation</span>
                  <span>✔ 300 kms included</span>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="car-right">
              <span className="discount">10% OFF</span>

              <h2>₹{car.price}</h2>
              <p className="old">₹{car.oldPrice}</p>
              <small>+ taxes & charges</small>

              <button
                onClick={() =>
                  navigate("/booking", { state: { ...state, car } })
                }
              >
                SELECT CAR
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;