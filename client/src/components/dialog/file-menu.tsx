import React from 'react'

const FileMenu = ({ anchorE1, onClose, isOpen }) => {
  if (!isOpen) return null;
  
  return (
    <div className="absolute bottom-full mb-2 left-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 min-w-[200px] z-50">
      <div className="text-sm text-gray-900 dark:text-gray-100 mb-3 font-medium">
        Attach Files
      </div>
      
      <div className="space-y-2">
        <button 
          className="flex items-center w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
          onClick={() => {
            console.log('Upload File clicked');
            // Add your file upload logic here
          }}
        >
          <span className="mr-2">📁</span>
          Upload File
        </button>
        
        <button 
          className="flex items-center w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
          onClick={() => {
            console.log('Upload Image clicked');
            // Add your image upload logic here
          }}
        >
          <span className="mr-2">📷</span>
          Upload Image
        </button>
        
        <button 
          className="flex items-center w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
          onClick={() => {
            console.log('Upload Document clicked');
            // Add your document upload logic here
          }}
        >
          <span className="mr-2">📄</span>
          Upload Document
        </button>
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-600 mt-3 pt-2">
        <button 
          onClick={onClose}
          className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          ✕ Close Menu
        </button>
      </div>
    </div>
  )
}

export default FileMenu