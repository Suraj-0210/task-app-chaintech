// src/Login.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/User/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage("Both email and password are required.");
      return;
    }

    dispatch(signInStart());
    try {
      const response = await axios.post(
        "/api/auth/signin",
        {
          email,
          password,
        },
        {
          withCredentials: true, // Include credentials (cookies) in the request
        }
      );

      dispatch(signInSuccess(response.data.user)); // Store user in Redux
      navigate("/task"); // Redirect to Task page
    } catch (error) {
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
      setErrorMessage(message);
      dispatch(signInFailure(message));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-semibold text-center text-blue-600">
          Sign In
        </h1>
        <p className="mt-2 text-center text-gray-500">
          Please enter your credentials to log in.
        </p>

        {/* Error Message */}
        {errorMessage && (
          <div className="mt-4 p-3 bg-red-100 text-red-500 rounded-md text-center">
            {errorMessage}
          </div>
        )}

        {/* Input Fields */}
        <div className="mt-6">
          <label className="block text-sm text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <label className="block mt-4 text-sm text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full mt-6 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>

        {/* Footer */}
        <p className="mt-4 text-sm text-gray-600 text-center">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
