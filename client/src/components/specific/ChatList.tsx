import React, { memo, useMemo } from 'react';
import ChatItem from '../shared/ChatItem';

const ChatList = ({
    w = "100%",
    chats = [],
    chatId,
    onlineUsers = [],
    newMessagesAlert = [
        {
            chatId: "",
            count: 0,
        },
    ],
    handleDeleteChat,
}) => {
    // Memoize the chat items to prevent re-rendering all items
    const chatItems = useMemo(() => {
        return chats.map((data, index) => {
            const { avatar, _id, name, groupChat, members } = data;
            
            // Find new message alert for this chat
            const newMessageAlert = newMessagesAlert.find(
                ({ chatId }) => chatId === _id
            );

            // Check if user is online
            const isOnline = members?.some((member) => onlineUsers.includes(member));

            return (
                <ChatItem
                    index={index}
                    newMessageAlert={newMessageAlert}
                    isOnline={isOnline}
                    avatar={avatar}
                    _id={_id}
                    key={_id}
                    name={name}
                    groupChat={groupChat}
                    sameSender={chatId === _id}
                    handleDeleteChat={handleDeleteChat}
                />
            );
        });
    }, [chats, chatId, newMessagesAlert, onlineUsers, handleDeleteChat]);

    return (
        <div 
            className="w-full overflow-y-auto bg-white py-5 dark:bg-gray-900 border-r-2 border-black/50 dark:border-white/50 h-[calc(100vh-4rem)] flex flex-col"
            style={{ width: w }}
        >
            {chatItems}
        </div>
    );
};

// Memoize the entire component
export default memo(ChatList, (prevProps, nextProps) => {
    // Custom comparison for better performance
    return (
        prevProps.chatId === nextProps.chatId &&
        prevProps.chats === nextProps.chats &&
        prevProps.newMessagesAlert === nextProps.newMessagesAlert &&
        prevProps.onlineUsers === nextProps.onlineUsers &&
        prevProps.handleDeleteChat === nextProps.handleDeleteChat
    );
});