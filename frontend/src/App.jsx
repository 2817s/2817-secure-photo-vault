import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Unlock from "./pages/Unlock";
import Gallery from "./pages/Gallery";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";

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

      {/* Landing Page */}
      <Route
        path="/"
        element={<Landing />}
      />

      {/* Unlock Page */}
      <Route
        path="/unlock"
        element={<Unlock />}
      />

      {/* Protected Gallery */}
      <Route
        path="/gallery"
        element={
          <ProtectedRoute>
            <Gallery />
          </ProtectedRoute>
        }
      />

      {/* Protected Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Practical 3 - Projects */}
      <Route
        path="/projects"
        element={
          <ProtectedRoute>
            <Projects />
          </ProtectedRoute>
        }
      />

      {/* Unknown URL */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}

export default App;