import React from 'react'

const Welcome = () => {
  return (
    <div className="w-full h-[60vh] flex items-center justify-center text-center px-6 bg-gray-50">
      <div className="max-w-3xl">
        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800">
          Find Learning Partners
        </h2>
        <h3 className="text-xl sm:text-2xl text-gray-600 mt-2">
          Learn, Share, and Improve Together
        </h3>
        <h1 className="text-5xl sm:text-6xl font-extrabold text-blue-600 mt-4">
          Grow Together
        </h1>
        <p className="text-md sm:text-lg text-gray-500 mt-6">
          Connect with others, share knowledge, and reach your goals faster with peer learning.
        </p>
        <div className="mt-8">
          <a 
            href="/room"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full text-md transition duration-200"
          >
            Let's Start
          </a>
        </div>
      </div>
    </div>
  );
}

export default Welcome
