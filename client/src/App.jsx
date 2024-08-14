import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
import PrincipalDashboard from "./pages/PrincipalDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/principalDashboard" element={<PrincipalDashboard />} />
        <Route path="/teacherDashboard" element={<TeacherDashboard />} />
        <Route path="/studentDashboard" element={<StudentDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
