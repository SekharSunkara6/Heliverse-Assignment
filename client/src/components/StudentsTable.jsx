import React, { useState, useEffect } from "react";
import axios from "axios";

// Configure axios to include credentials with every request
axios.defaults.withCredentials = true;

const StudentsTable = () => {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [editStudent, setEditStudent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/dashboard/get-all-students`,
        { withCredentials: true }
      );
      setStudents(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching students:", error);
      setError("Failed to fetch students. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({
      ...newStudent,
      [name]: value,
    });
  };

  const handleAddStudent = async () => {
    try {
      const studentData = { ...newStudent, role: "student" };

      console.log(studentData);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/dashboard/create-student`,
        studentData
      );
      console.log(response.data);
      fetchStudents(); // Refresh the teachers list
      setShowModal(false);
      setNewStudent({ firstName: "", lastName: "", email: "", password: "" });
      setError(null);
    } catch (error) {
      console.error("Error adding student:", error);
      setError("Failed to add student. Please try again.");
    }
  };

  const handleEdit = (id) => {
    const studentToEdit = students.find((student) => student._id === id);
    setEditStudent(studentToEdit);
    setShowEditModal(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditStudent({
      ...editStudent,
      [name]: value,
    });
  };

  const handleUpdateStudent = async () => {
    console.log(editStudent);
  };

  return (
    <div>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div
        className="mb-4 text-blue-500 font-semibold cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        Add New Student
      </div>

      {/* Table displaying students */}
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left text-gray-600">Name</th>
            <th className="p-3 text-left text-gray-600">Email</th>
            <th className="p-3 text-left text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="p-3">
                {student.firstName} {student.lastName}
              </td>
              <td className="p-3">{student.email}</td>
              <td
                className="p-3 text-blue-500 cursor-pointer"
                onClick={() => handleEdit(student._id)}
              >
                Edit
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding a new student */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-2xl font-semibold mb-4">Add New Student</h2>
            <div className="mb-4">
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                value={newStudent.firstName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={newStudent.lastName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={newStudent.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={newStudent.password}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleAddStudent}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for editing a student */}
      {showEditModal && editStudent && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-2xl font-semibold mb-4">Edit Student</h2>
            <div className="mb-4">
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                value={editStudent.firstName}
                onChange={handleEditInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={editStudent.lastName}
                onChange={handleEditInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={editStudent.email}
                onChange={handleEditInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowEditModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateStudent}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsTable;
