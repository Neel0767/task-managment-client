// pages/dashboard.js
import Head from 'next/head';
import Sidebar from "@/components/sidebar";
import Layout from "@/layout/mainlayout";
import { ReactElement } from 'react';

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Task Management App - Dashboard</title>
      </Head>

        <h2 className="text-xl font-bold text-gray-700 mb-4">Main Dashboard</h2>

        <div className="flex-1 p-6">
          <div className="bg-white p-6 rounded-lg shadow-md mb-4">
            <h3 className="text-lg font-bold text-gray-700">Project Status</h3>
            <p className="text-gray-700">Details about the project status go here.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text@-lg font-bold text-gray-700">Task Status</h3>
            <p className="text-gray-700">Details about the task status go here.</p>
          </div>
        </div>
    </>
  );
}

Dashboard.getLayout = function getLayout(page: React.ReactNode) {
    return (
      <Layout>
        {page}
      </Layout>
    )
  }