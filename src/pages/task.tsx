// pages/task/[taskId].js
import Head from 'next/head';
import { useRouter } from 'next/router';
import Sidebar from '@/components/sidebar';
import Layout from '@/layout/mainlayout';
import axiosInstance from '@/utils/axiosInstance';

export default function TaskDetail({ task }) {
  const router = useRouter();
  const { taskId } = router.query;

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Head>
        <title>Task {task.id} - Task Detail</title>
      </Head>

      <div className="flex flex-1 max-w-7xl">

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="bg-white p-6 rounded-lg shadow-md mb-4">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Task Details</h2>
            <div className="flex flex-col space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Task ID:</h3>
                <p className="text-gray-700">{task.id}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Task Priority:</h3>
                <p className="text-gray-700">{task.priority}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Task Status:</h3>
                <p className="text-gray-700">{task.status}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Task Description:</h3>
                <p className="text-gray-700">{task.description}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Task Table</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border-gray-200 shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-100 text-gray-800">
                  <tr>
                    <th className="py-2 px-4 border">Task ID</th>
                    <th className="py-2 px-4 border">Task Priority</th>
                    <th className="py-2 px-4 border">Task Status</th>
                    <th className="py-2 px-4 border">Project Name</th>
                    <th className="py-2 px-4 border">Feedback</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr>
                    <td className="py-2 px-4 border">{task.id}</td>
                    <td className="py-2 px-4 border">{task.priority}</td>
                    <td className="py-2 px-4 border">{task.status}</td>
                    <td className="py-2 px-4 border">{task.name}</td>
                    <td className="py-2 px-4 border">{task.feedback}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

TaskDetail.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { taskId } = context.params;

  try {
    const response = await axiosInstance.get(`/tasks/${taskId}`);
    const task = response.data;
    return {
      props: { task },
    };
  } catch (error) {
    console.error('Error fetching task:', error);
    return {
      props: { task: null },
    };
  }
}
