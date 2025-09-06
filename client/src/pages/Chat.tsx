import React, { useRef } from 'react'
import AppLayout from '../components/layout/AppLayout'
import { useForm, type SubmitHandler } from 'react-hook-form'

type Inputs = {
  example: string
  exampleRequired: string
}

const Chat = () => {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) =>{
    console.log(data)

  } 

  const containerRef = useRef(null);

  return (
    <div className='w-full h-[calc(100vh-4rem)]'>
      <div 
        ref={containerRef} 
        className='h-[90%] overflow-y-auto bg-gray-200 dark:bg-gray-900 '
      >
        {/* Message would go here */}
        this is me
   
      </div>

      <form className='h-[10%] bg-pink-400' onSubmit={handleSubmit(onSubmit)}>


      </form>
    </div>
  )
}

export default AppLayout({})(Chat);