import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const StudentDashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState("classroom");
  const [classroom, setClassroom] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedMenu === "classroom") {
      fetchClassroom();
    } else if (selectedMenu === "students") {
      fetchStudents();
    }
  }, [selectedMenu]);

  const fetchClassroom = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/student/myclassrooms`
      );
      setClassroom(response.data);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        setError(err.response.data.message);
      } else {
        setError("Failed to fetch classroom data");
      }
      console.error(err);
    } finally {
      console.log(classroom);
    }
    setLoading(false);
  };

  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/student/classmates`
      );
      setStudents(response.data);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        setError(err.response.data.message);
      } else {
        setError("Failed to fetch Students data");
      }
      console.error(err);
    }
    setLoading(false);
  };

  const renderContent = () => {
    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div className="text-red-500">{error}</div>;
    }
    switch (selectedMenu) {
      case "students":
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">My Students</h3>
            {students.length > 0 ? (
              <ul>
                {students.map((student) => (
                  <li key={student._id} className="mb-2">
                    {student.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No students enrolled in your classroom.</p>
            )}
          </div>
        );
      case "classroom":
        return (
          <div>
            {classroom ? (
              <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="px-6 py-4">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">
                    My Classroom
                  </h3>
                  {classroom ? (
                    <div>
                      <p className="text-lg font-medium text-gray-700 mb-2">
                        Name: {classroom.name}
                      </p>
                      <div className="mb-4">
                        <p className="font-semibold text-gray-800">Schedule:</p>
                        {/* <ul className="list-disc list-inside">
                          {classroom.schedule.map((session, index) => (
                            <li key={index} className="text-gray-600">
                              <span className="font-medium text-gray-700">
                                {session.day}
                              </span>
                              : {session.startTime} - {session.endTime}
                            </li>
                          ))}
                        </ul> */}
                      </div>
                      {/* Add more classroom details as needed */}
                    </div>
                  ) : (
                    <p className="text-gray-500">No classroom assigned.</p>
                  )}
                </div>
              </div>
            ) : (
              <p>No classroom assigned.</p>
            )}
          </div>
        );
      default:
        return <div>Select an option from the menu</div>;
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/user/logout`);

      // Redirect to the login page
      toast.success("Logout successful!");
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
      // Optionally, you can set an error state here to display a message to the user
    }
  };

  return (
    <div>
      <div className="bg-blue-500 p-4 shadow-md flex justify-between">
        <div>
          <h1 className="text-white text-2xl font-semibold">
            Student Dashboard
          </h1>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="text-white text-1xl font-semibold hover:underline focus:outline-none"
          >
            Log Out
          </button>
        </div>
      </div>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <nav className="w-1/4 bg-white p-6 shadow-lg">
          <ul>
            <li className="mb-4">
              <button
                onClick={() => setSelectedMenu("classroom")}
                className={`text-left w-full py-2 px-3 rounded-lg ${
                  selectedMenu === "classroom"
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:text-blue-500 hover:bg-gray-100"
                }`}
              >
                My Classroom
              </button>
            </li>
            <li className="mb-4">
              <button
                onClick={() => setSelectedMenu("students")}
                className={`text-left w-full py-2 px-3 rounded-lg ${
                  selectedMenu === "students"
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:text-blue-500 hover:bg-gray-100"
                }`}
              >
                Students
              </button>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {selectedMenu.charAt(0).toUpperCase() + selectedMenu.slice(1)}
          </h2>
          <div className="bg-white p-6 shadow rounded-lg">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
