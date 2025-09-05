import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import AvatarCard from './AvatarCard'

const ChatItem = ({
    avatar= {},
    name,
    _id,
    groupChat = false,
    sameSender,
    isOnline,
    newMessageAlert,
    index=0,
    handleDeleteChat
}) => {
  return (
    <Link className='hover:text-decoration:none' to={`/chat/${_id}`} style={{
        textDecoration:"none",
        color:'black',
        padding:'0',
    }}
    onContextMenu={(e)=>handleDeleteChat(e,_id,groupChat)}
    >
            <div className={`flex items-center relative border-b-2 border-amber-300 p-[1rem] ${sameSender?"dark:bg-purple-500 bg-blue-500":"bg-gray-400"}`}>
                <AvatarCard avatar={avatar}/>
                <div>
                    <h3>{name}</h3>
                    {newMessageAlert &&(
                        <h4>
                            {newMessageAlert.count} new Message
                        </h4>
                    ) }
                </div>

                {
                    isOnline && (
                        <p className='h-3 w-3 rounded-full bg-green-500'/>
                    )
                }


            </div>
    </Link>
  )
}

export default memo(ChatItem)