import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>User Dashboard</h1>
        <p>Welcome! You are logged in.</p>
      </div>
    </>
  );
}

export default Dashboard;