import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DeleteTaskButton = ({ taskId, onTaskDeleted }) => {
  const handleDelete = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("No authentication token found.");
      return;
    }

    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/task/delete/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onTaskDeleted(taskId);
      toast.success("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Error deleting task!");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      Delete
    </button>
  );
};

export default DeleteTaskButton;
