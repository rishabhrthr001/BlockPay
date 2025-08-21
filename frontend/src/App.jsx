import "./App.css";
import HomePage from "./components/homePage";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/context.jsx";
import DashBoard from "./components/DashBoard.jsx";
import AdminDashboard from "./adminComponents/AdminDashboard.jsx";
import ProtectedRoute from "./ProtectedRoutes/ProtectAdmin.jsx";
import { WagmiProvider } from "wagmi";
import { config } from "../wagmiClient.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectLogin from "./ProtectedRoutes/ProtectLogin.jsx";
import SetSalary from "./adminComponents/SetSalary.jsx";
import RecentTransactions from "./components/RecentTransactions.jsx";

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <Toaster position="top-center" />
            <NavBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectLogin>
                    <DashBoard />
                  </ProtectLogin>
                }
              />
              <Route
                path="/admin-dashboard"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/set-salary"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <SetSalary />{" "}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/show-tx"
                element={
                  <ProtectLogin>
                    {" "}
                    <RecentTransactions />{" "}
                  </ProtectLogin>
                }
              />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
