import { Navigate } from "react-router-dom";
import React from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles,
}) => {
  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("rol");

  if (requiredRoles && !requiredRoles.includes(rol || "")) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (!token) {
    return <Navigate to="/rrhh" replace />;
  }

  return <>{children}</>;
};
