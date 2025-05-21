import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );
      console.log(res.data);
      navigate("/home");
    } catch (err) {
      console.error("Registration failed", err);
      alert("Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded shadow-md w-80"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-semibold mb-4 text-center">Register</h2>
        <input
          name="name"
          onChange={handleChange}
          className="input-style"
          type="text"
          placeholder="Name"
          required
        />
        <input
          name="email"
          onChange={handleChange}
          className="input-style"
          type="email"
          placeholder="Email"
          required
        />
        <input
          name="password"
          onChange={handleChange}
          className="input-style"
          type="password"
          placeholder="Password"
          required
        />
        <button className="btn-primary" type="submit">
          REGISTER
        </button>
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
