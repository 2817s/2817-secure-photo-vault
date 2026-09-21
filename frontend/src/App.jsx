import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Unlock from "./pages/Unlock";
import Dashboard from "./pages/Dashboard";

import Tasks from "./Tasks";
import Login from "./Login";
import Register from "./Register";

// Lazy-loaded route components
const Gallery = lazy(() => import("./pages/Gallery"));
const Projects = lazy(() => import("./pages/Projects"));

function ProtectedRoute({ children }) {
  const unlocked = sessionStorage.getItem("vaultUnlocked") === "true";

  if (!unlocked) {
    return <Navigate to="/unlock" replace />;
  }

  return children;
}

function AuthProtectedRoute({ children }) {
  const token = sessionStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function LoadingPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "12px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "36px",
          height: "36px",
          border: "4px solid #e5e7eb",
          borderTop: "4px solid #2563eb",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      ></div>

      <h2>Loading page...</h2>
      <p>Please wait while the page loads.</p>

      <style>
        {`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/unlock" element={<Unlock />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

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
          path="/projects"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <AuthProtectedRoute>
                <Tasks />
              </AuthProtectedRoute>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;