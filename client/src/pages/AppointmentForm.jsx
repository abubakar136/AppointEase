
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

function AppointmentForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  
const handleSubmit = async (e) => {
  e.preventDefault();

  // Check required fields
  if (
    !formData.title.trim() ||
    !formData.date ||
    !formData.startTime ||
    !formData.endTime
  ) {
    toast.error("Please complete all required fields");
    return;
  }

  // Check appointment date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selectedDate = new Date(`${formData.date}T00:00:00`);

  if (selectedDate < today) {
    toast.error("Appointment date cannot be in the past");
    return;
  }

  // Check appointment time
  if (formData.endTime <= formData.startTime) {
    toast.error("End time must be later than start time");
    return;
  }

  setLoading(true);

  try {
    await API.post("/appointments", formData);

    toast.success("Appointment booked successfully!");
    navigate("/dashboard");
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Failed to book appointment"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Book Appointment</h1>
        <p>Enter your appointment details</p>

        <form onSubmit={handleSubmit}>
          <label>Appointment Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter appointment title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label>Description</label>
          <textarea
            name="description"
            placeholder="Enter appointment details"
            value={formData.description}
            onChange={handleChange}
          />

          <label>Date</label>
          <input
            type="date"
            name="date"
            min={new Date().toISOString().split("T")[0]}
            value={formData.date}
            onChange={handleChange}
            required
          />

          <label>Start Time</label>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          />

          <label>End Time</label>
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
    {loading ? "Booking..." : "Book Appointment"}
</button>
<button
  type="button"
  className="cancel-btn"
  onClick={() => navigate("/dashboard")}
>
  Cancel
</button>
        </form>

        <p>
          <Link to="/dashboard">Back to Dashboard</Link>
        </p>
      </div>
    </div>
  );
}

export default AppointmentForm;
