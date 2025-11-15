import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/context.jsx";
import { LogOut, User, Menu, X } from "lucide-react";

const NavBar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userName, logout } = useAuth();

  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[#242424] px-6 sm:px-12 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* LEFT SIDE */}
        <div className="flex items-center space-x-2">
          {isAuthenticated ? (
            <div className="flex items-center text-white text-xl font-bold">
              <User className="h-6 w-6 mr-2" />
              <span>Hi, {userName || "User"}!</span>
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

        {/* DESKTOP BUTTONS */}
        <div className="hidden sm:flex items-center gap-3">
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
                className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition shadow-md"
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

        {/* MOBILE MENU BUTTON */}
        <button className="sm:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {open && (
        <div className="sm:hidden mt-4 flex flex-col gap-3 bg-[#1a1a1a] p-4 rounded-lg shadow-md">
          {isAuthenticated ? (
            <>
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="flex items-center w-full px-4 py-2 rounded-lg bg-black text-white hover:bg-neutral-700 transition shadow-md"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  navigate("/login");
                  setOpen(false);
                }}
                className="w-full px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition shadow-md"
              >
                Login
              </button>
              <button
                onClick={() => {
                  navigate("/signup");
                  setOpen(false);
                }}
                className="w-full px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition shadow-md"
              >
                Signup
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
