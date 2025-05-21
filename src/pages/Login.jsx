import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://backend-pre8.onrender.com/api/auth/login",
        form
      );
      console.log(res.data);

      localStorage.setItem("token", res.data.token);

      navigate("/home");
    } catch (err) {
      console.error("Login failed", err);
      alert("Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded shadow-md w-80"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
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
          LOGIN
        </button>
        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
