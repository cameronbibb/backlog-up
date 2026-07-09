import { useAuth } from "../../context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

function GuestRoute() {
  const { accessToken, isLoading } = useAuth();
  if (isLoading) return <p>Loading...</p>;
  return accessToken ? <Navigate to="/home" replace /> : <Outlet />;
}

export default GuestRoute;
