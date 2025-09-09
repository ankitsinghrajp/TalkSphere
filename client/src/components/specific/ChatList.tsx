import React from 'react'
import ChatItem from '../shared/ChatItem'

const ChatList = ({w="100%",
    chats=[],
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
  return (
    <div className={`w-[${w}] overflow-y-auto bg-white py-5 dark:bg-gray-900 border-r-2 border-black/50 dark:border-white/50 h-[calc(100vh-4rem)] flex flex-col`}>
        {
            chats?.map((data,index)=>{

                const {avatar, _id, name, groupChat, members} = data;
                const newMessageAlert = newMessagesAlert.find(
                    ({chatId})=> chatId === _id
                );

                const isOnline = members?.some((member)=>members.includes(_id));

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
                            sameSender={chatId===_id}
                             handleDeleteChat={handleDeleteChat}
                             />
                )
            })
        }
    </div>
  )
}

export default ChatList