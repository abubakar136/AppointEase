
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

function EditAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await API.get("/appointments");
        const appointment = response.data.appointments.find(
          (item) => item._id === id
        );

        if (!appointment) {
          toast.error("Appointment not found");
          navigate("/dashboard");
          return;
        }

        setFormData({
          title: appointment.title,
          description: appointment.description || "",
          date: new Date(appointment.date).toISOString().split("T")[0],
          startTime: appointment.startTime,
          endTime: appointment.endTime,
        });
      } catch (error) {
        toast.error("Failed to load appointment");
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/appointments/${id}`, formData);
      toast.success("Appointment updated successfully");
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update appointment"
      );
    }
  };

  if (loading) {
    return <p>Loading appointment...</p>;
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Edit Appointment</h1>
        <p>Update your appointment details.</p>

        <form onSubmit={handleSubmit}>
          <label>Appointment Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <label>Date</label>
          <input
            type="date"
            name="date"
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

          <button type="submit">Update Appointment</button>
        </form>

        <p>
          <Link to="/dashboard">Back to Dashboard</Link>
        </p>
      </div>
    </div>
  );
}

export default EditAppointment;
