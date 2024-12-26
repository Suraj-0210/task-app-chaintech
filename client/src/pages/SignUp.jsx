import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({}); // Add errors state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear any previous error messages

    try {
      // Send POST request to /api/auth/signup using fetch
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Check if the response is successful (status 200)
      if (response.status === 200) {
        const data = await response.json();
        // Redirect user to signin page on success
        navigate("/signin");
      } else {
        // Handle any error that may occur in the response
        const errorData = await response.json();
        console.error("Error: ", errorData.message);
        setErrors((prev) => ({
          ...prev,
          apiError: errorData.message,
        }));
      }
    } catch (error) {
      // Handle network errors or other issues with the request
      console.error("Sign-up error:", error);
      setErrors((prev) => ({
        ...prev,
        apiError: "An error occurred. Please try again later.",
      }));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-blue-600">
          Sign Up
        </h1>
        <p className="mt-2 text-center text-gray-500">
          Please enter your credentials to Sign Up.
        </p>

        {errors.apiError && (
          <div className="mt-4 p-3 bg-red-100 text-red-500 rounded-md text-center">
            {errors.apiError}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-600"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              required
            />
            {errors.email && (
              <div className="text-sm text-red-600">{errors.email}</div>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/signin")}
            className="text-indigo-600 hover:text-indigo-700 cursor-pointer"
          >
            Signin
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
