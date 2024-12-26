import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/User/userSlice";
import { AiOutlinePlus, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"; // Icons
import { FaCheck, FaTimes } from "react-icons/fa"; // Check and cross icons

function Task() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    category: "",
  });
  const [editTaskId, setEditTaskId] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3003/api/task", {
          withCredentials: true,
        });
        setTasks(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch tasks");
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3003/api/auth/logout"
      );
      alert(response.data.message);
      dispatch(signoutSuccess());
      navigate("/login");
    } catch (err) {
      alert("Failed to log out");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleCreateOrEditTask = async (e) => {
    e.preventDefault();
    try {
      if (editTaskId) {
        const response = await axios.put(
          `http://localhost:3003/api/task/${editTaskId}`,
          newTask,
          { withCredentials: true }
        );
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === editTaskId ? { ...task, ...response.data.task } : task
          )
        );
        alert("Task updated successfully");
      } else {
        const response = await axios.post(
          "http://localhost:3003/api/task",
          newTask,
          { withCredentials: true }
        );
        setTasks([...tasks, response.data.task]);
        alert("Task created successfully");
      }
      setShowModal(false);
      setEditTaskId(null);
    } catch (err) {
      alert("Failed to save task");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3003/api/task/${id}`, {
        withCredentials: true,
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      alert("Task deleted successfully");
    } catch (err) {
      alert("Failed to delete task");
    }
  };

  const handleMarkAsCompleted = async (id, isCompleted) => {
    try {
      await axios.patch(
        `http://localhost:3003/api/task/${id}/status`,
        {
          isCompleted: !isCompleted,
        },
        {
          withCredentials: true,
        }
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, isCompleted: !isCompleted } : task
        )
      );
    } catch (err) {
      alert("Failed to update task status");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-center">Task List</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <button
        onClick={() => {
          setShowModal(true);
          setEditTaskId(null);
          setNewTask({ title: "", description: "", dueDate: "", category: "" });
        }}
        className="bg-green-500 text-white px-4 py-2 rounded-md shadow flex items-center hover:bg-green-600 transition mb-4"
      >
        <AiOutlinePlus className="mr-2" />
        Add Task
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4">
              {editTaskId ? "Edit Task" : "Create New Task"}
            </h2>
            <form onSubmit={handleCreateOrEditTask}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={newTask.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={newTask.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Due Date
                </label>
                <input
                  type="datetime-local"
                  name="dueDate"
                  value={
                    newTask.dueDate
                      ? new Date(newTask.dueDate).toISOString().slice(0, 16)
                      : ""
                  }
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  name="category"
                  value={newTask.category}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  required
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  {editTaskId ? "Update Task" : "Create Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search tasks by title or category"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {loading ? (
        <p>Loading tasks...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : filteredTasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        <ul className="space-y-4">
          {filteredTasks.map((task) => (
            <li
              key={task._id}
              className={`p-4 bg-white rounded-lg shadow-md flex justify-between items-center ${
                task.isCompleted ? "line-through bg-gray-200" : ""
              }`}
            >
              <div>
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p className="text-sm text-gray-500">{task.description}</p>
                <p className="text-sm text-gray-500">
                  Due Date: {new Date(task.dueDate).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  Category: {task.category}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() =>
                    handleMarkAsCompleted(task._id, task.isCompleted)
                  }
                  className={`p-2 rounded-md shadow ${
                    task.isCompleted
                      ? "bg-red-500 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {task.isCompleted ? <FaTimes /> : <FaCheck />}
                </button>
                <button
                  onClick={() => {
                    setEditTaskId(task._id);
                    setNewTask({
                      title: task.title,
                      description: task.description,
                      dueDate: task.dueDate,
                      category: task.category,
                    });
                    setShowModal(true);
                  }}
                  className="bg-blue-500 text-white p-2 rounded-md shadow hover:bg-blue-600"
                >
                  <AiOutlineEdit />
                </button>
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="bg-red-500 text-white p-2 rounded-md shadow hover:bg-red-600"
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Task;
