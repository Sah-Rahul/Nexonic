import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getMe } from "../store/slices/authSlice";

const ProtectedRoutes = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe());
  }, []);

  const { authUser } = useSelector((state) => state.auth);

  return authUser ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
