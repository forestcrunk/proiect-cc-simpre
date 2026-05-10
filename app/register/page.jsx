'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/utils/authContext';
import { registerUser } from '@/utils/userFunctions';

export default function Login() {
  const { setIsLoggedIn } = useAuth(); 
  
  const [user, setUser] = useState({ username: '', email: '', password: '' });
  const [err, setErr] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkLogin = () => {
      const userId = sessionStorage.getItem('userId');
      if (userId) {
        setIsLoggedIn(true);
        router.push('/');
      } else {
        setIsLoggedIn(false);
      }
    };
    checkLogin();
  }, [setIsLoggedIn, router]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErr('');
    setSuccess('');
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser({
            username: user.username,
            email: user.email,
            password: user.password
      })
      console.log(response)
      
      if (!response.error) {
        alert("Registration successful! Please login with your new account.")
        router.push('/login')
      } else {
        setErr(response.error || 'Registration failed');
      }
    } catch (err) {
      setErr('An error occurred. Please try again.');
      console.log(err)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-2xl rounded-lg p-8 max-w-md w-full border border-gray-200">
          <form onSubmit={registerSubmit} className="space-y-4">
            <h3 className="text-2xl font-bold text-center">Register</h3>
            <div>
              <label className="block text-sm font-medium">Username</label>
              <input
                type="username"
                name="username"
                value={user.username}
                onChange={onChangeInput}
                required
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={onChangeInput}
                required
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={onChangeInput}
                required
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
            >
              Register
            </button>
            <p className="text-sm text-center">
              Already have an account?{' '}
              <span
                onClick={() => router.push("/login")}
                className="text-blue-500 hover:text-blue-700 cursor-pointer"
              >
                Login
              </span>
              .
            </p>
            <p className="text-sm text-center">
              Want to go back to the main page?{' '}
              <span
                onClick={() => router.push("/")}
                className="text-blue-500 hover:text-blue-700 cursor-pointer"
              >
                Click here
              </span>
              .
            </p>
            {err && <p className="text-red-500 text-center text-sm font-medium">{err}</p>}
            {success && <p className="text-green-500 text-center text-sm font-medium">{success}</p>}
          </form>
      </div>
    </div>
  );
}