import React, { useState, useEffect } from "react";
import axios from "axios";

// Configure axios to include credentials with every request
axios.defaults.withCredentials = true;

const TeachersTable = () => {
  const [teachers, setTeachers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newTeacher, setNewTeacher] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [editTeacher, setEditTeacher] = useState(null);

  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/dashboard/get-all-teachers`
      );
      setTeachers(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching teachers:", error);
      setError("Failed to fetch teachers. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeacher({
      ...newTeacher,
      [name]: value,
    });
  };

  const handleAddTeacher = async () => {
    try {
      const teacherData = { ...newTeacher, role: "teacher" };

      console.log(teacherData);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/dashboard/create-teacher`,
        teacherData
      );
      console.log(response.data);
      fetchTeachers(); // Refresh the teachers list
      setShowModal(false);
      setNewTeacher({ firstName: "", lastName: "", email: "", password: "" });
      setError(null);
    } catch (error) {
      console.error("Error adding teacher:", error);
      setError("Failed to add teacher. Please try again.");
    }
  };

  const handleEdit = (id) => {
    const teacherToEdit = teachers.find((teacher) => teacher._id === id);
    setEditTeacher(teacherToEdit);
    setShowEditModal(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditTeacher({
      ...editTeacher,
      [name]: value,
    });
  };
  const handleUpdateTeacher = async () => {
    console.log(editTeacher);
    // fetchStudents(); // Refresh the students list
    setShowEditModal(false);
    setError(null);
  };

  return (
    <div>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div
        className="mb-4 text-blue-500 font-semibold cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        Add New Teacher
      </div>

      {/* Table displaying teachers */}
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left text-gray-600">Name</th>
            <th className="p-3 text-left text-gray-600">Email</th>
            <th className="p-3 text-left text-gray-600">Classroom</th>
            <th className="p-3 text-left text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers ? (
            teachers.map((teacher) => (
              <tr key={teacher._id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  {teacher.firstName} {teacher.lastName}
                </td>
                <td className="p-3">{teacher.email}</td>
                <td className="p-3">
                  {teacher.classroomName ? teacher.classroomName : "-"}
                </td>
                <td
                  className="p-3 text-blue-500 cursor-pointer"
                  onClick={() => handleEdit(teacher._id)}
                >
                  Edit
                </td>
              </tr>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </tbody>
      </table>

      {/* Modal for adding a new teacher */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-2xl font-semibold mb-4">Add New Teacher</h2>
            <div className="mb-4">
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                value={newTeacher.firstName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={newTeacher.lastName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={newTeacher.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={newTeacher.password}
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
                onClick={handleAddTeacher}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for editing a student */}
      {showEditModal && editTeacher && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-2xl font-semibold mb-4">Edit Teacher</h2>
            <div className="mb-4">
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                value={editTeacher.firstName}
                onChange={handleEditInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={editTeacher.lastName}
                onChange={handleEditInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={editTeacher.email}
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
                onClick={handleUpdateTeacher}
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

export default TeachersTable;
