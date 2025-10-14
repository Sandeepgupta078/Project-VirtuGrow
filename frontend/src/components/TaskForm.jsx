import { useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";

export default function TaskForm({ fetchTasks }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return toast.error("Title is required");

        setLoading(true);
        try {
            await API.post("/tasks", { title, description });
            setTitle("");
            setDescription("");
            fetchTasks();
            toast.success("Task added successfully");
        } catch(err) {
            toast.error(err.response?.data?.message || 'Failed to add task');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md p-4 rounded-lg mb-4 flex flex-col sm:flex-row gap-3"
        >
            <input
                type="text"
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-2 rounded-md flex-1"
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 rounded-md flex-1"
            />
            <button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
                {loading ? "Adding..." : "Add Task"}
            </button>
        </form>
    );
}
