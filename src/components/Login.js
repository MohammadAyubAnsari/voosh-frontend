import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/login`,
        formData
      );
      toast.success("Login successful!");
      console.log("Login successful:", response.data);

      // Store authentication status
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("authToken", response.data.token);

      navigate("/dashboard", { state: { username: response.data.username } });
    } catch (error) {
      toast.error("There was an error logging in!");
      console.error("There was an error logging in!", error);
    }
  };

  const handleGoogleLogin = () => {
    // Redirect to Google login
    window.location.href = `${process.env.REACT_APP_API_URL}/api/user/google`;
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-3 py-2 border rounded"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-3 py-2 border rounded"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <div className="my-4 text-center">
          <p className="text-gray-700">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
        <div className="text-center">
          <button
            className="text-red-600 font-bold"
            onClick={handleGoogleLogin}
          >
            Login with Google
          </button>
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h1 className="text-9xl font-bold text-red-300 opacity-50">VOOSH</h1>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
