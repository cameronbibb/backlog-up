import { useAuth } from "../context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoute() {
  const { accessToken } = useAuth();
  return accessToken ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectedRoute;
