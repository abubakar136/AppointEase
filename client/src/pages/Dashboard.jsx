
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Clock,
  Plus,
  LogOut,
  Pencil,
  Trash2,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";
import toast from "react-hot-toast";

function Dashboard() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { user, logout } = useAuth();

  // Fetch appointments from the backend
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await API.get("/appointments");
        setAppointments(response.data.appointments || []);
      } catch (error) {
        toast.error("Failed to load appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Logout
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  // Search and filter appointments
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch = (appointment.title || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      appointment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Show the five most recently created appointments
  const recentAppointments = [...appointments]
    .sort(
      (a, b) =>
        new Date(b.createdAt || b.date) -
        new Date(a.createdAt || a.date)
    )
    .slice(0, 5);

  // Delete an appointment
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this appointment?"
    );

    if (!confirmed) return;

    try {
      await API.delete(`/appointments/${id}`);

      setAppointments((prev) =>
        prev.filter((appointment) => appointment._id !== id)
      );

      toast.success("Appointment deleted successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete appointment"
      );
    }
  };

  // Update appointment status
  const handleStatusChange = async (id, newStatus) => {
    try {
      await API.put(`/appointments/${id}`, {
        status: newStatus,
      });

      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment._id === id
            ? { ...appointment, status: newStatus }
            : appointment
        )
      );

      toast.success("Appointment status updated");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update appointment status"
      );
    }
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <h1>AppointEase</h1>
          <p>Welcome, {user?.name}</p>
        </div>

        <button onClick={handleLogout}>
          <LogOut size={18} /> Logout
        </button>
      </header>

      <main className="dashboard-content">
        <div className="dashboard-title">
          <div>
            <h2>My Appointments</h2>
            <p>Manage your scheduled appointments</p>
          </div>

          <Link to="/appointments/new" className="add-button">
            <Plus size={18} /> New Appointment
          </Link>
        </div>

        {/* Dashboard Statistics */}
        <div className="appointment-stats">
          <div className="stat-card">
            <CalendarDays size={25} />
            <h3>{appointments.length}</h3>
            <p>Total Appointments</p>
          </div>

          <div className="stat-card">
            <Clock size={25} />
            <h3>
              {
                appointments.filter(
                  (a) => a.status === "pending"
                ).length
              }
            </h3>
            <p>Pending Appointments</p>
          </div>

          <div className="stat-card">
            <CalendarDays size={25} />
            <h3>
              {
                appointments.filter(
                  (a) => a.status === "confirmed"
                ).length
              }
            </h3>
            <p>Confirmed Appointments</p>
          </div>

          <div className="stat-card">
            <CalendarDays size={25} />
            <h3>
              {
                appointments.filter(
                  (a) => a.status === "cancelled"
                ).length
              }
            </h3>
            <p>Cancelled Appointments</p>
          </div>

          <div className="stat-card">
            <CalendarDays size={25} />
            <h3>
              {
                appointments.filter(
                  (a) => a.status === "completed"
                ).length
              }
            </h3>
            <p>Completed Appointments</p>
          </div>
        </div>

        {/* Recent Appointments */}
        <section className="appointments-section">
          <h2>Recent Appointments</h2>

          {loading ? (
            <p>Loading recent appointments...</p>
          ) : recentAppointments.length === 0 ? (
            <p>No recent appointments.</p>
          ) : (
            <div className="appointment-list">
              {recentAppointments.map((appointment) => (
                <div
                  className="appointment-card"
                  key={appointment._id}
                >
                  <h3>{appointment.title}</h3>

                  <p>
                    <CalendarDays size={16} />{" "}
                    {new Date(
                      appointment.date
                    ).toLocaleDateString()}
                  </p>

                  <p>
                    <Clock size={16} /> {appointment.startTime} -{" "}
                    {appointment.endTime}
                  </p>

                  <p>
                    Status: {appointment.status}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* All Appointments */}
        <section className="appointments-section">
          <h2>Appointment List</h2>

          <input
            type="text"
            placeholder="Search appointments by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <select
            className="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Appointments</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>

          {loading ? (
            <p>Loading appointments...</p>
          ) : appointments.length === 0 ? (
            <p>
              No appointments found. Create your first appointment!
            </p>
          ) : filteredAppointments.length === 0 ? (
            <p>No matching appointments found.</p>
          ) : (
            <div className="appointment-list">
              {filteredAppointments.map((appointment) => (
                <div
                  className="appointment-card"
                  key={appointment._id}
                >
                  <h3>{appointment.title}</h3>

                  <p>{appointment.description}</p>

                  <p>
                    <CalendarDays size={16} />{" "}
                    {new Date(
                      appointment.date
                    ).toLocaleDateString()}
                  </p>

                  <p>
                    <Clock size={16} /> {appointment.startTime} -{" "}
                    {appointment.endTime}
                  </p>

                  <div className="status-management">
                    <span className="status">
                      {appointment.status}
                    </span>

                    <select
                      value={appointment.status}
                      onChange={(e) =>
                        handleStatusChange(
                          appointment._id,
                          e.target.value
                        )
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <div className="appointment-actions">
                    <button
                      className="edit-button"
                      onClick={() =>
                        navigate(
                          `/appointments/edit/${appointment._id}`
                        )
                      }
                    >
                      <Pencil size={16} /> Edit
                    </button>

                    <button
                      className="delete-button"
                      onClick={() =>
                        handleDelete(appointment._id)
                      }
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
