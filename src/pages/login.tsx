// pages/login.js
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axiosInstance from '../utils/axiosInstance';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post('/auth/login', {
        email: username,
        password,
      });

      const  accessToken  = response.data.data.accessToken;
      localStorage.setItem('accessToken', accessToken);

      alert('Login successful!');

      // Navigate to dashboard page
      router.push('/dashboard');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrors({ login: error.response.data.message });
      } else {
        alert('Login failed!');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Head>
        <title>Task Management App - Login</title>
      </Head>

      <div className="flex flex-col items-center mb-8">
        <span className="text-3xl font-bold text-gray-700">Task Management App</span>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-xl font-bold text-gray-700">Login</h2>
          <img src="/login.png" alt="Logo" width={40} height={40} className="ml-2" />
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errors.login && <p className="text-red-500 text-xs italic">{errors.login}</p>}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleLogin}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
