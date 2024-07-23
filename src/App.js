import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login"; // Import your Login component
import Dashboard from "./components/tasks/Dashboard";
import ProtectedRoute from "./components/tasks/ProtectedRoute";
import GoogleCallback from "./components/tasks/googleCallback";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        />
        <Route path="/api/user/google/callback" element={<GoogleCallback />} />
      </Routes>
    </Router>
  );
}

export default App;
