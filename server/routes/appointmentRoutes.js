import express from "express";

import {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointmentController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create appointment
router.post("/", authMiddleware, createAppointment);

// Get all appointments
router.get("/", authMiddleware, getAppointments);
// Update appointment
router.put("/:id", authMiddleware, updateAppointment);

// Delete appointment
router.delete("/:id", authMiddleware, deleteAppointment);

export default router;