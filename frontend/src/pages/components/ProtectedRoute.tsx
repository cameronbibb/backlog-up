import { useAuth } from "../../context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoute() {
  const { accessToken, isLoading } = useAuth();
  if (isLoading) return <p>Loading...</p>;
  return accessToken ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectedRoute;
