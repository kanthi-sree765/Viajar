import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

const handleSignup = () => {
  if (!form.name || !form.email || !form.password) {
    alert("Fill all fields");
    return;
  }

  const existingUsers =
    JSON.parse(localStorage.getItem("users")) || [];

  const userExists = existingUsers.find(
    (u) => u.email.toLowerCase() === form.email.toLowerCase()
  );

  if (userExists) {
    alert("User already exists. Please login.");
    return;
  }

  const newUser = {
    ...form,
    role: "user",
  };

  const updatedUsers = [...existingUsers, newUser];

  localStorage.setItem("users", JSON.stringify(updatedUsers));

  alert("Account created successfully ✅");
  navigate("/login");
};

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create Account 🚀</h1>
        <p>Start your journey with Viajar</p>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button onClick={handleSignup}>Signup</button>

        <p className="switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;