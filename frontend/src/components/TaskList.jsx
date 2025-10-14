import API from "../api/axios";

export default function TaskList({ tasks, fetchTasks, loading }) {
  const handleDelete = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const handleStatusChange = async (id, status) => {
    await API.put(`/tasks/${id}`, { status });
    fetchTasks();
  };

  if (loading)
    return <p className="text-center text-gray-500 mt-6">Loading tasks...</p>;

  if (tasks.length === 0)
    return <p className="text-center text-gray-600 mt-6">No tasks yet.</p>;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((t) => (
        <div
          key={t._id}
          className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
        >
          <h3 className="font-semibold text-lg">{t.title}</h3>
          <p className="text-gray-600 mb-2">{t.description}</p>
          <select
            value={t.status}
            onChange={(e) => handleStatusChange(t._id, e.target.value)}
            className="border rounded-md px-2 py-1 text-sm mb-2"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <button
            onClick={() => handleDelete(t._id)}
            className="block w-full bg-red-500 text-white py-1 rounded-md hover:bg-red-600 mt-2"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
