import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import axiosInstance from "../utils/axiosInstance";
import axios from "axios";
import { SiGoogletagmanager } from "react-icons/si";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ login?: string }>({});
  const [isLoading, setIsLoading] = useState(false); // State to manage loading status
  const [showLoading, setShowLoading] = useState(false); // State to manage loading indicator visibility
  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true); // Start loading process
    try {
      const response = await axiosInstance.post("/auth/login", {
        email: username,
        password,
      });

      const accessToken = response.data.data.accessToken;
      localStorage.setItem("accessToken", accessToken);

      setIsLoading(false); // Stop loading after successful login
      router.push("/dashboard"); // Redirect to dashboard
    } catch (error) {
      setIsLoading(false); // Stop loading on error
      if (axios.isAxiosError(error)) {
        setErrors({ login: error.response?.data.message });
      } else {
        alert("Login failed!");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Head>
        <title>Task Management App - Login</title>
      </Head>

      <div className="flex flex-col items-center mb-8">
        <SiGoogletagmanager className="text-7xl text-gray-700" />
        <span className="text-3xl font-bold text-gray-700">
          Task Management App
        </span>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <div className="flex flex-col items-center justify-center mb-4">
          <h2 className="text-2xl font-bold text-gray-700">Welcome Back</h2>
          <p className="text-gray-500">Please enter your details.</p>
        </div>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <label
              className="text-gray-700 text-sm font-semibold block mb-2"
              htmlFor="username"
            >
              Email
            </label>
            <input
              className="block w-full"
              id="username"
              type="text"
              placeholder="yourmail@gmail.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label
              className="text-gray-700 text-sm font-semibold block mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="block w-full"
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errors.login && (
            <p className="text-red-500 text-xs italic">{errors.login}</p>
          )}
          <div className="flex items-center justify-between">
            <button
              className="btn w-full"
              type="button"
              onClick={handleLogin}
              disabled={isLoading || showLoading} // Disable button when loading or showLoading is true
            >
              Sign In
            </button>
          </div>
        </form>
        <div className="mt-4">
          <p className="text-gray-500 text-sm text-center">
            Not a registered user?{" "}
            <Link className="link" href={"/register"}>Register Now</Link>
          </p>
        </div>
      </div>

      {/* Loading indicator */}
      {showLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm">
            <p className="text-gray-700">Loading...</p>
            {/* Simulating loading with a spinner */}
            <div className="flex justify-center mt-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
