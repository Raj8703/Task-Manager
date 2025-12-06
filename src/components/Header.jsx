import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

export default function Header() {
  const user = useSelector((s) => s.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  return (
    <header className="p-4 bg-gray-800 text-white flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        TaskManager
      </Link>
      <nav>
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm">Hi, {user.name}</span>
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-500 rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <Link to="/login" className="px-3 py-1 bg-blue-600 rounded">
              Login
            </Link>
            <Link to="/register" className="px-3 py-1 bg-green-600 rounded">
              Register
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
