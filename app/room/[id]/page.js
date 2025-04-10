"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { BeatLoader } from "react-spinners";
import Swal from "sweetalert2";
import MemberList from "@/app/components/roomID/memberList";

const Page = () => {
  const params = useParams();
  const roomID = params.id; // Get the dynamic ID

  const router = useRouter();

  const { data: session } = useSession();
  const userId = session?.user?.id || null;
  // console.log(userId);
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (!roomID) return;

    fetch(`/api/room/${roomID}`)
      .then((res) => res.json())
      .then((data) => {
        setRoom(data.data);
        setLoading(false);
      });

    if (!session || !userId || !roomID) return;

    fetch(`/api/join/check?userID=${userId}&roomID=${roomID}`)
      .then((res) => res.json())
      .then((data) => {
        setIsRegistered(data.registered);
        setIsOwner(data.owner);
        // console.log(data.registered);
      });
  }, [session, roomID]);

  if (loading || !room) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <BeatLoader color="#3b82f6" size={15} />
      </div>
    );
  }

  const handlerSubmitAttend = async (e) => {
    e.preventDefault();
    if (!userId) {
      router.push("/login");
      return;
    }

    const result = await Swal.fire({
      title: "Confirm",
      text: "Continue to attend this room",
      icon: "info",
      confirmButtonText: "confirm",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:3000/api/join`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: userId,
            room: roomID,
            withRole: "participant",
          }),
        });

        if (res.ok) {
          const popup = await Swal.fire({
            title: "Registed",
            text: "Already register to attend",
            icon: "success",
            confirmButtonText: "Close",
          });
          if (popup.isConfirmed){
            // router.push(`/room/${roomID}`)
            window.location.reload();
          }
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error.message || "Something went wrong!",
          icon: "error",
          confirmButtonText: "Close",
        });
      }
    }
  };

  const handlerSubmitCancel = async (e) => {
    e.preventDefault();
    if (!userId) {
      router.push("/login");
      return;
    }

    const result = await Swal.fire({
      title: "Cancel to Attend",
      text: "You want to cancel to attend this room?",
      icon: "warning",
      confirmButtonText: "confirm",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:3000/api/join/cancel`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            roomId: roomID,
          }),
        });

        // const data = await res.json();
        if (res.ok) {
          const popup = await Swal.fire({
            title: "Cancel Success",
            text: "Already cancel to attend",
            icon: "success",
            confirmButtonText: "Close",
          });

          if (popup.isConfirmed) {
            router.push("/room");
          }
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error.message || "Something went wrong!",
          icon: "error",
          confirmButtonText: "Close",
        });
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto ">
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md dark:bg-gray-800 dark:text-white">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {room.name}
          </h1>
          {!isOwner ? (
            isRegistered ? (
              <button
                onClick={(e) => handlerSubmitCancel(e)}
                className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-sm transition duration-150 ease-in-out"
              >
                Cancel Attend
              </button>
            ) : (
              <button
                onClick={(e) => handlerSubmitAttend(e)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-sm transition duration-150 ease-in-out"
              >
                Register
              </button>
            )
          ) : (
            <button
              className="bg-gray-400 cursor-not-allowed text-white text-sm font-medium py-2 px-4 rounded-lg shadow-sm transition duration-150 ease-in-out"
              disabled
            >
              You are Onwer
            </button>
          )}
        </div>

        <div className="mb-4">
          <span className="inline-block text-sm font-medium text-gray-500 dark:text-gray-300 mr-2">
            Room Type:
          </span>
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold dark:bg-blue-900 dark:text-blue-200">
            {room.type}
          </span>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-1">Description</h2>
          <p className="text-gray-700 dark:text-gray-300">{room.description}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Date & Time
          </h3>
          <p className="text-gray-800 dark:text-white">
            {new Date(room.date).toLocaleString("en-US", {
              weekday: "long", // e.g., "Tuesday"
              year: "numeric", // e.g., "2025"
              month: "long", // e.g., "April"
              day: "numeric", // e.g., "2"
              hour: "numeric", // e.g., "3"
              minute: "2-digit", // e.g., "00"
              hour12: true, // Use 12-hour time with AM/PM
            })}
          </p>
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Max People
          </h3>
          <p className="text-gray-800 dark:text-white">{room.person}</p>
        </div>
      </div>

      <MemberList room={roomID}/>
    </div>
  );
};

export default Page;
