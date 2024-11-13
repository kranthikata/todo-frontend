import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoItem from "./TodoItem";
import ProfileModal from "./ProfileModel";
import EditModal from "./EditModel";
import { toast } from "react-toastify";

const Dashboard = ({ history }) => {
  const { user } = JSON.parse(localStorage.getItem("user")) || null;
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("pending");
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [loggedUser, setUser] = useState(user);
  const { token } = JSON.parse(localStorage.getItem("user")) || "";

  const statuses = ["done", "pending", "in progress", "completed"];

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, [loggedUser]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        "https://todoapp-smr2.onrender.com/api/todos/",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTodos(response.data.todos || []);
      console.log(response);
    } catch (error) {
      setTodos([]);
    }
  };

  const createTodo = async () => {
    if (!title) return alert("Title can't be empty");
    try {
      const newTodo = { title, status };
      await axios.post(
        "https://todoapp-smr2.onrender.com/api/todos/",
        newTodo,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchTodos();
      setTitle("");
      setStatus("pending");
      toast.success("Todo Added");
    } catch (error) {
      toast.error("Failed to add todo");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://todoapp-smr2.onrender.com/api/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTodos();
      toast.success("Todo deleted successfully!");
    } catch (error) {
      toast.success("Failed to delete todo!");
    }
  };

  const updateTodo = async (id, updatedData) => {
    try {
      await axios.put(
        `https://todoapp-smr2.onrender.com/api/todos/${id}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchTodos();
      setShowEditModal(false);
      toast.success("Todo updated successfully!");
    } catch (error) {
      toast.success("Failed to update todo");
    }
  };

  const handleUserUpdate = (updatedUserData) => {
    // Update user data in state and localStorage
    setUser(updatedUserData);
    localStorage.setItem(
      "user",
      JSON.stringify({ token, user: updatedUserData })
    );
    toast.success("Profile Updated successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    history.replace("/");
    toast.success("Logout successful!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <nav className="flex justify-between items-center bg-blue-600 text-white p-4 rounded-md">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div>
          <button
            onClick={() => setProfileModalOpen(true)}
            className="text-white hover:underline mr-5"
          >
            Profile
          </button>
          <button onClick={handleLogout} className="text-white hover:underline">
            Logout
          </button>
        </div>
        <ProfileModal
          user={user}
          isOpen={isProfileModalOpen}
          onClose={() => setProfileModalOpen(false)}
          onUpdate={handleUserUpdate}
        />
      </nav>

      <div className="mt-6">
        <div className="flex items-center justify-between gap-4 mb-4">
          <input
            type="text"
            placeholder="Enter todo title"
            className="w-[70%] md:w-[80%] lg:w-[90%] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-[30%] md:w-[20%] lg:w-[10%] border py-2 mr-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {statuses.map((stat) => (
              <option key={stat} value={stat}>
                {stat}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={createTodo}
          className="px-2 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Todo
        </button>

        <h2 className="text-xl font-bold mt-8">Todos</h2>
        <div
          className={`mt-4 space-y-2 bg-cyan-100 py-5 rounded-sm ${
            todos.length !== 0 && "min-h-[50vh]"
          }`}
        >
          {todos.length === 0 ? (
            <div className="h-[50vh] flex flex-col justify-center items-center">
              <img
                src="https://res.cloudinary.com/duqopzabn/image/upload/v1731486172/rb_2148498596_lryhbn.png"
                alt="No Tasks"
                className="w-[60%] md:w-[30%]"
              />
              <h1 className="mt-3 text-4xl">No Tasks Found</h1>
            </div>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onDelete={deleteTodo}
                onEdit={() => {
                  setCurrentTodo(todo);
                  setShowEditModal(true);
                }}
              />
            ))
          )}
        </div>
      </div>

      {showEditModal && currentTodo && (
        <EditModal
          todo={currentTodo}
          onClose={() => setShowEditModal(false)}
          onSave={(updatedData) => updateTodo(currentTodo.id, updatedData)}
        />
      )}
    </div>
  );
};

export default Dashboard;
