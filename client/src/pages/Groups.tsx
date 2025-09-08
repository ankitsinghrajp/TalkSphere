import React, { memo, useEffect, useState } from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../components/ui/tooltip'
import { Button } from '../components/ui/button'
import { ArrowLeft, Check, Edit, Menu, Pencil, Users } from 'lucide-react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet'
import AvatarCard from '../components/shared/AvatarCard'
import { SampleChats } from '../components/constants/sampleData'
import { Input } from '../components/ui/input'

const Groups = () => {
  const chatId = useSearchParams()[0].get("group");
  const navigate = useNavigate();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");
  
  const navigateBack = ()=>{
     navigate("/");
  }
  
  const handleMobile = ()=>{
      setIsMobileMenuOpen(prev=>!prev);        
  }

  const handleItemClick = () => {
    setIsMobileMenuOpen(false);
  }

  const updateGroupName = ()=>{
    setIsEdit(false);
  }

  useEffect(()=>{
    setGroupName("Group Name");
    setGroupNameUpdatedValue("Group")
  },[])
  
  const IconButtons = ()=>{
    return <div className=''>
      <div className='absolute top-[2rem] right-[2rem]'>
        <Button 
          className='cursor-pointer md:hidden shadow-lg hover:shadow-xl transition-all duration-200 backdrop-blur-sm border border-gray-200/20 dark:border-gray-700/30 bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700' 
          onClick={handleMobile} 
          variant={'ghost'}
        >
          <Menu/>
        </Button>
      </div>
      
      <div className='absolute top-[2rem] left-[2rem]'>
        <Tooltip>
          <TooltipTrigger>
            <Button 
              className='cursor-pointer shadow-lg hover:shadow-xl transition-all duration-200 backdrop-blur-sm border border-gray-200/20 dark:border-gray-700/30 bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700' 
              onClick={navigateBack} 
              variant={'ghost'}
            >
              <ArrowLeft/>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            Go Back
          </TooltipContent>
        </Tooltip>
      </div>
      
      {/* Mobile sheet opener */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent className='bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 w-[90%]'>
          <SheetHeader>
            <SheetTitle className='text-gray-900 dark:text-gray-100 text-xl font-semibold'>Groups</SheetTitle>
            <SheetDescription className='text-gray-600 dark:text-gray-400'>
              Select a group to start chatting
            </SheetDescription>
          </SheetHeader>
          <div className='mt-6'>
            <GroupsList w={"50vw"} myGroups={SampleChats} chatId={chatId} onItemClick={handleItemClick}/>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  }

  const GroupName = <div>
    {isEdit?<>
    <Input value={groupNameUpdatedValue} onChange={(e)=>setGroupNameUpdatedValue(e.target.value)}/>
    <Check onClick={updateGroupName}/>
    </>:
    <>
       <div className='flex flex-row gap-4'>
       <div>
        {groupName}
       </div>
       <Pencil onClick={()=>{setIsEdit(true)}}/>
        </div>

    </>
    }
  </div>
  
  return (
    <div className='w-[100vw] h-[100vh] grid grid-cols-1 md:grid-cols-3 bg-gray-50 dark:bg-gray-900'>
      <div className='hidden md:block bg-white dark:bg-gray-900 border-r-2 border-gray-700 dark:border-gray-400 transition-colors duration-300'>
        <div className='p-6 border-b-2 border-gray-700 dark:border-gray-400'>
          <h1 className='text-2xl font-semibold text-gray-900 dark:text-gray-100'>Groups</h1>
          <p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>Select a group to start chatting</p>
        </div>
        <GroupsList myGroups={SampleChats} chatId={chatId}/>
      </div>
      <div className='flex flex-col items-center md:col-span-2 relative px-[1rem] py-[3rem] bg-gradient-to-br from-gray-50 via-gray-50/80 to-gray-100/50 dark:from-gray-950 dark:via-gray-950/30 dark:to-gray-950/10'>
        <IconButtons/>

        {
          groupName && GroupName
        }



        {!chatId && 
        <div className='flex flex-col items-center justify-center h-full text-center'>
          <div className='w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 flex items-center justify-center mb-6 shadow-lg'>
            <Users className='w-10 h-10 text-white' />
          </div>
          <h2 className='text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2'>Welcome to Groups</h2>
          <p className='text-gray-600 dark:text-gray-400 max-w-md'>Select a group from the sidebar to start chatting with your team members.</p>
        </div>}
      </div>
    </div>
  )
}

const GroupsList = ({w="100%",myGroups=[],chatId, onItemClick})=>(
  <div className='p-4'>
    {myGroups.length > 0 ? (
      <div className='space-y-2'>
        {myGroups.map((group)=> 
          <GroupListItem key={group._id} group={group} chatId={chatId} onItemClick={onItemClick}/>
        )}
      </div>
    ) : (
      <div className='flex flex-col items-center justify-center py-12 text-center'>
        <div className='w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4'>
          <Users className='w-6 h-6 text-gray-400 dark:text-gray-500' />
        </div>
        <p className='text-gray-500 dark:text-gray-400 text-sm'>No groups available</p>
        <p className='text-gray-400 dark:text-gray-500 text-xs mt-1'>Create a new group to get started</p>
      </div>
    )}
  </div>
);

const GroupListItem = memo(({group, chatId, onItemClick})=>{
  const {name, avatar, _id} = group;
  
  const handleClick = (e) => {
    if (onItemClick) {
      onItemClick();
    }

    if(chatId===_id) {
      e.preventDefault();
    }
  };
  
  return (
    <Link to={`?group=${_id}`} onClick={(e)=>handleClick(e)}>
      <div className='flex items-center p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 cursor-pointer group border border-transparent hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-sm'>
        <div className='flex-shrink-0 mr-3'>
          <AvatarCard avatar={avatar}/>
        </div>
        <div className='flex-1 min-w-0'>
          <h3 className='text-sm font-medium text-gray-900 dark:text-gray-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200'>
            {name}
          </h3>
          <p className='text-xs text-gray-500 dark:text-gray-400 mt-0.5'>
            Tap to open chat
          </p>
        </div>
        <div className='flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
          <ArrowLeft className='w-4 h-4 text-gray-400 dark:text-gray-500 rotate-180' />
        </div>
      </div>
    </Link>
  )
});

export default Groups