import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Unlock from "./pages/Unlock";
import Gallery from "./pages/Gallery";
import Dashboard from "./pages/Dashboard";

function ProtectedRoute({ children }) {
  const unlocked =
    sessionStorage.getItem("vaultUnlocked") === "true";

  if (!unlocked) {
    return <Navigate to="/unlock" replace />;
  }

  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route path="/unlock" element={<Unlock />} />

      <Route
        path="/gallery"
        element={
          <ProtectedRoute>
            <Gallery />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}

export default App;