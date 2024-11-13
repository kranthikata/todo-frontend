// ProfileModal.js
import React, { useState } from "react";
import axios from "axios";

const ProfileModal = ({ user, isOpen, onClose, onUpdate }) => {
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState("");
  const initial = user.name ? user.name[0].toUpperCase() : "";

  const { token } = JSON.parse(localStorage.getItem("user"));

  // Submit handler for profile update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {};
    if (name) updatedData.name = name;
    if (email) updatedData.email = email;
    if (password) updatedData.password = password;

    try {
      await axios.put(
        "https://todo-backend-e1sp.onrender.com/api/user/profile",
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onUpdate(updatedData); // Update the parent component
      onClose(); // Close the modal after update
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
          <button
            className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 text-2xl font-semibold"
            onClick={onClose}
          >
            &times;
          </button>
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
              {initial}
            </div>
            <h2 className="text-xl font-bold mt-4 text-black">{user.name}</h2>
            <p className="text-gray-700">{user.email}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-800">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Update name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Update email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Update password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default ProfileModal;
