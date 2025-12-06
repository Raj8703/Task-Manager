import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav className="flex justify-between p-4 bg-gray-900 text-white">
      <Link to="/" className="font-bold text-xl">
        Task Manager
      </Link>

      {user && (
        <button
          onClick={() => dispatch(logout())}
          className="bg-red-500 px-3 py-1 rounded"
        >
          Logout
        </button>
      )}
    </nav>
  );
}
