import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!email.trim() || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setSuccess(
        "Registration successful. Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <p style={styles.label}>SECURE PHOTO VAULT</p>

        <h1 style={styles.title}>Create Account</h1>

        <p style={styles.subtitle}>
          Register to access your task manager.
        </p>

        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        {success && (
          <div style={styles.success}>
            {success}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={loading}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={loading}
            style={styles.input}
          />

          <button
            type="submit"
            disabled={loading}
            style={styles.button}
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => navigate("/login")}
          style={styles.secondaryButton}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "24px",
    background: "#f8fafc",
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    padding: "36px",
    background: "white",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
  },

  label: {
    margin: "0 0 8px",
    color: "#4f46e5",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "1.5px",
  },

  title: {
    margin: "0 0 8px",
    color: "#111827",
  },

  subtitle: {
    margin: "0 0 24px",
    color: "#6b7280",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 14px",
    marginBottom: "14px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "15px",
  },

  button: {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    background: "#4f46e5",
    color: "white",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },

  secondaryButton: {
    width: "100%",
    marginTop: "12px",
    padding: "11px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    background: "white",
    color: "#374151",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },

  error: {
    marginBottom: "18px",
    padding: "12px",
    borderRadius: "8px",
    background: "#fef2f2",
    border: "1px solid #fecaca",
    color: "#b91c1c",
    fontSize: "14px",
  },

  success: {
    marginBottom: "18px",
    padding: "12px",
    borderRadius: "8px",
    background: "#f0fdf4",
    border: "1px solid #bbf7d0",
    color: "#15803d",
    fontSize: "14px",
  },
};

export default Register;