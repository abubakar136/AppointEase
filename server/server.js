import express from "express";
import authRoutes from "./routes/authRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
// Test route
app.get("/", (req, res) => {
  res.json({
    message: "AppointEase API is running successfully!"
  });
});

// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend is working correctly"
  });
});

// Start server
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`AppointEase server running on port ${PORT}`);
  });
};

startServer();