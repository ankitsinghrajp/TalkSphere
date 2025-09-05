import React, { lazy, type ComponentType, type ReactNode } from "react";
import Header from "./Header";
import Title from "../shared/Title";
import { SampleChats } from "../constants/sampleData";
import { useParams } from "react-router-dom";
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
      <div className="container h-[calc(100vh-4rem)] mx-auto">
        
        <div className="grid grid-cols1 md:grid-cols-3">
              <div className=" md:block hidden">
                <ChatList 
                chats={SampleChats} 
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
               
                />
              </div>
              <div>
                    <WrappedComponent {...props} {...(layoutProps as P)} />
              </div>

              <div className="hidden md:block">
                Third
              </div>
        </div>
      
      </div>
      </div>
    );}
  };

export default AppLayout;
