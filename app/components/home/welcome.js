import React from 'react'

const Welcome = () => {
 
  return (
    <div className="relative w-full h-[70vh] flex items-center justify-center text-center px-6 overflow-hidden">
      {/* Beautiful Gradient & Radial Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-200 via-purple-100 to-blue-200">
        <div className="absolute inset-0 bg-white opacity-40 mix-blend-overlay"></div>
      </div>

      {/* Abstract Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-purple-300 rounded-full opacity-30 animate-bounce-slow"></div>
      <div className="absolute bottom-10 right-20 w-24 h-24 bg-pink-300 rounded-full opacity-40 animate-pulse"></div>
      <div className="absolute top-1/3 left-1/3 w-20 h-20 bg-blue-200 rounded-full opacity-50 animate-float"></div>

      {/* Main Content */}
      <div className="relative max-w-4xl z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 drop-shadow-lg">
          Finding Learning Partners,
        </h2>
        <h3 className="text-2xl sm:text-3xl md:text-4xl text-gray-700 mt-3 drop-shadow-md">
          The Best Way to Improve Together
        </h3>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black italic text-purple-700 mt-4 drop-shadow-2xl">
          Grow Together
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mt-6">
          Connect with like-minded learners, share knowledge, and achieve your goals faster!
        </p>
        <div className="mt-8">
          <a 
            href="/room"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition duration-300 transform hover:scale-105"
          >
            Let's start
          </a>
        </div>
      </div>
    </div>
  );
    // return (
  //   <div className='content-center text-center sm:p-8 md:p-16 lg:px-32 lg:py-16 bg-pink-50'>
  //       <h2 className='text-4xl font-bold py-2'>Finding Learning Partners,</h2>
  //       <h3 className='text-3xl py-2'>the best way can improve</h3>
  //       <h1 className='text-6xl font-black italic py-4'>Grow Together</h1>
  //   </div>
  // )
}

export default Welcome