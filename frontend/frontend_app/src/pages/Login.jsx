import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { login, signup } from "../services/authService";

export default function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form); // You'll need to expose user creation in DRF
      alert("Login succesfull");
      navigate("/clients");  // 👈 redirect
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-[#023acb]">Login</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full border p-2 mb-3"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2 mb-3"
          onChange={handleChange}
          required
        />
        <button className="w-full bg-[#023acb] text-white py-2 rounded">
          Log In
        </button>
      </form>
    </div>
  );
}
