import React, { Suspense } from 'react'

const NewGroup = () => {
  return (
    <div className="absolute top-full right-4 w-80 max-w-[90vw] bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 z-50 mt-2">
      <Suspense fallback={<>This is you guys</>}>
          <div className="p-4">
            <div className="dark:text-gray-100 text-gray-700">
              <h3 className="text-lg font-semibold mb-4">Create New Group</h3>
              <div className="space-y-3">
                <input 
                  type="text" 
                  placeholder="Group name..." 
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                />
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors">
                  Create Group
                </button>
              </div>
            </div>
          </div>
           </Suspense>
        </div>
  )
}

export default NewGroup