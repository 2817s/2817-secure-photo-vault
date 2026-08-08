import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isUnlocked =
    localStorage.getItem("vaultUnlocked") === "true";

  if (!isUnlocked) {
    return <Navigate to="/unlock" replace />;
  }

  return children;
}

export default ProtectedRoute;