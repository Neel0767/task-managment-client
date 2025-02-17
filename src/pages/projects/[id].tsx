// pages/projects/[projectId].tsx
import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "@/layout/mainlayout";
import { useState, useEffect, ChangeEvent } from "react";
import axios from "@/utils/axiosInstance";
import { FaEdit, FaTrashAlt, FaEye, FaSave } from "react-icons/fa";
interface Task {
  id: string;
  title: string;
  description: string;
  assignedTeam: string;
  status: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  tasks: Task[];
}

export default function ProjectDetail() {
  const router = useRouter();
  const projectId = router.query.id as string;
  const [project, setProject] = useState<Project | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    if (projectId) {
      const fetchProject = async () => {
        try {
          const res = await axios.get(`/projects/${projectId}`);
          setProject(res.data.data);
        } catch (err) {
          console.log(err);
        }
      };

      fetchProject();
    }
  }, [projectId]);

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setEditModalOpen(true);
  };

  const handleViewTask = (task: Task) => {
    setSelectedTask(task);
    setViewModalOpen(true);
  };

  const handleSaveEditTask = async () => {
    if (!selectedTask) return;

    try {
      const res = await axios.put(`/tasks/${selectedTask.id}`,
        selectedTask
      );
      console.log("Task updated:", res.data);
      setEditModalOpen(false);
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const handleEditProject = () => {
    setEditModalOpen(true);
  };

  const handleSaveEditProject = async () => {
    if (!project) return;

    try {
      const updatedProject = {
        title: project.title,
        description: project.description,
      };

      const res = await axios.put(
        `/projects/${projectId}`,
        updatedProject
      );
      console.log("Project updated:", res.data);
      setEditModalOpen(false);
    } catch (err) {
      console.error("Error updating project:", err);
    }
  };

  const handleDeleteProject = async () => {
    try {
      await axios.delete(`/projects/${projectId}`);
      console.log("Project deleted:", projectId);
      router.push("/projects"); // Redirect to projects list after deletion
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  const closeModal = () => {
    setViewModalOpen(false);
    setEditModalOpen(false);
    setSelectedTask(null);
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  let statusColor = "bg-yellow-500";
  if (project.status === "pending") {
    statusColor = "bg-red-500";
  } else if (project.status === "done") {
    statusColor = "bg-green-500";
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Head>
        <title>{project.title} - Projects</title>
      </Head>

      <main className="flex-1 p-6">
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Project Details
          </h2>
          <div className="flex flex-col space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Title:</h3>
              <p className="text-gray-700">{project.title}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                Description:
              </h3>
              <p className="text-gray-700">{project.description}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Actions:</h3>
              <div className="flex space-x-2 items-center">
                <button
                  onClick={handleEditProject}
                  className="flex items-center gap-1 p-2 bg-yellow-500 text-white rounded"
                >
                  <FaEdit />
                  <span className="ml-2">Edit</span>
                </button>
                <button
                  onClick={handleDeleteProject}
                  className="flex items-center gap-1 p-2 bg-red-500 text-white rounded"
                >
                  <FaTrashAlt />
                  <span className="ml-2">Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {viewModalOpen && selectedTask && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-700 mb-4">
                Task Details
              </h2>
              <div className="flex flex-col space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    Task Name:
                  </h3>
                  <p className="text-gray-700">{selectedTask.title}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    Assigned Team:
                  </h3>
                  <p className="text-gray-700">{selectedTask.assignedTeam}</p>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={closeModal}
                  className="p-2 bg-gray-300 text-gray-700 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {editModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-700 mb-4">
                {selectedTask ? "Edit Task" : "Edit Project"}
              </h2>
              {selectedTask ? (
                <div className="flex flex-col space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">
                      Task Name:
                    </h3>
                    <input
                      type="text"
                      value={selectedTask.title}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setSelectedTask({
                          ...selectedTask,
                          title: e.target.value,
                        })
                      }
                      className="p-2 border rounded"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">
                      Description:
                    </h3>
                    <input
                      type="text"
                      value={selectedTask.description}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setSelectedTask({
                          ...selectedTask,
                          description: e.target.value,
                        })
                      }
                      className="p-2 border rounded"
                    />
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={handleSaveEditTask}
                      className="p-2 bg-blue-500 text-white rounded"
                    >
                      <FaSave />
                      <span className="ml-2">Save</span>
                    </button>
                    <button
                      onClick={closeModal}
                      className="p-2 bg-gray-300 text-gray-700 rounded ml-2"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">
                      Project Title:
                    </h3>
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setProject({ ...project, title: e.target.value })
                      }
                      className="p-2 border rounded"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">
                      Project Description:
                    </h3>
                    <input
                      type="text"
                      value={project.description}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setProject({ ...project, description: e.target.value })
                      }
                      className="p-2 border rounded"
                    />
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={handleSaveEditProject}
                      className="p-2 bg-blue-500 text-white rounded"
                    >
                      <FaSave />
                      <span className="ml-2">Save</span>
                    </button>
                    <button
                      onClick={closeModal}
                      className="p-2 bg-gray-300 text-gray-700 rounded ml-2"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

ProjectDetail.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};
