import React from 'react'

const Notification = () => {
  return (
    <div className="absolute top-full right-4 w-80 max-w-[90vw] bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 z-50 mt-2 max-h-96 overflow-y-auto">
          <div className="p-4">
            <div className="dark:text-gray-100 text-gray-700">
              <h3 className="text-lg font-semibold mb-4">Notifications</h3>
              <div className="space-y-2">
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                  <p className="text-sm">New message in General group</p>
                  <span className="text-xs text-gray-500">2 minutes ago</span>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                  <p className="text-sm">John joined the chat</p>
                  <span className="text-xs text-gray-500">5 minutes ago</span>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                  <p className="text-sm">You were mentioned in Team discussion</p>
                  <span className="text-xs text-gray-500">10 minutes ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default Notification