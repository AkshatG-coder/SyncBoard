import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode"; // To decode the token

const GoogleLoginButton = () => {
  const handleSuccess = (response) => {
    const decoded = jwt_decode(response.credential);
    console.log("User Info:", decoded);
  };

  const handleError = () => {
    console.log("Login Failed");
  };

  return (
    <div>
      <h2>Login with Google</h2>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </div>
  );
};

export default GoogleLoginButton;
