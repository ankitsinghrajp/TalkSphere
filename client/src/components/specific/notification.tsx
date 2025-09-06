import { memo } from "react";
import { SampleNotifications } from "../constants/sampleData"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Check, X } from "lucide-react";

const Notification = () => {

  const friendRequestHandler = ({_id, accept})=>{
    console.log("handler is calling guys!");
  }

  return (
    <div className="absolute top-full right-4 w-80 max-w-[90vw] bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 z-50 mt-2 max-h-96 overflow-hidden flex flex-col">
      {/* Fixed Header */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 sticky top-0 z-10">
        <h3 className="text-lg text-center font-semibold text-gray-900 dark:text-gray-100">Notifications</h3>
      </div>
      
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-1">
          <div className="dark:text-gray-100 text-gray-700">
            {SampleNotifications.length > 0 ?   
              <div className="space-y-2 h-[400px] pt-5 overflow-scroll">
                {SampleNotifications.map((notification)=>{
                  return <NotificationItem 
                    sender={notification.sender}
                    _id={notification._id}
                    handler={friendRequestHandler} 
                    key={notification._id}
                  /> 
                })}
              </div> : 
              <div className="text-sm dark:text-gray-500 text-gray-600 text-center py-8">
                No new Notification
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

const NotificationItem = memo(({sender, _id, handler}) => {
  const {name, avatar} = sender;
    
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3 mx-2 my-1 
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
            <span className="font-semibold">{name}</span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            sent you a friend request
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2">
        <Button
          onClick={() => handler({_id, accept: true})}
          variant="outline"
          size="icon"
          className="h-8 w-8 p-0
                     border-green-300 dark:border-green-600
                     bg-green-50 dark:bg-green-900/20
                     text-green-600 dark:text-green-400
                     hover:bg-green-100 dark:hover:bg-green-800/30
                     hover:border-green-400 dark:hover:border-green-500
                     hover:text-green-700 dark:hover:text-green-300
                     focus:ring-2 focus:ring-green-500/20
                     transition-all duration-200
                     group/accept"
        >
          <Check className="h-4 w-4 group-hover/accept:scale-110 
                           transition-transform duration-200" />
        </Button>
        
        <Button
          onClick={() => handler({_id, accept: false})}
          variant="outline"
          size="icon"
          className="h-8 w-8 p-0
                     border-red-300 dark:border-red-600
                     bg-red-50 dark:bg-red-900/20
                     text-red-600 dark:text-red-400
                     hover:bg-red-100 dark:hover:bg-red-800/30
                     hover:border-red-400 dark:hover:border-red-500
                     hover:text-red-700 dark:hover:text-red-300
                     focus:ring-2 focus:ring-red-500/20
                     transition-all duration-200
                     group/decline"
        >
          <X className="h-4 w-4 group-hover/decline:scale-110 
                       transition-transform duration-200" />
        </Button>
      </div>
    </div>
  );
});

export default Notification