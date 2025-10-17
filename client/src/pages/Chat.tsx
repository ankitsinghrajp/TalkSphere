import React, { useCallback, useEffect, useRef, useState } from 'react'
import AppLayout from '../components/layout/AppLayout'
import { Paperclip, Send } from 'lucide-react'
import { Input } from '../components/ui/input'
import FileMenu from '../components/dialog/file-menu'
import MessageComponent from '../components/shared/MessageComponent'
import { useSocket } from '../socket'
import { NEW_MESSAGE } from '../components/constants/events'
import { useChatDetailsQuery, useGetMessagesQuery } from '../redux/api/api'
import { CircleLoader } from 'react-spinners'
import { useErrors, useSocketEvents } from '../hooks/hook'
import { useTopInfiniteScroll } from '../hooks/useTopInfiniteScroll'
import { useDispatch } from 'react-redux'
import { removeNewMessagesAlert } from '../redux/reducers/chat'


const Chat = ({chatId}) => {

  const socket = useSocket();
  
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [oldMessages, setOldMessages] = useState([]);
  const dispatch = useDispatch();

  const userString = localStorage.getItem("loggedInUser");
  const user = JSON.parse(userString);

  const containerRef = useRef(null);
  const FileMenuRef = useRef(null);
  const [isFileMenuOpen, setIsFileMenuOpen] = useState(false);
  const bottomRef = useRef(null);

  const chatDetails = useChatDetailsQuery({chatId, skip: !chatId});
  const oldMessagesChunk = useGetMessagesQuery({chatId, page});

  const members = chatDetails?.data?.chat?.members;

  const errors = [
    {isError: chatDetails.isError, error: chatDetails.error},
    {isError: oldMessagesChunk.isError, error: oldMessagesChunk.error}
  ]
  
  useErrors(errors);

  // Clear all the chat data when chatId switched
  useEffect(() => {
 
    dispatch(removeNewMessagesAlert(chatId));
    
  setMessages([]);
  setOldMessages([]);
  setPage(1);
  setMessage("");
}, [chatId]);

  // Update old messages and preserve scroll position
  useEffect(() => {
    if (oldMessagesChunk?.data?.messages) {
      const container = containerRef.current;
      const prevScrollHeight = container?.scrollHeight || 0;
      const prevScrollTop = container?.scrollTop || 0;

      setOldMessages((prev) => {
        // Only add new messages that aren't already in the array
        const newMessages = oldMessagesChunk.data.messages.filter(
          (newMsg) => !prev.some((oldMsg) => oldMsg._id === newMsg._id)
        );
        return [...newMessages, ...prev];
      });

      // Restore scroll position after DOM update
      setTimeout(() => {
        if (container && page > 1) {
          const newScrollHeight = container.scrollHeight;
          container.scrollTop = prevScrollTop + (newScrollHeight - prevScrollHeight);
        }
      }, 0);
    }
  }, [oldMessagesChunk?.data?.messages, page]);

  // Combine old messages with new messages
  const allMessages = [...oldMessages, ...messages];

  // Fetch more messages for infinite scroll
  const fetchMore = useCallback(() => {
    if (!oldMessagesChunk.isFetching) {
      setPage((prev) => prev + 1);
    }
  }, [oldMessagesChunk.isFetching]);

  // Check if there are more messages to load
  const hasMore = oldMessagesChunk?.data?.totalPages 
    ? page < oldMessagesChunk.data.totalPages 
    : false;

  // Use infinite scroll hook
  useTopInfiniteScroll(containerRef, fetchMore, hasMore);

  // Scroll to bottom on new messages (not on old messages load)
  useEffect(() => {
    if (messages.length > 0 && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length]);

  const handleAttachClick = (e) => {
    e.preventDefault();
    console.log('Attach button clicked!');
    setIsFileMenuOpen(!isFileMenuOpen);
  }

  const handleCloseFileMenu = () => {
    setIsFileMenuOpen(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!message.trim()) return;

    socket.emit(NEW_MESSAGE, {chatId, members, message});
   
    setMessage("");
  }

  const newMessagesHandler = useCallback((data) => {
    if(data?.chatId === chatId){
      setMessages((prev) => [...prev, data.message]);
    }
  }, [chatId]);

  const eventHandlers = {[NEW_MESSAGE]: newMessagesHandler};

  useSocketEvents(socket, eventHandlers);

  return chatDetails.isLoading ? (
    <div className='w-full flex justify-center flex-col items-center bg-gray-900 h-[calc(100vh-4rem)]'>
      <CircleLoader size={70} color='#d9d8d8' />
      <span className='mt-2 text-sm text-gray-400 font-semibold'>Loading Chats...</span>
    </div>
  ) : (
    <div className='w-full h-[calc(100vh-4rem)]'>
      <div 
        ref={containerRef} 
        className='h-[90%] p-2 overflow-y-auto bg-gray-50 dark:bg-gradient-to-br dark:from-gray-950 via-gray-950/95 dark:to-gray-950/90'
      >
        {/* Loading indicator for fetching old messages */}
        {oldMessagesChunk.isFetching && page > 1 && (
          <div className='flex justify-center py-2'>
            <CircleLoader size={30} color='#d9d8d8' />
          </div>
        )}

        {/* Messages */}
        {allMessages.map((message, index) => (
          <MessageComponent key={message._id || index} message={message} user={user}/>
        ))}
        
        {/* Bottom reference for auto-scroll */}
        <div ref={bottomRef} />
      </div>

      {/* Chat Prompt Container */}
      <div className='relative h-[10%] bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 flex items-center'>
        <form className='w-full' onSubmit={handleSubmit}>
          <div className='relative flex items-center max-w-4xl mx-auto'>
            {/* Attachment Button */}
            <button 
              type="button"
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200 mr-3 ${
                isFileMenuOpen 
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              ref={FileMenuRef}
              onClick={handleAttachClick}
            >
              <Paperclip className='h-5 w-5 text-gray-600 dark:text-gray-400'/>
            </button>

            {/* Input Container */}
            <div className='relative flex-1'>
              <Input 
                placeholder='Type your message...' 
                className='w-full h-12 pr-14 pl-4 rounded-full border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-0 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-md'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              
              {/* Send Button */}
              <button
                type='submit'
                className='absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center shadow-md hover:shadow-lg'
              >
                <Send className='h-4 w-4 text-white'/>
              </button>
            </div>
          </div>
        </form>
        
        {/* File Menu */}
        <FileMenu 
          anchorE1={FileMenuRef.current} 
          onClose={handleCloseFileMenu}
          isOpen={isFileMenuOpen}
          chatId={chatId}
        />
      </div>
    </div>
  )
}

export default AppLayout({})(Chat);