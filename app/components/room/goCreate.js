import React from "react";

const GoCreate = () => {
  return (
    <div className="p-8 bg-blue-200 text-center">
      <h2 className="text-5xl font-serif italic p-2">Let's Create Room</h2>
      <h4 className="text-2xl font-serif p-2">Start you future now</h4>
      <div className="mt-4">
        <a
          href="/room/create"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full"
        >
          Create Room
        </a>
      </div>
    </div>
  );
};

export default GoCreate;
