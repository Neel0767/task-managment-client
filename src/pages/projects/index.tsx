import { useRouter } from "next/router";
import Layout from "@/layout/mainlayout";
import { FaPlus } from "react-icons/fa";
import { useState, useEffect, ChangeEvent } from "react";
import axios from "@/utils/axiosInstance";
import type { AxiosResponse } from "axios";

interface Project {
  id: number;
  title: string;
  description: string;
  assignedTeam: string;
  status: string;
}

export default function Projects() {
  const router = useRouter();
  const { projectId } = router.query;
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState<Omit<Project, "id">>({
    title: "",
    description: "",
    assignedTeam: "",
    status: "",
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res: AxiosResponse<{ data: Project[] }> = await axios.get(
          "/projects"
        );
        setProjects(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProjects();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleAddProject = async () => {
    try {
      const response: AxiosResponse<{ data: Project }> = await axios.post(
        "/projects",
        newProject
      );
      setProjects([...projects, response.data.data]);
      setNewProject({
        title: "",
        description: "",
        assignedTeam: "",
        status: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Projects List:</h2>
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full bg-white border-gray-200 shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-800">
              <tr>
                <th className="py-2 px-4 border">Task Name</th>
                <th className="py-2 px-4 border">Project Description</th>
                <th className="py-2 px-4 border">Assigned Team</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {projects.length ? (
                projects.map((data) => (
                  <tr key={data.id}>
                    <td className="py-2 px-4 border">{data.title}</td>
                    <td className="py-2 px-4 border">{data.description}</td>
                    <td className="py-2 px-4 border">{data.assignedTeam}</td>
                    <td className="py-2 px-4 border">{data.status}</td>
                    <td className="py-2 px-4 border">
                      <a href={`/projects/${data.id}`}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-4">
                          View Details
                        </button>
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    No Data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={newProject.title}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="description"
            placeholder="Project Description"
            value={newProject.description}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="assignedTeam"
            placeholder="Assigned Team"
            value={newProject.assignedTeam}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="status"
            placeholder="Task Status"
            value={newProject.status}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <button
            type="button"
            className="p-2 flex justify-center items-center bg-blue-500 text-white rounded"
            onClick={handleAddProject}
          >
            <FaPlus />
            <span className="m-3">Add Project</span>
          </button>
        </div>
      </div>
    </div>
  );
}

Projects.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};
