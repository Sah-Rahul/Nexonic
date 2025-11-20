import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const BlockUserPagesForAdmin = ({ children }: { children: ReactNode }) => {
  const { user } = useSelector((state: any) => state.auth);

  if (user && user.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default BlockUserPagesForAdmin;
