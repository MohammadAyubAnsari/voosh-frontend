import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Modal from "react-modal";
import "react-toastify/dist/ReactToastify.css";
import EditTaskModal from "./EditTaskModal";
import ViewTaskModal from "./ViewTaskModal";
import DeleteTaskButton from "./DeleteTask";

// Set the root element for the modal
Modal.setAppElement("#root");

const GetAllTask = ({ tasks, setTasks }) => {
  const [editingTask, setEditingTask] = useState(null); // State to hold the task being edited
  const [viewingTask, setViewingTask] = useState(null); // State to hold the task being viewed

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("No authentication token found.");
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/task/get-all`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast.error("Error fetching tasks!");
      }
    };

    fetchTasks();
  }, [setTasks]);

  const handleTaskUpdated = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );
  };

  const handleTaskDeleted = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-white p-6 rounded shadow-md w-full max-w-6xl mx-auto">
        <h2 className="text-4xl italic text-orange-600 mb-4 text-center">
          Tasks
        </h2>
        {tasks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="p-4 border rounded shadow-sm bg-gray-700 text-white"
              >
                <h3 className="text-xl font-semibold">{task.title}</h3>
                <p className="text-gray-300 mb-2">Category: {task.category}</p>
                <p className="text-gray-300 mb-2">{task.description}</p>
                <p className="text-gray-400 text-sm">
                  Created at: {new Date(task.createdAt).toLocaleString()}
                </p>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => setEditingTask(task)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <DeleteTaskButton
                    taskId={task._id}
                    onTaskDeleted={handleTaskDeleted}
                  />
                  <button
                    onClick={() => setViewingTask(task)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No tasks found.</p>
        )}

        {editingTask && (
          <EditTaskModal
            isOpen={!!editingTask}
            onRequestClose={() => setEditingTask(null)}
            task={editingTask}
            onTaskUpdated={handleTaskUpdated}
          />
        )}

        {viewingTask && (
          <ViewTaskModal
            isOpen={!!viewingTask}
            onRequestClose={() => setViewingTask(null)}
            task={viewingTask}
          />
        )}
      </div>
    </>
  );
};

export default GetAllTask;
