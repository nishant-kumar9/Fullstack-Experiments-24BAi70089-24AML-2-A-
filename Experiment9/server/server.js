require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const roleMiddleware = require("./middleware/roleMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

// ================= API =================
app.use("/api", authRoutes);

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "Welcome User", user: req.user });
});

app.get("/api/admin", authMiddleware, roleMiddleware("admin"), (req, res) => {
  res.json({ message: "Welcome Admin", user: req.user });
});

// ================= DATABASE =================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ================= FRONTEND =================
app.use(express.static(path.join(__dirname, "../client/build")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// ================= START =================
app.listen(3001, () => {
  console.log("Server running on port 3001");
});