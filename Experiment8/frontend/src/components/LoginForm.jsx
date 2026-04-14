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
        "https://fullstack-experiments-24bai70089-24aml-2-elna.onrender.com/api/login",
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
        <h1 style={styles.title}>Welcome Back</h1>
        <p style={styles.subtitle}>Sign in to continue</p>

        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
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
  /* 🔥 NEW BACKGROUND (CLEAN DARK, NOT BLUE) */
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0d0d0d",
  },

  /* 🔥 CARD (SOFT GLASS + BORDER) */
  card: {
    background: "#1a1a1a",
    padding: "35px",
    borderRadius: "16px",
    width: "320px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
    border: "1px solid #2a2a2a",
  },

  title: {
    color: "#ffffff",
    marginBottom: "5px",
    fontWeight: "600",
  },

  subtitle: {
    color: "#888",
    marginBottom: "20px",
    fontSize: "14px",
  },

  /* 🔥 FORM FIX (CENTER PERFECTLY) */
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  /* 🔥 INPUT (CLEAN DARK INPUTS) */
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #333",
    outline: "none",
    background: "#111",
    color: "#fff",
    fontSize: "14px",
    boxSizing: "border-box",
    transition: "0.3s",
  },

  /* 🔥 BUTTON (MODERN GREEN ACCENT) */
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    borderRadius: "8px",
    border: "none",
    background: "#22c55e",
    color: "black",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  },

  error: {
    color: "#ff4d4d",
    marginTop: "10px",
    fontSize: "14px",
  },
};

export default LoginForm;