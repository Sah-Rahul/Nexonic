import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { authUser } = useSelector((state) => state.auth);

  return authUser ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;
