import React, { useRef, useState } from 'react'
import AppLayout from '../components/layout/AppLayout'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { Paperclip, Send, Users } from 'lucide-react'
import { Input } from '../components/ui/input'
import FileMenu from '../components/dialog/file-menu'
import { sampleMessage, SampleUsers } from '../components/constants/sampleData'
import MessageComponent from '../components/shared/MessageComponent'

const userSample = {
  _id:"dkddkddkddfhggj",
  name:"Ankit Prem Singh"
}

type Inputs = {
  example: string
  exampleRequired: string
}

const Chat = () => {

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) =>{
    console.log(data)
    reset();
  } 

  const containerRef = useRef(null);
  const FileMenuRef = useRef(null);
  const [isFileMenuOpen, setIsFileMenuOpen] = useState(false);

  const handleAttachClick = (e) => {
    e.preventDefault();
    console.log('Attach button clicked!');
    setIsFileMenuOpen(!isFileMenuOpen);
  }

  const handleCloseFileMenu = () => {
    setIsFileMenuOpen(false);
  }

  return (
    <div className='w-full h-[calc(100vh-4rem)]'>
      <div 
        ref={containerRef} 
        className='h-[90%] p-2 overflow-y-auto bg-gray-50 dark:bg-gray-950'
      >
        {/* Message would go here */}
        {
          sampleMessage.map((message,index)=>(
            <MessageComponent key={index} message={message} user={userSample}/>
          ))
        }
   
      </div>

      {/* Modern Chat Prompt Container */}
      <div className='relative h-[10%] bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 flex items-center'>
        <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
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
                {...register("message",{required:{value:true,message:"The message can't be empty"}})}
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
        />
      </div>
    </div>
  )
}

export default AppLayout({})(Chat);