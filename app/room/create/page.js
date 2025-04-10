"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { redirect } from "next/navigation";

const Page = () => {
  const [roomName, setRoomName] = useState("");
  const [roomType, setRoomType] = useState("sharing");
  const [roomDescription, setRoomDescription] = useState("");
  const [roomDate, setRoomDate] = useState("");
  const [roomTime, setRoomTime] = useState("");
  const [roomPerson, setRoomPerson] = useState(100);

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // const userRole = session?.user?.role || "user";
  const userRole = session?.user?.role;
  // console.log(session);

  const userId = session?.user?.id;

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const handlerSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Start loading

    const combinedDateTime = new Date(`${roomDate}T${roomTime}`);

    try {
      const res = await fetch(`http://localhost:3000/api/room/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: roomName,
          type: roomType,
          description: roomDescription,
          date: combinedDateTime.toISOString(),
          person: roomPerson,
          userID: userId,
        }),
      });

      const data = await res.json();
      // console.log(data);

      if (res.ok) {
        const form = e.target;
        form.reset();

        const result = await Swal.fire({
          title: "Success!",
          text: data.message,
          icon: "success",
          confirmButtonText: "Close",
        });

        if (result.isConfirmed) {
          router.push("/room");
        }
      }

      setLoading(false); // Stop loading after response
    } catch (err) {
      setLoading(false); // Stop loading on error
      Swal.fire({
        title: "Error!",
        text: err.message || "Something went wrong!",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
      <h2 className="text-2xl py-4">Create Room</h2>

      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md p-8 dark:bg-gray-800 dark:border-gray-700">
        <form onSubmit={handlerSubmit}>
          <div className="pb-4">
            <label
              htmlFor="roomname"
              className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
            >
              Room name
            </label>
            <input
              onChange={(e) => {
                // console.log(e.target.value);
                setRoomName(e.target.value);
              }}
              name="roomname"
              id="roomname"
              type="text"
              placeholder="Enter room name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <div className="pb-4">
            <label
              htmlFor="roomtype"
              className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
            >
              Select a room type
            </label>
            <select
              id="roomtype"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              defaultValue="sharing"
              onChange={(e) => {
                // console.log(e.target.value);
                setRoomType(e.target.value);
              }}
            >
              <option value="sharing">sharing</option>
              <option value="tutor" disabled={userRole !== "tutor"}>
                Tutor {userRole !== "tutor" ? "(Only for tutors)" : ""}
              </option>
            </select>
          </div>

          <div className="pb-4">
            <label
              htmlFor="description"
              className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
            >
              Room description
            </label>
            <textarea
              id="description"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
              onChange={(e) => {
                // console.log(e.target.value);
                setRoomDescription(e.target.value);
              }}
            ></textarea>
          </div>

          <div className="pb-4">
            <label
              htmlFor="roomdate"
              className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
            >
              Select a date
            </label>
            <div className="relative max-w-sm">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
              <input
                id="roomdate"
                type="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Select date"
                onChange={(e) => {
                  // console.log(e.target.value)
                  setRoomDate(e.target.value);
                }}
                min={today}
                required
              />
            </div>
          </div>
          <div className="pb-4">
            <label
              htmlFor="roomtime"
              className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
            >
              Select a time
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="time"
                id="roomtime"
                className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                min="00:00"
                max="23:59"
                onChange={(e) => {
                  // console.log(e.target.value)
                  setRoomTime(e.target.value);
                }}
                required
              />
            </div>
          </div>

          <div className="pb-4">
            <label
              htmlFor="roomperson"
              className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
            >
              Number of person
            </label>
            <input
              onChange={(e) => {
                // console.log(e.target.value)
                setRoomPerson(parseInt(e.target.value));
              }}
              name="roomperson"
              id="roomperson"
              type="number"
              placeholder="Enter room name"
              defaultValue={100}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                "Create"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
