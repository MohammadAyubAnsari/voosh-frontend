import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTaskForm = ({ onSave, onCancel }) => {
  const [taskData, setTaskData] = useState({
    category: "",
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("No authentication token found.");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/task/create`,
        taskData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onSave(response.data); // Call onSave with the created task data

      toast.success("Task created successfully!");

      setTaskData({
        category: "",
        title: "",
        description: "",
      });
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            className="w-full px-3 py-2 border rounded"
            value={taskData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            className="w-full px-3 py-2 border rounded"
            value={taskData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            className="w-full px-3 py-2 border rounded"
            value={taskData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default AddTaskForm;
