import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AddTaskForm from "./AddTask";
import GetAllTask from "./GetAllTask";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username || localStorage.getItem("username");

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [tasks, setTasks] = useState([]); // State to hold all tasks

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const handleSaveTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]); // Add new task to the list
    setIsFormVisible(false);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="text-lg font-semibold">{username}</div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </nav>
      <main className="flex-grow flex flex-col items-center justify-center">
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="bg-green-500 text-white px-6 py-3 rounded shadow-lg mb-4"
        >
          Add Task
        </button>
        {isFormVisible && (
          <AddTaskForm onSave={handleSaveTask} onCancel={handleCancel} />
        )}
        <GetAllTask tasks={tasks} setTasks={setTasks} />
      </main>
    </div>
  );
};

export default Dashboard;
