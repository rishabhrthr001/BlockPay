import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/context.jsx";
import { LogOut, User } from "lucide-react";

const NavBar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userName, logout } = useAuth();

  return (
    <div className="flex justify-between items-center px-6 sm:px-12 py-4 bg-[#242424] shadow-lg">
      <div className="flex items-center space-x-2">
        {isAuthenticated ? (
          <div className="flex items-center text-white text-xl font-bold">
            <User className="h-6 w-6 mr-2" />
            <span className="cursor-default">Hi, {userName || "User"}!</span>
          </div>
        ) : (
          <h2
            onClick={() => navigate("/")}
            className="text-white text-xl font-bold cursor-pointer"
          >
            BlockPay
          </h2>
        )}
      </div>

      <div>
        {isAuthenticated ? (
          <button
            onClick={logout}
            className="flex items-center px-4 py-2 rounded-lg bg-black text-white hover:bg-neutral-700 transition shadow-md"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 mr-2 rounded-lg bg-black text-white hover:bg-gray-800 transition shadow-md"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition shadow-md"
            >
              Signup
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
