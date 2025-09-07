import React from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../components/ui/tooltip'
import { Button } from '../components/ui/button'
import { ArrowLeft, ChevronLeft, Delete } from 'lucide-react'

const Groups = () => {

  const IconButtons = ()=>{
    return <Tooltip>
  <TooltipTrigger>
     <Button variant={'ghost'}>
        <ArrowLeft/>
   </Button>
  </TooltipTrigger>
  <TooltipContent>
     Go Back
  </TooltipContent>
</Tooltip>
  }

  return (
    <div className='w-[100vw] h-[100vh] grid grid-cols-1 md:grid-cols-3'>
        <div className='hidden md:block bg-white dark:bg-gray-900 transition-colors duration-200 '>
             <IconButtons/>
        </div>
        <div className='flex flex-col items-center md:col-span-2 relative px-[1rem] py-[3rem] bg-white dark:bg-gray-950/80 transition-colors duration-200'>
            Group Details
        </div>
    </div>
  )
}

export default Groups