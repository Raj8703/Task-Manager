import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerSuccess } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("tm_users") || "[]");
    if (users.find((u) => u.email === email)) {
      alert("User already exists. Please login.");
      return;
    }
    const id = "u_" + Date.now();
    const newUser = { id, name, email, password };
    users.push(newUser);
    localStorage.setItem("tm_users", JSON.stringify(users));
    dispatch(registerSuccess({ id, name, email }));
    navigate("/");
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white">
      <h2 className="text-2xl mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
          required
          className="p-2 border rounded"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="p-2 border rounded"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          required
          className="p-2 border rounded"
        />
        <button className="p-2 bg-green-600 text-white rounded">
          Register
        </button>
      </form>
      <p className="mt-3 text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600">
          Login
        </Link>
      </p>
    </div>
  );
}
