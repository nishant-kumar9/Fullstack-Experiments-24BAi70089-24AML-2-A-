import Navbar from "../components/Navbar";

function AdminDashboard() {
  return (
    <>
      <Navbar />

      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Admin Dashboard</h1>
        <p>Only admins can access this page</p>
      </div>
    </>
  );
}

export default AdminDashboard;