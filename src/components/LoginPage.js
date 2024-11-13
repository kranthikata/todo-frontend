import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPage = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Input validation
    if (!email || !password) {
      setLoading(false);
      setError("Please fill in all fields");
      return;
    }

    try {
      // Making API request to login the user
      const response = await axios.post(
        "https://todo-backend-e1sp.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      const userData = JSON.stringify(response.data);

      localStorage.setItem("user", userData); // Save the token in localStorage
      setLoading(false);
      history.replace("/dashboard"); // Redirect to the dashboard or home page after login success
    } catch (err) {
      setLoading(false);
      setError("Invalid email or password");
      toast.error("Login failed!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 mt-4 text-white font-semibold rounded-md ${
              loading ? "bg-gray-400" : "bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:text-blue-700">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
