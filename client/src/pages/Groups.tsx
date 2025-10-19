import React, { memo, useEffect, useState } from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../components/ui/tooltip'
import { Button } from '../components/ui/button'
import { ArrowLeft, Check, Menu, Pencil, Plus, Trash, Users } from 'lucide-react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet'
import AvatarCard from '../components/shared/AvatarCard'
import { Input } from '../components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { toast } from 'sonner'
import AddMemberDialog from '../components/dialog/addMemberDialog'
import UserItem from '../components/shared/UserItem'
import { useAddGroupMembersMutation, useChatDetailsQuery, useDeleteChatMutation, useMyGroupsQuery, useRemoveGroupMembersMutation, useRenameGroupMutation } from '../redux/api/api'
import { useAsyncMutation, useErrors } from '../hooks/hook'
import { MoonLoader } from 'react-spinners'
import { useDispatch, useSelector } from 'react-redux'
import { setIsAddMember } from '../redux/reducers/misc'

const Groups = () => {
  const chatId = useSearchParams()[0].get("group");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const myGroups = useMyGroupsQuery("");

  const groupDetails = useChatDetailsQuery(
    {chatId, populate:true},
    {skip:!chatId},
  );

  const [updateGroup, isLoadingGroupName] = useAsyncMutation(useRenameGroupMutation);
  const [removeMember, isLoadingRemoveMember] = useAsyncMutation(useRemoveGroupMembersMutation);
  const [deleteGroup, isLoadingDeleteGroup] = useAsyncMutation(useDeleteChatMutation);
 
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [members, setMembers] = useState([]);
   
  const {isAddMember} = useSelector((state)=>state.misc);
  const errors = [{
    isError: myGroups.isError,
    error: myGroups.error,
  },
  {
    isError: groupDetails.isError,
    error: groupDetails.error,
  },

];

  useErrors(errors);

    useEffect(()=>{

      if(groupDetails.data){
        setGroupName(groupDetails.data.chat.name);
        setGroupNameUpdatedValue(groupDetails.data.chat.name);
        setMembers(groupDetails.data.chat.members);
      }

      return ()=>{
        setGroupName("");
        setGroupNameUpdatedValue("");
        setMembers([]);
        setIsEdit(false);
      }

    },[groupDetails.data])

  
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
    updateGroup("Updating Group Name...",{chatId,name:groupNameUpdatedValue});
  }

  const openConfirmDeleteHandler = ()=>{
    setConfirmDeleteDialog(true);
  }

  const closeConfirmDeleteHandler = ()=>{
    setConfirmDeleteDialog(false);
  }

  const openAddMemberHandler = ()=>{
    
       dispatch(setIsAddMember(true));

  }


  const deleteHandler = ()=>{
      
       deleteGroup("Deleting Group...",{chatId});
      closeConfirmDeleteHandler();
      navigate("/groups");
  }

  const removeMemberHandler = (id)=>{
       removeMember("Removing member...",{userId:id,chatId})
  }

  return (
    <>
    <div className='w-[100vw] h-[100vh] bg-gray-50 dark:bg-gray-900'>
      {/* Main Content */}
      <div className='h-[100vh] grid grid-cols-1 md:grid-cols-3'>
        {/* Desktop Sidebar */}
        <div className='hidden h-[100vh] md:block bg-white dark:bg-gray-900 border-r-2 border-gray-200 dark:border-gray-700 transition-colors duration-300'>
          <div className='p-6 border-b-2 h-[6rem] dark:border-gray-700 border-gray-200'>
            <h1 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>Manage Groups</h1>
            <p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>Select a group to manage</p>
          </div>
          <div className='h-[calc(100vh-6rem)] overflow-y-auto '>
           {myGroups.isLoading?<div className='w-full flex justify-center items-center mt-10'><MoonLoader color='#f5f5f5' size={20}/></div>:<GroupsList myGroups={myGroups?.data?.data} chatId={chatId}/>}
          </div>
        </div>
        
        {/* Right Section with Top Bar */}
        <div className='flex flex-col md:col-span-2 relative bg-gradient-to-br from-gray-50 via-gray-50/80 to-gray-100/50 dark:from-gray-950 dark:via-gray-950/30 dark:to-gray-950/10'>
          {/* Top Bar */}
          <div className='h-[10vh] bg-white dark:bg-gray-900 border-b-2 border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 md:px-6 shadow-sm'>
            {/* Left Section - Back Button */}
            <div className='flex items-center'>
              <Tooltip>
                <TooltipTrigger>
                  <Button 
                    className='cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600' 
                    onClick={navigateBack} 
                    variant={'ghost'}
                    size={'sm'}
                  >
                    <ArrowLeft className='h-4 w-4'/>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Go Back
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Center Section - Group Name */}
            <div className='flex items-center flex-1 justify-center mx-4'>
              {groupName && (
                <div className='flex items-center'>
                  {isEdit ? (
                    <div className='flex flex-row gap-4 items-center'>
                      <Input className='py-1' value={groupNameUpdatedValue} onChange={(e)=>setGroupNameUpdatedValue(e.target.value)}/>
                      <Button className='cursor-pointer' onClick={updateGroupName} size={'icon'} disabled={isLoadingGroupName} variant={'outline'}>
                        <Check className='h-4' />
                      </Button>
                    </div>
                  ) : (
                    <div className='flex flex-row pt-2 items-center gap-4'>
                      <div className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
                        {groupName}
                      </div>
                      <Pencil className='h-4 w-4 hover:cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200' disabled={isLoadingGroupName} onClick={()=>{setIsEdit(true)}}/>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Section - Mobile Menu Button */}
            <div className='flex items-center'>
              <Button 
                className='cursor-pointer md:hidden shadow-sm hover:shadow-md transition-all duration-200 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600' 
                onClick={handleMobile} 
                variant={'ghost'}
                size={'sm'}
              >
                <Menu className='h-4 w-4'/>
              </Button>
            </div>

            {/* Mobile Sheet */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetContent className='bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-[100vh] w-[90%]'>
                <SheetHeader className='border-b-2 h-[6rem] border-gray-700'>
                  <SheetTitle className='text-gray-900 dark:text-gray-100 text-xl font-semibold'>Manage Groups</SheetTitle>
                  <SheetDescription className='text-gray-600 dark:text-gray-400'>
                    Select a group to manage
                  </SheetDescription>
                </SheetHeader>
                <div className='w-full h-[calc(100vh-6rem)] overflow-y-auto'>
                  {myGroups.isLoading?<div className='w-full flex justify-center items-center mt-10'><MoonLoader color='#f5f5f5' size={20}/></div>:<GroupsList w={"50vw"} myGroups={myGroups?.data?.data} chatId={chatId} onItemClick={handleItemClick}/>}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Main Content Area */}
          <div className='flex-1 h-[90vh] overflow-auto'>
            {chatId ? (
              <div className='flex flex-col h-full'>
                {/* Members Section */}
                <div className='flex-1 p-4 md:p-6'>
                  <div className='bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm h-full flex flex-col'>
                    {/* Members Header */}
                    <div className='p-4 md:p-6 border-b border-gray-200 dark:border-gray-700'>
                      <h3 className='text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2'>
                        <Users className='h-5 w-5 text-blue-500' />
                        Members
                      </h3>
                      <p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
                        Manage group members
                      </p>
                    </div>

                    {/* Members List */}
                    <div className='flex-1 p-4 overflow-auto'>
                    {
                      groupDetails.isLoading?<div className='w-full h-[200px] flex justify-center items-center mt-10'><MoonLoader color='#f5f5f5' size={20}/></div>:
                      <div className='h-[200px]'>
                        {members.map((i) => (
                            <UserItem key={i._id} user={i} isAdded handler={removeMemberHandler}/>
                        ))}
                      
                      
                      </div>
                     }
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className='p-4 md:p-6 bg-white dark:bg-gray-800/30 border-t-2 border-gray-200 dark:border-gray-700'>
                  <div className='flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto'>
                    <Button 
                      onClick={openAddMemberHandler} 
                      className='w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all'
                    >
                      <Plus className='h-4 w-4'/>
                      Add Member
                    </Button>
                    <Button 
                      onClick={openConfirmDeleteHandler} 
                      variant="destructive" 
                      className='w-full sm:w-auto flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all'
                      disabled={isLoadingDeleteGroup}
                    >
                      <Trash className='h-4 w-4'/>
                      Delete Group
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              /* Welcome Screen */
              <div className='flex flex-col items-center justify-center h-full text-center p-6'>
                <div className='w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 flex items-center justify-center mb-6 shadow-lg'>
                  <Users className='w-10 h-10 text-white' />
                </div>
                <h2 className='text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2'>Welcome to Groups</h2>
                <p className='text-gray-600 dark:text-gray-400 max-w-md'>Select a group from the sidebar to manage members and settings.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

    {isAddMember && <AddMemberDialog chatId={chatId}/>}

    {/* Confirm Delete Dialog */}
    <Dialog open={confirmDeleteDialog} onOpenChange={setConfirmDeleteDialog}>
      <DialogContent className='dark:bg-gray-900 border-1 dark:border-white/40'>
        <DialogHeader>
          <DialogTitle>Say goodbye forever?</DialogTitle>
          <div>
            <div>
              This action cannot be undone. This group and its related information will be deleted.
            </div>
            <div className='flex justify-between items-center pt-6 pb-2'>
              <Button onClick={closeConfirmDeleteHandler} className='' variant={'outline'}>
                Cancel
              </Button>
              <Button onClick={deleteHandler} variant={'destructive'}>
                Confirm
              </Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
    </>
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
      <div className='flex items-center px-3 py-4 rounded-xl hover:bg-gray-50 bg-gray-800/90 my-2 dark:hover:bg-gray-800/50 transition-all duration-200 cursor-pointer group border border-transparent hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-sm'>
        <div className='flex-shrink-0 mr-3'>
          <AvatarCard avatar={avatar}/>
        </div>
        <div className='flex-1 min-w-0'>
          <h3 className='text-sm font-medium text-gray-900 dark:text-gray-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200'>
            {name}
          </h3>
          <p className='text-xs text-gray-500 dark:text-gray-400 mt-0.5'>
            Tap to select group
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