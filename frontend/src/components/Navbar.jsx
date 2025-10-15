import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast.success("Logged out successfully");
  };

  const handleTitleClick = () => {
    navigate("/");
  };

  return (
    <nav className="bg-indigo-600 text-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold cursor-pointer" onClick={handleTitleClick}>📝 Task Manager</h1>
      <div className="space-x-4">
        {user ? (
          <>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <button
              onClick={handleLogout}
              className="bg-white text-indigo-600 px-3 py-1 rounded-md hover:bg-gray-200 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register" className="hover:underline">Register</Link>
            <Link to="/login" className="hover:underline">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}
