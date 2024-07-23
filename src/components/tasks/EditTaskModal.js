import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { toast } from "react-toastify";

const EditTaskModal = ({ isOpen, onRequestClose, task, onTaskUpdated }) => {
  const [updatedTask, setUpdatedTask] = useState({
    title: task.title,
    category: task.category,
    description: task.description,
  });

  const handleUpdate = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("No authentication token found.");
      return;
    }

    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/task/update/${task._id}`,
        updatedTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onTaskUpdated({ ...task, ...updatedTask });
      onRequestClose(); // Close the edit form
      toast.success("Task updated successfully!");
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Error updating task!");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Task"
      className="modal bg-white rounded-lg p-6 shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="bg-gray-100 p-4 rounded shadow-md w-full max-w-lg mx-auto">
        <h3 className="text-xl font-semibold mb-4 text-center">Edit Task</h3>
        <p className="font-bold">Title</p>
        <input
          type="text"
          placeholder="Title"
          value={updatedTask.title}
          onChange={(e) =>
            setUpdatedTask({ ...updatedTask, title: e.target.value })
          }
          className="mb-2 p-2 border rounded w-full"
        />
        <p className="font-bold">Category</p>
        <input
          type="text"
          placeholder="Category"
          value={updatedTask.category}
          onChange={(e) =>
            setUpdatedTask({ ...updatedTask, category: e.target.value })
          }
          className="mb-2 p-2 border rounded w-full"
        />
        <p className="font-bold">Description</p>
        <textarea
          placeholder="Description"
          value={updatedTask.description}
          onChange={(e) =>
            setUpdatedTask({ ...updatedTask, description: e.target.value })
          }
          className="mb-4 p-2 border rounded w-full"
        />
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Task
        </button>
        <button
          onClick={onRequestClose}
          className="bg-gray-500 text-white px-4 py-2 rounded ml-2 hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default EditTaskModal;
