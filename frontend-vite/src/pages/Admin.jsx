import "./Admin.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    bookings: 0,
    revenue: 0,
    users: 0,
  });

  const [bookings, setBookings] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [cars, setCars] = useState([]);

  const [newCar, setNewCar] = useState({
    type: "",
    seats: "",
    transmission: "",
    price: "",
  });

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("session"));

    if (!session || !session.isLoggedIn || session.user.role !== "admin") {
      navigate("/login");
      return;
    }

    const bookingsData = JSON.parse(localStorage.getItem("bookings")) || [];
    const usersData = JSON.parse(localStorage.getItem("users")) || [];
    const driversData =
      JSON.parse(localStorage.getItem("drivers")) || [
        { id: 1, name: "Ravi", phone: "9876543210" },
        { id: 2, name: "Arjun", phone: "9123456780" },
      ];

    localStorage.setItem("drivers", JSON.stringify(driversData));

    const carsData = JSON.parse(localStorage.getItem("cars")) || [];

    const revenue = bookingsData.reduce(
      (sum, b) => sum + (b.amount || 0),
      0
    );

    setBookings(bookingsData);
    setDrivers(driversData);
    setCars(carsData);

    setStats({
      bookings: bookingsData.length,
      revenue,
      users: usersData.length,
    });
  }, []);

  // 🚗 Assign Driver
  const assignDriver = (bookingId, driverId) => {
    const updated = bookings.map((b) => {
      if (b.id === bookingId) {
        return {
          ...b,
          driver: drivers.find((d) => d.id === Number(driverId)),
          status: "Assigned",
        };
      }
      return b;
    });

    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
  };

  // 📊 Change Status
  const updateStatus = (bookingId, status) => {
    const updated = bookings.map((b) =>
      b.id === bookingId ? { ...b, status } : b
    );

    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
  };

  // ❌ Cancel
  const handleCancel = (id) => {
    updateStatus(id, "Cancelled");
  };

  // 🚗 Add Car
  const handleAddCar = () => {
    if (!newCar.type || !newCar.price) {
      alert("Fill all fields");
      return;
    }

    const updatedCars = [
      ...cars,
      { ...newCar, id: Date.now() },
    ];

    setCars(updatedCars);
    localStorage.setItem("cars", JSON.stringify(updatedCars));

    setNewCar({
      type: "",
      seats: "",
      transmission: "",
      price: "",
    });
  };

  return (
    <div className="admin-page">
      <h1>Admin Dashboard 👑</h1>

      {/* STATS */}
      <div className="admin-cards">
        <div className="card">
          <h2>Total Bookings</h2>
          <p>{stats.bookings}</p>
        </div>

        <div className="card">
          <h2>Total Revenue</h2>
          <p>₹{stats.revenue}</p>
        </div>

        <div className="card">
          <h2>Users</h2>
          <p>{stats.users}</p>
        </div>
      </div>

      {/* BOOKINGS TABLE */}
      <div className="table-container">
        <h2>All Bookings</h2>

        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Route</th>
              <th>Car</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Driver</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.user?.email}</td>
                <td>{b.from} → {b.to}</td>
                <td>{b.car?.type}</td>
                <td>₹{b.amount}</td>

                {/* STATUS */}
                <td>
                  <select
                    value={b.status}
                    onChange={(e) =>
                      updateStatus(b.id, e.target.value)
                    }
                  >
                    <option>Pending</option>
                    <option>Assigned</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                </td>

                {/* DRIVER */}
                <td>
                  <select
                    onChange={(e) =>
                      assignDriver(b.id, e.target.value)
                    }
                  >
                    <option>Select</option>
                    {drivers.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>

                  {b.driver && (
                    <p>{b.driver.name}</p>
                  )}
                </td>

                <td>
                  <button
                    className="cancel-btn"
                    onClick={() => handleCancel(b.id)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD CAR */}
      <div className="add-car">
        <h2>Add New Car</h2>

        <input
          placeholder="Type"
          value={newCar.type}
          onChange={(e) =>
            setNewCar({ ...newCar, type: e.target.value })
          }
        />

        <input
          placeholder="Seats"
          value={newCar.seats}
          onChange={(e) =>
            setNewCar({ ...newCar, seats: e.target.value })
          }
        />

        <input
          placeholder="Transmission"
          value={newCar.transmission}
          onChange={(e) =>
            setNewCar({
              ...newCar,
              transmission: e.target.value,
            })
          }
        />

        <input
          placeholder="Price"
          value={newCar.price}
          onChange={(e) =>
            setNewCar({ ...newCar, price: e.target.value })
          }
        />

        <button onClick={handleAddCar}>
          Add Car
        </button>
      </div>
    </div>
  );
};

export default Admin;