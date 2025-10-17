import React, { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import AvatarCard from './AvatarCard';
import { ArrowRight } from 'lucide-react';

const ChatItem = ({
    avatar = {},
    name,
    _id,
    groupChat = false,
    sameSender,
    isOnline,
    newMessageAlert,
    index = 0,
    handleDeleteChat
}) => {
    // Memoize the context menu handler
    const onContextMenu = useCallback((e) => {
        handleDeleteChat(e, _id, groupChat);
    }, [handleDeleteChat, _id, groupChat]);

    return (
        <Link 
            className='hover:text-decoration:none' 
            to={`/chat/${_id}`} 
            style={{
                textDecoration: "none",
                color: 'black',
                padding: '0',
            }}
            onContextMenu={onContextMenu}
        >
            <div className={`
                flex items-center justify-between relative 
                bg-white dark:bg-gray-800
                hover:bg-gray-50 dark:hover:bg-gray-800/50
                transition-all duration-200 ease-in-out
                border-l-4 ${sameSender ? "border-l-gray-800 dark:border-l-gray-200" : "border-l-transparent"}
                p-4 mx-2 my-1 rounded-lg
                shadow-sm hover:shadow-md
                group
            `}>
                <div className="flex items-center space-x-3 flex-1">
                    <div className="relative">
                        <AvatarCard avatar={avatar} />
                        {isOnline && (
                            <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 shadow-sm" />
                        )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                        <h3 className="text-gray-900 dark:text-white font-medium text-sm truncate">
                            {name}
                        </h3>
                        {newMessageAlert && (
                            <div className="flex items-center mt-1">
                                <div className="bg-gray-500 text-gray-100 text-xs px-2 py-1 rounded-full font-medium">
                                    {newMessageAlert.count}
                                </div>
                                <span className="text-gray-500 dark:text-gray-400 text-xs ml-2">
                                    new message{newMessageAlert.count > 1 ? 's' : ''}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <ArrowRight className='h-4 w-4 text-gray-800 dark:text-gray-300'/>
                </div>
            </div>
        </Link>
    );
};

// Memoize with custom comparison
export default memo(ChatItem, (prevProps, nextProps) => {
    return (
        prevProps._id === nextProps._id &&
        prevProps.sameSender === nextProps.sameSender &&
        prevProps.isOnline === nextProps.isOnline &&
        prevProps.name === nextProps.name &&
        prevProps.newMessageAlert?.count === nextProps.newMessageAlert?.count &&
        prevProps.handleDeleteChat === nextProps.handleDeleteChat
    );
});