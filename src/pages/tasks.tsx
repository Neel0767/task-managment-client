// pages/task/index.tsx
import Head from 'next/head';
import { useState, ChangeEvent } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Layout from '@/layout/mainlayout';

interface Task {
  id: number;
  priority: string;
  status: string;
  name: string;
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, priority: 'High', status: 'In Progress', name: 'Project Alpha' },
    { id: 2, priority: 'Medium', status: 'Pending', name: 'Project Beta' },
    { id: 3, priority: 'Low', status: 'Done', name: 'Project Gamma' },
  ]);

  const [newTask, setNewTask] = useState<Task>({ id: 0, priority: '', status: '', name: '' });
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleEditChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editingTask) {
      setEditingTask({ ...editingTask, [name]: value });
    }
  };

  const handleAddTask = () => {
    setTasks([...tasks, newTask]);
    setNewTask({ id: 0, priority: '', status: '', name: '' });
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleUpdateTask = () => {
    if (editingTask) {
      setTasks(tasks.map(t => (t.id === editingTask.id ? editingTask : t)));
      setEditingTask(null);
    }
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter(t => t.id !== taskId));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Head>
        <title>Tasks - Task Management App</title>
      </Head>

      <div className="flex items-center justify-center mb-8 mt-4">
        <span className="text-3xl font-bold text-gray-700">Task Management App</span>
      </div>

      <div className="flex max-w-7xl">
        <main className="flex-1 p-6">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Task Management</h2>
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-lg font-bold text-gray-700 mb-4">Add New Task</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="id"
                placeholder="Task ID"
                value={newTask.id}
                onChange={handleInputChange}
                className="p-2 border rounded"
              />
              <input
                type="text"
                name="name"
                placeholder="Project Name"
                value={newTask.name}
                onChange={handleInputChange}
                className="p-2 border rounded"
              />
              <input
                type="text"
                name="priority"
                placeholder="Task Priority"
                value={newTask.priority}
                onChange={handleInputChange}
                className="p-2 border rounded"
              />
              <input
                type="text"
                name="status"
                placeholder="Task Status"
                value={newTask.status}
                onChange={handleInputChange}
                className="p-2 border rounded"
              />
              <button onClick={handleAddTask} className="p-2 bg-blue-500 text-white rounded">
                Add Task
              </button>
            </div>
          </div>

          {editingTask && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-lg font-bold text-gray-700 mb-4">Edit Task</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="id"
                  placeholder="Task ID"
                  value={editingTask.id}
                  onChange={handleEditChange}
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Project Name"
                  value={editingTask.name}
                  onChange={handleEditChange}
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  name="priority"
                  placeholder="Task Priority"
                  value={editingTask.priority}
                  onChange={handleEditChange}
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  name="status"
                  placeholder="Task Status"
                  value={editingTask.status}
                  onChange={handleEditChange}
                  className="p-2 border rounded"
                />
                <button onClick={handleUpdateTask} className="p-2 bg-green-500 text-white rounded">
                  Update Task
                </button>
              </div>
            </div>
          )}

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-700 mb-4">Task Table</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border-gray-200 shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-100 text-gray-800">
                  <tr>
                    <th className="py-2 px-4 border">Task ID</th>
                    <th className="py-2 px-4 border">Task Priority</th>
                    <th className="py-2 px-4 border">Task Status</th>
                    <th className="py-2 px-4 border">Project Name</th>
                    <th className="py-2 px-4 border">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {tasks.map((task) => (
                    <tr key={task.id}>
                      <td className="py-2 px-4 border">{task.id}</td>
                      <td className="py-2 px-4 border">{task.priority}</td>
                      <td className="py-2 px-4 border">{task.status}</td>
                      <td className="py-2 px-4 border">{task.name}</td>
                      <td className="py-2 px-4 border flex space-x-2">
                        <button onClick={() => handleEditTask(task)} className="p-2 bg-yellow-500 text-white rounded">
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDeleteTask(task.id)} className="p-2 bg-red-500 text-white rounded">
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

Tasks.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
