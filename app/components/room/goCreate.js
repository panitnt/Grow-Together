import React from "react";

const GoCreate = () => {
  return (
    <div className="flex items-center justify-center bg-gray-100 px-6 py-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-bold text-gray-900">
            Let's Create Room
          </h2>
          <p className="text-lg text-gray-600 mt-4">
          Start you future now!
          </p>
          <div className="py-4">
            <a
              href="/room/create"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition"
            >
              Create Room
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative">
          <div className="bg-blue-100 rounded-lg p-6 shadow-lg">
            <img
              src="/images/Study.jpeg"
              alt="Illustration"
              className="w-full max-w-xs mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="p-8 bg-blue-200 text-center">
  //     <h2 className="text-5xl font-serif italic p-2">Let's Create Room</h2>
  //     <h4 className="text-2xl font-serif p-2">Start you future now</h4>
  //     <div className="mt-4">
  //       <a
  //         href="/room/create"
  //         className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full"
  //       >
  //         Create Room
  //       </a>
  //     </div>
  //   </div>
  // );
};

export default GoCreate;
