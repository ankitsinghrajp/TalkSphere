import React, { Suspense } from 'react'

const Search = () => {
  return (
      <div className="absolute top-full right-4 w-80 max-w-[90vw] bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 z-50 mt-2">
        <Suspense fallback={<>This is me guys</>}>
              <div className="p-4">
            This is the search
          </div>
        </Suspense>
        </div>
  )
}

export default Search