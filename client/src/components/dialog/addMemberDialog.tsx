import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import UserItem from '../shared/UserItem'
import { useDispatch } from 'react-redux'
import { setIsAddMember } from '../../redux/reducers/misc'
import { useAsyncMutation, useErrors } from '../../hooks/hook'
import { useAddGroupMembersMutation, useAvailableFriendsQuery } from '../../redux/api/api'
import { MoonLoader } from 'react-spinners'

const AddMemberDialog = ({chatId}) => {

    const [selectedMembers, setSelectedMembers] = useState([]);
    const dispatch = useDispatch();

    const {isError, error, data, isLoading} = useAvailableFriendsQuery(chatId);

    const errors = [
      {
        isError,
        error,
      }
    ]

    useErrors(errors);


    const [addMember, isLoadingAddMember] = useAsyncMutation(useAddGroupMembersMutation);

    const selectMemberHandler = (id)=>{
         setSelectedMembers((prev)=>
            prev.includes(id)? prev.filter((currElement)=> currElement !== id) : [...prev,id]
         )
    }

const addMemberSubmitHandler = ()=>{
      addMember("Adding Members...",{chatId,members:selectedMembers})
       
  closeHandler();
}

const closeHandler = ()=>{
  setSelectedMembers([]);
  dispatch(setIsAddMember(false));
}





  return (
         <Dialog open onOpenChange={closeHandler}>
  <DialogContent className='dark:bg-gray-900 border-1 dark:border-white/40'>
    <DialogHeader>
      <DialogTitle>Add Members</DialogTitle>
      <div>

        <div className='h-[400px] md:h-[350px] overflow-y-auto mt-4 mb-4'>
           
          
           {
            isLoading?<div className='w-full flex justify-center items-center mt-10'><MoonLoader color='#f5f5f5' size={20}/></div>:
            data.friends.length > 0 ? data.friends.map((i)=>(
               <UserItem key={i._id} user={i} handler={selectMemberHandler} isAdded={selectedMembers.includes(i._id)}/>
            )) :<p className='text-center font-semibold text-xl'>All your friends are already added.</p>
           }
        </div>
         <div className='flex justify-between items-center pt-6 pb-2'>
             <Button onClick={closeHandler} className='' variant={'outline'}>
                  Cancel
             </Button>
             <Button onClick={addMemberSubmitHandler} disabled={isLoadingAddMember} className='dark:bg-blue-500 dark:hover:bg-blue-600 text-gray-100'>
               {isLoadingAddMember?"Submitting...":"Submit Changes"}
             </Button>
             </div>
      </div>
     
    </DialogHeader>
  </DialogContent>
</Dialog>
  )
}

export default AddMemberDialog