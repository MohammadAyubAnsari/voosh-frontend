import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { toast } from "react-toastify";

const GoogleLoginComponent = () => {
  const handleLoginSuccess = async (response) => {
    const { credential: tokenId } = response;
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/google-login`,
        { tokenId }
      );
      toast.success("Login successful!");
      console.log("Login successful:", res.data);
    } catch (error) {
      toast.error("There was an error logging in!");
      console.error("There was an error logging in!", error);
    }
  };

  const handleLoginFailure = (response) => {
    toast.error("Google login failed!");
    console.error("Google login failed:", response);
  };

  return (
    <GoogleOAuthProvider clientId="77203705678-kf0gtkmd6vddkqfpt2mmij3de9og4a9k.apps.googleusercontent.com">
      <div className="google-login-button">
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginComponent;
