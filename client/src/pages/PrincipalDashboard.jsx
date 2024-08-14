import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import StudentsTable from "../components/StudentsTable";
import TeachersTable from "../components/TeachersTable";
import ClassroomsTable from "../components/ClassroomsTable";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const PrincipalDashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState("teachers");
  const navigate = useNavigate();

  const renderContent = () => {
    switch (selectedMenu) {
      case "students":
        return <StudentsTable />;
      case "teachers":
        return <TeachersTable />;
      case "classrooms":
        return <ClassroomsTable />;
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
            Principal Dashboard
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
                onClick={() => setSelectedMenu("teachers")}
                className={`text-left w-full py-2 px-3 rounded-lg ${
                  selectedMenu === "teachers"
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:text-blue-500 hover:bg-gray-100"
                }`}
              >
                Teachers
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
            <li className="mb-4">
              <button
                onClick={() => setSelectedMenu("classrooms")}
                className={`text-left w-full py-2 px-3 rounded-lg ${
                  selectedMenu === "classrooms"
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:text-blue-500 hover:bg-gray-100"
                }`}
              >
                Classrooms
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

export default PrincipalDashboard;
