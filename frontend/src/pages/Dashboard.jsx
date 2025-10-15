import { useEffect, useState } from "react";
import API from "../api/axios";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await API.get("/tasks");
      setTasks(res.data.tasks);
    } catch {
      if (err.response?.status === 401) {
        toast.error("Session expired, please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        toast.error("Failed to fetch tasks");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center my-6">My Tasks</h2>
      <TaskForm fetchTasks={fetchTasks} />
      <TaskList tasks={tasks} fetchTasks={fetchTasks} loading={loading} />
    </div>
  );
}
