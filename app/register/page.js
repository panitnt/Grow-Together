"use client";
import Link from "next/link";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { BeatLoader } from "react-spinners"; 

const RegisterPage = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handlerSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Start loading

    if (password !== repassword) {
      setError("Password Not match!!!");
      setLoading(false); // Stop loading if validation fails
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      setLoading(false); // Stop loading after response

      if (res.ok && data.success) {
        const form = e.target;
        form.reset();
        Swal.fire({
          title: "Success!",
          text: data.message,
          icon: "success",
          confirmButtonText: "Close",
        });
      } else {
        Swal.fire({
          title: "Warning!",
          text: data.message,
          icon: "warning",
          confirmButtonText: "Close",
        });
      }
    } catch (error) {
      setLoading(false); // Stop loading on error
      Swal.fire({
        title: "Error!",
        text: error.message || "Something went wrong!",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
      <h2 className="text-2xl py-4">Please Register Account</h2>

      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md p-8 dark:bg-gray-800 dark:border-gray-700">
        <form onSubmit={handlerSubmit}>
          <div className="pb-4">
            <label
              htmlFor="username"
              className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
            >
              Username
            </label>
            <input
              onChange={(e) => setUserName(e.target.value)}
              name="username"
              id="username"
              type="text"
              placeholder="Enter your username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <div className="pb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              id="email"
              type="email"
              placeholder="Enter your email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <div className="pb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              id="password"
              type="password"
              placeholder="Enter your password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <div className="pb-4">
            <label
              htmlFor="repassword"
              className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
            >
              Confirm Password
            </label>
            <input
              onChange={(e) => setRePassword(e.target.value)}
              name="repassword"
              id="repassword"
              type="password"
              placeholder="Confirm your password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          {error && (
            <div className="text-sm text-red-700">
              <p>{error}</p>
            </div>
          )}

          <div className="flex flex-col items-center">
            <button
              type="submit"
              className={`${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-700"
              } text-white font-bold py-2 px-4 rounded-full flex items-center justify-center`}
              disabled={loading} // Disable button during loading
            >
              {loading ? (
                <BeatLoader size={10} color="#ffffff" loading={true} />
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>

        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-b border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-sm text-gray-500">
              If you already have an account
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <Link href={`/login`} className="hover:text-blue-700">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
