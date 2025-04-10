"use client";
import React, { useEffect, useState } from "react";
import Member from "./member";
import { BeatLoader } from "react-spinners";

const MemberList = (props) => {
  const roomID = props.room;
  //   console.log(roomID);
  const [loading, setLoading] = useState(true);
  const [member, setMember] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/room/member?roomID=${roomID}`)
      .then((res) => res.json())
      .then((data) => {
        setMember(data.data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <BeatLoader color="#3b82f6" size={15} />
      </div>
    );
  }

  return (
    <div className="w-full mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Member in this room
        </h5>
      </div>
      <div className="flow-root">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          {member.map((mb) => (
            <Member
              key={mb._id}
              username={mb.user.username}
              email={mb.user.email}
              role={mb.withRole}
            />
          ))}
          <Member />
        </ul>
      </div>
    </div>
  );
};

export default MemberList;
