import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user/google/callback${location.search}`
        );
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("username", response.data.user.username);
        localStorage.setItem("authToken", response.data.token);

        navigate("/dashboard", {
          state: { username: response.data.user.username },
        });
      } catch (error) {
        console.error("Error during Google authentication", error);
      }
    };

    fetchData();
  }, [location.search, navigate]);

  return <div>Loading...</div>;
};

export default GoogleCallback;
