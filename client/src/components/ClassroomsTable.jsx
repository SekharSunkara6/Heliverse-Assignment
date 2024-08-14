import React, { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

const ClassroomTable = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newClassroom, setNewClassroom] = useState({
    name: "",
    schedule: [{ day: "Monday", startTime: "", endTime: "" }],
    assignedTeacher: "",
  });
  const [editClassroom, setEditClassroom] = useState(null);
  const [error, setError] = useState(null);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetchClassrooms();
    fetchTeachers();
  }, []);

  const fetchClassrooms = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/dashboard/get-all-classrooms`
      );
      setClassrooms(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching classrooms:", error);
      setError("Failed to fetch classrooms. Please try again.");
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/user/dashboard/get-all-free-teachers`
      );
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClassroom({
      ...newClassroom,
      [name]: value,
    });
  };

  const handleScheduleChange = (index, field, value) => {
    const updatedSchedule = [...newClassroom.schedule];
    updatedSchedule[index] = { ...updatedSchedule[index], [field]: value };
    setNewClassroom({ ...newClassroom, schedule: updatedSchedule });
  };

  const addScheduleSlot = () => {
    setNewClassroom({
      ...newClassroom,
      schedule: [
        ...newClassroom.schedule,
        { day: "Monday", startTime: "", endTime: "" },
      ],
    });
  };

  const handleAddClassroom = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/dashboard/create-classroom`,
        newClassroom
      );
      console.log(response.data);
      fetchClassrooms();
      fetchTeachers();
      setShowModal(false);
      setNewClassroom({
        name: "",
        schedule: [{ day: "Monday", startTime: "", endTime: "" }],
        assignedTeacher: "",
      });
      setError(null);
    } catch (error) {
      console.error("Error adding classroom:", error);
      setError("Failed to add classroom. Please try again.");
    }
  };

  const handleEdit = (id) => {
    const classroomToEdit = classrooms.find(
      (className) => className._id === id
    );
    setEditClassroom(classroomToEdit);
    console.log(classrooms);

    setShowEditModal(true);
  };
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditClassroom({
      ...editClassroom,
      [name]: value,
    });
  };

  const handleUpdateClassroom = async () => {
    console.log(editClassroom);
  };

  return (
    <div>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div
        className="mb-4 text-blue-500 font-semibold cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        Add New Classroom
      </div>

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left text-gray-600">Name</th>
            <th className="p-3 text-left text-gray-600">Assigned Teacher</th>
            <th className="p-3 text-left text-gray-600">Schedule</th>
            <th className="p-3 text-left text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {classrooms.map((classroom) => (
            <tr key={classroom._id} className="border-b hover:bg-gray-50">
              <td className="p-3">{classroom.name}</td>
              <td className="p-3">
                {classroom.assignedTeacher?.firstName}{" "}
                {classroom.assignedTeacher?.lastName}
              </td>
              <td className="p-3">
                {classroom.schedule.map((slot, index) => (
                  <div key={index}>
                    {slot.day}: {slot.startTime} - {slot.endTime}
                  </div>
                ))}
              </td>
              <td
                className="p-3 text-blue-500 cursor-pointer"
                onClick={() => handleEdit(classroom._id)}
              >
                Edit
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-2xl font-semibold mb-4">Add New Classroom</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={newClassroom.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Assigned Teacher</label>
              <select
                name="assignedTeacher"
                value={newClassroom.assignedTeacher}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              >
                <option value="">Select a teacher</option>
                {teachers.map((teacher) => (
                  <option key={teacher._id} value={teacher._id}>
                    {teacher.firstName} {teacher.lastName}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Schedule</label>
              {newClassroom.schedule.map((slot, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <select
                    value={slot.day}
                    onChange={(e) =>
                      handleScheduleChange(index, "day", e.target.value)
                    }
                    className="p-2 border border-gray-300 rounded"
                  >
                    {[
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday",
                    ].map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                  <input
                    type="time"
                    value={slot.startTime}
                    onChange={(e) =>
                      handleScheduleChange(index, "startTime", e.target.value)
                    }
                    className="p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="time"
                    value={slot.endTime}
                    onChange={(e) =>
                      handleScheduleChange(index, "endTime", e.target.value)
                    }
                    className="p-2 border border-gray-300 rounded"
                  />
                </div>
              ))}
              <button
                onClick={addScheduleSlot}
                className="mt-2 bg-blue-500 text-white px-2 py-1 rounded text-sm"
              >
                Add Schedule Slot
              </button>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleAddClassroom}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for editing a student */}
      {showEditModal && editClassroom && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-2xl font-semibold mb-4">Edit Classroom</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="Name"
                value={editClassroom.name}
                onChange={handleEditInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Assigned Teacher</label>
              <input
                type="text"
                name="assignedTeacher"
                value={
                  editClassroom.assignedTeacher.firstName +
                  " " +
                  editClassroom.assignedTeacher.lastName
                }
                onChange={handleEditInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Schedule</label>
              {/* {editClassroom.schedule} */}
              {/* ----------------------------------------- */}
              {editClassroom.schedule.map((slot, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <select
                    value={editClassroom.day}
                    onChange={handleEditInputChange}
                    className="p-2 border border-gray-300 rounded"
                  >
                    {[
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday",
                    ].map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                  <input
                    type="time"
                    value={slot.startTime}
                    onChange={(e) =>
                      handleScheduleChange(index, "startTime", e.target.value)
                    }
                    className="p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="time"
                    value={slot.endTime}
                    onChange={(e) =>
                      handleScheduleChange(index, "endTime", e.target.value)
                    }
                    className="p-2 border border-gray-300 rounded"
                  />
                </div>
              ))}
              {/* ----------------------------------------- */}
              {/* <input
                type="email"
                name="email"
                value={editClassroom.email}
                onChange={handleEditInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              /> */}
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowEditModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateClassroom}
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

export default ClassroomTable;
