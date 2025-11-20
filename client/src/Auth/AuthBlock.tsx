import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthBlock = ({ children }: { children: ReactNode }) => {
  const { user, isLogging } = useSelector((state: any) => state.auth);

  if (isLogging && user) {
    if (user.role === "admin")
      return <Navigate to="/admin/dashboard" replace />;

    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthBlock;
