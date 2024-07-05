// pages/dashboard.js
import { useState, useEffect } from "react";
import Head from "next/head";
import Sidebar from "@/components/sidebar";
import Layout from "@/layout/mainlayout";
import { ReactElement } from "react";
import Link from "next/link";
import axios from "../utils/axiosInstance";

type DashboardData = {
  id: string;
  name: string;
  projectsNumber: number;
  tasksNumber: number;
};
const initialData: DashboardData = {
  id: "1",
  name: "User",
  projectsNumber: 0,
  tasksNumber: 0,
};
export default function Dashboard() {
  const [data, setData] = useState<DashboardData>(initialData);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/dashboard");
        const { data } = response.data;
        setData(data);
      } catch (err) {
        alert("Error fetching data");
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Task Management App - Dashboard</title>
      </Head>

      <h2 className="text-2xl font-bold text-gray-700 mb-4">Main Dashboard</h2>

      <div className="text-gray-700 text-center text-5xl pt-28 pb-16 font-semibold">
        Welcome Back, {data.name}!
      </div>
      <div className="flex gap-8">
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-700">Your Projects</h3>
            <Link href={"/projects"} className="text-sm link">
              View projects
            </Link>
          </div>

          <p>
            You have <span className="font-bold">{data.projectsNumber}</span> projects assigned to
            you.
          </p>
        </div>
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-700">Your Tasks</h3>
            <Link href={"/tasks"} className="text-sm link">
              View Tasks
            </Link>
          </div>

          <p>
            You have <span className="font-bold">{data.tasksNumber}</span> tasks assigned to
            you.
          </p>
        </div>
      </div>
    </>
  );
}

Dashboard.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};
