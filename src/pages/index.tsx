// pages/index.js

import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Head>
        <title>Task Management App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-8">Welcome to Task Management App</h1>
        <p className="text-lg text-gray-600 mb-8">
          Manage your tasks efficiently with our easy-to-use task management application.
        </p>
        <div className="flex space-x-6 mb-16">
          <Link href="/login">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md transition duration-300 block text-center">
              Login
            </button>
          </Link>
          <Link href="/register">
            <button className="bg-gray-800 hover:bg-gray-900 text-white py-3 px-6 rounded-lg shadow-md transition duration-300 block text-center">
              Register
            </button>
          </Link>
        </div>

        {/* Feature Section */}
        <section className="w-full bg-gray-200 py-16 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Why Choose Our Task Management App?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Easy Task Management</h3>
                <p className="text-gray-600">
                  Simplify your workflow with intuitive task management features. Organize tasks, set priorities, and track progress effortlessly.
                </p>
              </div>
              {/* Feature 2 */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Collaborate Effectively</h3>
                <p className="text-gray-600">
                  Foster teamwork by assigning tasks, sharing updates, and collaborating with team members in real-time.
                </p>
              </div>
              {/* Feature 3 */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Insightful Analytics</h3>
                <p className="text-gray-600">
                  Gain valuable insights with analytics tools. Monitor project performance, identify bottlenecks, and make data-driven decisions.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
