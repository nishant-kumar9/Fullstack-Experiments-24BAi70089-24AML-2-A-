import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://fullstack-experiments-24bai70089-24aml-2-mf68.onrender.com",
        {
          username,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);

      const payload = JSON.parse(atob(res.data.token.split(".")[1]));
      localStorage.setItem("user", JSON.stringify(payload));

      navigate("/dashboard");
    } catch {
      setMessage("❌ Invalid credentials");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome Back 👋</h1>
        <p style={styles.subtitle}>Login to your account</p>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="👤 Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="🔒 Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>

        {message && <p style={styles.error}>{message}</p>}
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, #020617, #0f172a, #1e293b)",
  },

  card: {
    background: "rgba(255,255,255,0.05)",
    padding: "40px",
    borderRadius: "20px",
    width: "320px",
    textAlign: "center",
    backdropFilter: "blur(15px)",
    boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
  },

  title: {
    color: "white",
    marginBottom: "5px",
  },

  subtitle: {
    color: "#94a3b8",
    marginBottom: "20px",
    fontSize: "14px",
  },

  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    background: "rgba(255,255,255,0.1)",
    color: "white",
  },

  button: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(45deg, #22c55e, #06b6d4)",
    color: "black",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  },

  error: {
    color: "#f87171",
    marginTop: "10px",
  },
};

export default LoginForm;