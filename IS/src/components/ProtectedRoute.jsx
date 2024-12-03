import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const isLoogedIn = false;
  return isLoogedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
