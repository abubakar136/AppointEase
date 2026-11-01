import Appointment from "../models/Appointment.js";

// Create a new appointment
export const createAppointment = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      startTime,
      endTime,
    } = req.body;

    if (!title || !date || !startTime || !endTime) {
      return res.status(400).json({
        message: "Please fill in all required fields",
      });
    }
    if (endTime <= startTime) {
  return res.status(400).json({
    message: "End time must be later than start time",
  });
}
    if (endTime <= startTime) {
  return res.status(400).json({
    message: "End time must be later than start time",
  });
}
    const appointment = await Appointment.create({
      user: req.user._id,
      title,
      description,
      date,
      startTime,
      endTime,
    });

    res.status(201).json({
      message: "Appointment created successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create appointment",
      error: error.message,
    });
  }
};

// Get all appointments for logged-in user
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      user: req.user._id,
    }).sort({ date: 1 });

    res.status(200).json({
      count: appointments.length,
      appointments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch appointments",
      error: error.message,
    });
  }
};


// Update an appointment
export const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    const allowedFields = [
      "title",
      "description",
      "date",
      "startTime",
      "endTime",
      "status",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        appointment[field] = req.body[field];
      }
    });

    await appointment.save();
    if (
  appointment.startTime &&
  appointment.endTime &&
  appointment.endTime <= appointment.startTime
) {
  return res.status(400).json({
    message: "End time must be later than start time",
  });
}

    res.status(200).json({
      message: "Appointment updated successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update appointment",
      error: error.message,
    });
  }
};

// Delete an appointment
export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete appointment",
      error: error.message,
    });
  }
};

