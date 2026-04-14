import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={styles.navbar}>
      {/* LEFT SIDE */}
      <h2 style={styles.logo}>🚀 NishantAuth</h2>

      {/* RIGHT SIDE */}
      <div style={styles.right}>
        <span style={styles.role}>
          👤 {user?.role?.toUpperCase()}
        </span>

        <button style={styles.button} onClick={() => navigate("/dashboard")}>
          Dashboard
        </button>

        {user?.role === "admin" && (
          <button style={styles.adminBtn} onClick={() => navigate("/admin")}>
            Admin
          </button>
        )}

        <button style={styles.logout} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "linear-gradient(90deg, #020617, #0f172a, #1e293b)",
    color: "white",
    boxShadow: "0 5px 20px rgba(0,0,0,0.5)",
  },

  logo: {
    margin: 0,
    fontWeight: "bold",
    letterSpacing: "1px",
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  role: {
    marginRight: "10px",
    color: "#22c55e",
    fontWeight: "bold",
  },

  button: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    background: "#06b6d4",
    color: "black",
    fontWeight: "500",
  },

  adminBtn: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    background: "#f59e0b",
    color: "black",
    fontWeight: "500",
  },

  logout: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    background: "#ef4444",
    color: "white",
    fontWeight: "bold",
  },
};

export default Navbar;