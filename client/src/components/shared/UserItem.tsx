import React, { memo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

const UserItem = ({ user, handler, handlerIsLoading=false, isAdded=false }) => {
  const { name, _id, avatar } = user;

  return (
    <li className="flex items-center justify-between gap-4 px-4 py-3 mx-2 my-1 
                   bg-white dark:bg-gray-800 
                   border border-gray-200 dark:border-gray-700
                   rounded-lg shadow-sm
                   hover:bg-gray-50 dark:hover:bg-gray-750
                   hover:border-gray-300 dark:hover:border-gray-600
                   hover:shadow-md
                   transition-all duration-200 ease-in-out
                   cursor-pointer
                   group">
      
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <Avatar className="h-10 w-10 ring-2 ring-transparent 
                          group-hover:ring-blue-500/20 
                          transition-all duration-200">
          <AvatarImage src={avatar || "https://github.com/shadcn.png"} />
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 
                                   text-white font-medium text-sm">
            {name ? name.charAt(0).toUpperCase() : "U"}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-gray-900 dark:text-gray-100
                         group-hover:text-blue-600 dark:group-hover:text-blue-400
                         transition-colors duration-200
                         truncate">
            {name}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400
                         truncate">
            ID: {_id ? _id: "N/A"}
          </div>
        </div>
      </div>
     {
      isAdded?<>
       <Button 
        variant="outline" 
        size="sm"
        onClick={()=>handler(_id)}
        disabled={handlerIsLoading}
        className="shrink-0 px-3 py-1.5 text-xs font-medium
                   border-gray-300 dark:border-red-600
                   
                   text-red-700 dark:text-red-400
                   hover:bg-red-50 dark:hover:bg-red-900/20
                   hover:border-red-300 dark:hover:border-red-600
                   hover:text-red-600 dark:hover:text-red-400
                   focus:ring-2 focus:ring-red-500/20
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-200"
      >   
          Remove
      </Button>
      </>
       :
      <Button 
        variant="outline" 
        size="sm"
        onClick={()=>handler(_id)}
        disabled={handlerIsLoading}
        className="shrink-0 px-3 py-1.5 text-xs font-medium
                   border-gray-300 dark:border-gray-600
                   bg-white dark:bg-gray-800
                   text-gray-700 dark:text-gray-300
                   hover:bg-blue-50 dark:hover:bg-blue-900/20
                   hover:border-blue-300 dark:hover:border-blue-600
                   hover:text-blue-600 dark:hover:text-blue-400
                   focus:ring-2 focus:ring-blue-500/20
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-200"
      >
        {handlerIsLoading ? (
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 border border-current border-t-transparent 
                           rounded-full animate-spin"></div>
            <span>Adding...</span>
          </div>
        ) : (
          "Add User"
        )}
      </Button>
     }
    </li>
  );
};

export default memo(UserItem);