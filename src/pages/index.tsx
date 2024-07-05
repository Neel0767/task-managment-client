// pages/index.js

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { SiGoogletagmanager } from "react-icons/si";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>Task Management App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 pt-20 pb-8 text-center bg-gradient-to-br from-blue-500 to-blue-700">
        <span>
          <SiGoogletagmanager className="text-8xl text-white" />
        </span>
        <h1 className="text-5xl font-bold text-white mb-2">
          Task management app
        </h1>
        <p className="text-lg text-gray-50/80 mb-8">
          Manage your tasks efficiently with our easy-to-use task management
          application.
        </p>
        <div className="flex gap-2">
          <Link href="/login">
            <button className="btn !bg-white hover:!bg-slate-200 !text-black text-lg">
              Login
            </button>
          </Link>
          <Link href="/register">
            <button className="btn ghost border-2 border-transparent !text-white hover:!text-slate-200 text-lg">
              Register
            </button>
          </Link>
        </div>
      </main>
      {/* Feature Section */}
      <section className="w-full bg-gray-200 py-10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Why choose our app?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Easy Task Management
              </h3>
              <p className="text-gray-600">
                Simplify your workflow with intuitive task management features.
                Organize tasks, set priorities, and track progress effortlessly.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Collaborate Effectively
              </h3>
              <p className="text-gray-600">
                Foster teamwork by assigning tasks, sharing updates, and
                collaborating with team members in real-time.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Insightful Analytics
              </h3>
              <p className="text-gray-600">
                Gain valuable insights with analytics tools. Monitor project
                performance, identify bottlenecks, and make data-driven
                decisions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
