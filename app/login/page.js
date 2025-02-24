"use client";
import Link from "next/link";
import React, { useState } from "react";
import { BeatLoader } from "react-spinners";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const handlerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      }); // name same name as app/api/auth/[...nextauth]/route.js

      if (res?.error) {
        setError(res?.error);
        setLoading(false);
        return;
      }

      router.replace("/");
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" }); // Redirect after Google sign-in
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
      <h2 className="text-2xl py-4">Login Account</h2>

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
              onChange={(e) => setUsername(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              id="password"
              type="password"
              placeholder="Enter your password"
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
                "Login"
              )}
            </button>
          </div>
        </form>

        <div className="flex flex-col items-center justify-center py-4">
          <span className="bg-white px-4 text-sm text-gray-500">
            If you don't have account
          </span>
          <Link href={`/register`} className="hover:text-blue-700">
            Register here
          </Link>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-b border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-sm text-gray-500">or</span>
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full text-blue-500 hover:text-white py-2 rounded flex items-center justify-center gap-2 hover:bg-blue-600"
          >
            <img
              src="https://cdn.jsdelivr.net/npm/simple-icons@7.17.0/icons/google.svg"
              alt="Google Logo"
              width={20}
              height={20}
              className="p-0.5" // Optional styling for better contrast
            />
            <span className="font-medium">Sign in with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
