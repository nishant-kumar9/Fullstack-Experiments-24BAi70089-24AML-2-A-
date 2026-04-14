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
      const res = await axios.post("https://fullstack-experiments-24bai70089-24aml-2-elna.onrender.com/api/login", {
        username,
        password
      });

      localStorage.setItem("token", res.data.token);

      const payload = JSON.parse(atob(res.data.token.split(".")[1]));
      localStorage.setItem("user", JSON.stringify(payload));

      navigate("/dashboard");

    } catch {
      setMessage("Invalid credentials");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
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

        <p style={{ color: "red" }}>{message}</p>
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
    background: "linear-gradient(to right, #667eea, #764ba2)"
  },
  card: {
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    textAlign: "center",
    width: "300px",
    boxShadow: "0px 5px 15px rgba(0,0,0,0.2)"
  },
  input: {
    display: "block",
    width: "100%",
    margin: "10px 0",
    padding: "10px"
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#1976d2",
    color: "white",
    border: "none",
    cursor: "pointer"
  }
};

export default LoginForm;