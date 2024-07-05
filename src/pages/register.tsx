// pages/register.js
import Head from "next/head";
import { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";
import { SiGoogletagmanager } from "react-icons/si";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await axiosInstance.post("/auth/register", {
        name: username,
        email,
        password,
      });
      alert("Registration successful!");
      const { accessToken, refreshToken } = response.data.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      router.push("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("There was an error registering!", error);
        alert(error?.response?.data.message || "Registration failed!");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Head>
        <title>Task Management App - Register</title>
      </Head>

      <div className="flex flex-col items-center mb-8">
        <SiGoogletagmanager className="text-7xl text-gray-700" />
        <span className="text-3xl font-bold text-gray-700">
          Task Management App
        </span>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <div className="flex flex-col items-center justify-center mb-4">
          <h2 className="text-2xl font-bold text-gray-700">
            Create an acoount
          </h2>
          <p className="text-gray-500">Get ahead, get productive!</p>
        </div>
        <form className="flex flex-col gap-4" onSubmit={formSubmitHandler}>
          <div>
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="block w-full"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full block"
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              className="w-full block"
              id="confirmPassword"
              type="password"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="btn w-full" type="submit">
              Register
            </button>
          </div>
        </form>
        <div className="mt-4">
          <p className="text-gray-500 text-sm text-center">
            Been here?{" "}
            <Link className="link" href={"/login"}>
              Login Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
