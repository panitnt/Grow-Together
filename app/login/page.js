"use client";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
      <h2 className="text-2xl py-4">Login Account</h2>

      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md p-8 dark:bg-gray-800 dark:border-gray-700">
        <form action={``}>
          <div className="pb-4">
            <label
              htmlFor="username"
              className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
            >
              Username
            </label>
            <input
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
              htmlFor="password"
              className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              name="password"
              id="password"
              type="password"
              placeholder="Enter your password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Login
            </button>
          </div>
        </form>

        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-b border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-sm text-gray-500">If you don't have account</span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <Link href={`/register`} className="hover:text-blue-700">Register here</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
