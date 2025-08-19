import { useAuth } from "../context/context";
import { Navigate } from "react-router-dom";

export default function ProtectLogin({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
