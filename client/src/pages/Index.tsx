import React from 'react'
import AppLayout from '../components/layout/AppLayout'

const Index = () => {
  return (
    <div className='w-full h-[calc(100vh-4rem)] overflow-scroll bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
      <div className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
          
          {/* Hero Section */}
          <div className="text-center mb-10">
            <div className="mb-8">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-400 dark:via-purple-400 dark:to-blue-300 bg-clip-text text-transparent leading-tight">
                Welcome to
                <span className="block mt-2 text-5xl font-black">
                  TalkSphere
                </span>
              </h1>
            </div>
            
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Your space to <span className="font-semibold text-blue-600 dark:text-blue-400">connect</span>, 
              <span className="font-semibold text-purple-600 dark:text-purple-400"> chat</span>, and 
              <span className="font-semibold text-blue-600 dark:text-blue-400"> share</span> — instantly.
            </p>
            
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Real-time messaging with socket.io
              </span>
            </div>
          </div>

          {/* Description Section */}
          <div className="text-center mb-10">
            <div className="max-w-4xl mx-auto">
              <p className="text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                TalkSphere is a modern real-time chat platform built for effortless communication. 
                Developed by <span className="font-bold text-blue-600 dark:text-blue-400">Ankit Singh Rajput</span>, 
                it brings together friends, teams, and communities with a smooth and engaging experience.
              </p>
            </div>
          </div>

       

          {/* Call to Action */}
          <div className="text-center text-xl text-gray-500">
               Get Started - Select a friend to chat
          </div>

        </div>
      </div>
    </div>
  )
}

export default AppLayout({})(Index);