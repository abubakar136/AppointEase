
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import EditAppointment from "./pages/EditAppointment";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AppointmentForm from "./pages/AppointmentForm";

import { useAuth } from "./context/AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Toaster position="top-right" />

      <Routes>
        <Route
          path="/"
          element={
            <Navigate to={user ? "/dashboard" : "/login"} replace />
          }
        />

        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <Login />}
        />

        <Route
          path="/register"
          element={user ? <Navigate to="/dashboard" /> : <Register />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/appointments/new"
          element={
            <ProtectedRoute>
              <AppointmentForm />
            </ProtectedRoute>
          }
        />
        <Route
  path="/appointments/edit/:id"
  element={
    <ProtectedRoute>
      <EditAppointment />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
