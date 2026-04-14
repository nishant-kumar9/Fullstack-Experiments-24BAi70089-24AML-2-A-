import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("/api/protected", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setMessage(res.data.message))
      .catch(() => setMessage("Access Denied"));
  }, []);

  // 🔥 Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{message}</h1>

      <button onClick={handleLogout} style={{ padding: "10px 20px" }}>
        Logout
      </button>
    </div>
  );
}