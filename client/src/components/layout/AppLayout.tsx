import React, { lazy, memo, useCallback, useEffect, useMemo, type ComponentType, type ReactNode } from "react";
import Header from "./Header";
import Title from "../shared/Title";
import { useParams } from "react-router-dom";
import Profile from "../specific/profile";
import { useMyChatsQuery } from "../../redux/api/api";
import { MoonLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { 
  Sheet, 
  SheetContent, 
  SheetTitle, 
  SheetDescription 
} from "@/components/ui/sheet";
import { setIsMobileMenu } from "../../redux/reducers/misc";
import { useErrors } from "../../hooks/hook";

const ChatList = lazy(() => import("../specific/ChatList"));

type AppLayoutProps = {
  children?: ReactNode;
};

// Memoized loading component
const LoadingSpinner = memo(() => (
  <div className="flex justify-center items-center h-full">
    <MoonLoader color="#ECECEC" size={30} />
  </div>
));

LoadingSpinner.displayName = "LoadingSpinner";

// Memoized desktop loading component
const DesktopLoadingSpinner = memo(() => (
  <div className="overflow-y-auto bg-white py-10 dark:bg-gray-900 border-r-2 border-black/50 dark:border-white/50 h-[calc(100vh-4rem)] flex justify-center">
    <MoonLoader color="#ECECEC" size={30} />
  </div>
));

DesktopLoadingSpinner.displayName = "DesktopLoadingSpinner";

// Empty state component
const EmptyChatState = memo(() => (
  <div className="flex flex-col bg-gray-900 border-r-2 border-black/50 dark:border-white/50  items-center justify-center h-full px-6 text-center">
    <div className="mb-4">
      <svg 
        className="w-24 h-24 text-gray-400 dark:text-gray-600 mx-auto" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={1.5} 
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
        />
      </svg>
    </div>
    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
      No Conversations Yet
    </h3>
    <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-sm">
      Search for users, make new friends, and start meaningful conversations.
    </p>
    <div className="text-sm text-gray-500 dark:text-gray-500">
      Click the search icon above to get started
    </div>
  </div>
));

EmptyChatState.displayName = "EmptyChatState";

const AppLayout = (layoutProps: AppLayoutProps = {}) => <P extends object>(WrappedComponent: ComponentType<P>) => {
  return memo((props: P) => {
    const dispatch = useDispatch();
    const { isMobileMenu } = useSelector((state) => state.misc);
    const params = useParams();
    const chatId = params.chatId;
    const { isLoading, data, isError, error } = useMyChatsQuery("");

    useErrors([{isError,error}]);
    // Memoize chats data to prevent unnecessary re-renders
    const chats = useMemo(() => data?.chats || [], [data?.chats]);
    const hasChats = chats.length > 0;

    // Use useCallback to memoize handlers
    const handleDeleteChat = useCallback((e, _id, groupChat) => {
      e.preventDefault();
   
    }, []);

    const handleMobileClose = useCallback(() => {
      dispatch(setIsMobileMenu(false));
    }, [dispatch]);

    // Memoize ChatList content to prevent re-renders
    const chatListContent = useMemo(() => {
      if (isLoading) return <LoadingSpinner />;
      if (!hasChats) return <EmptyChatState />;
      return (
        <ChatList 
          chats={chats} 
          chatId={chatId} 
          handleDeleteChat={handleDeleteChat} 
        />
      );
    }, [isLoading, hasChats, chats, chatId, handleDeleteChat]);

    // Desktop chat list content
    const desktopChatListContent = useMemo(() => {
      if (isLoading) return <DesktopLoadingSpinner />;
      if (!hasChats) return <EmptyChatState />;
      return (
        <ChatList 
          chats={chats} 
          chatId={chatId} 
          handleDeleteChat={handleDeleteChat} 
        />
      );
    }, [isLoading, hasChats, chats, chatId, handleDeleteChat]);

    return (
      <div className="dark:bg-gray-950/95 w-full bg-gray-200">
        <Title />
        <Header />
        <Sheet open={isMobileMenu} onOpenChange={handleMobileClose}>
          <SheetContent className="bg-gray-900 p-0 w-[90%]">
            <SheetTitle className="sr-only">Chat List</SheetTitle>
            <SheetDescription className="sr-only">
              List of your conversations and chats
            </SheetDescription>
            
            <div className="px-4 py-3 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white">Chats</h2>
            </div>
            
            <div className="h-[calc(100vh-4rem)]">
              {chatListContent}
            </div>
          </SheetContent>
        </Sheet>
        <div className="w-full h-[calc(100vh-4rem)]">
          <div className="grid grid-cols-1 md:grid-cols-4">
            <div className="md:block hidden col-span-1">
              {desktopChatListContent}
            </div>
            <div className="col-span-2">
              <WrappedComponent {...props} {...(layoutProps as P)} />
            </div>
            <div className="hidden md:block col-span-1">
              <Profile />
            </div>
          </div>
        </div>
      </div>
    );
  });
};

export default AppLayout;