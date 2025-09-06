import React, { lazy, type ComponentType, type ReactNode } from "react";
import Header from "./Header";
import Title from "../shared/Title";
import { SampleChats } from "../constants/sampleData";
import { useParams } from "react-router-dom";
import Profile from "../specific/profile";
const ChatList = lazy(()=>import("../specific/ChatList"));

type AppLayoutProps = {
  children?: ReactNode;
};

const AppLayout =
  (layoutProps: AppLayoutProps = {}) =>
  <P extends object>(WrappedComponent: ComponentType<P>) => {
    
    return (props: P) => {
      
    const params = useParams();

    const chatId = params.chatId;
    // console.log("Chat Id: ",chatId);

    const handleDeleteChat = (e, _id, groupChat)=>{
        e.preventDefault();
        console.log("Delete chat: ",_id,groupChat);
    }
      
      return(<div className="dark:bg-gray-950/95 bg-gray-200">
      <Title/>
      <Header/>
      <div className=" w-full h-[calc(100vh-4rem)] ">
        
        <div className="grid grid-cols1 md:grid-cols-4">
              <div className=" md:block hidden col-span-1">
                <ChatList 
                chats={SampleChats} 
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
               
                />
              </div>
              <div className="col-span-2">
                    <WrappedComponent {...props} {...(layoutProps as P)} />
              </div>

              <div className="hidden md:block col-span-1">
                
                <Profile/>
              </div>
        </div>
      
      </div>
      </div>
    );}
  };

export default AppLayout;
