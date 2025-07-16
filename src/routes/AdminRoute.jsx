// components/Routes/AdminRoute.jsx
import { Navigate, useLocation } from "react-router";
import useUserProfile from "../hooks/useUserProfile";
import Spinner from "../components/Shared/Spinner";

const AdminRoute = ({ children }) => {
  const { profile, isLoading } = useUserProfile();
  const location = useLocation();

  if (isLoading) return <Spinner />;

  if (profile?.role === "admin") return children;

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;
