import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { SampleUsers } from '../constants/sampleData'
import UserItem from '../shared/UserItem'

const AddMemberDialog = ({addMember, isLoadingAddMember, chatId}) => {

    const [members, setMembers] = useState(SampleUsers);
    const [selectedMembers, setSelectedMembers] = useState([]);

    const selectMemberHandler = (id)=>{
         setSelectedMembers((prev)=>
            prev.includes(id)? prev.filter((currElement)=> currElement !== id) : [...prev,id]
         )
    }

const addMemberSubmitHandler = ()=>{
       closeHandler();
}

const closeHandler = ()=>{
     setMembers([]);
}




  return (
         <Dialog open onOpenChange={closeHandler}>
  <DialogContent className='dark:bg-gray-900 border-1 dark:border-white/40'>
    <DialogHeader>
      <DialogTitle>Add Members</DialogTitle>
      <div>

        <div className='h-[400px] md:h-[350px] overflow-y-auto mt-4 mb-4'>
           {
            members.length > 0 ? members.map((i)=>(
               <UserItem key={i._id} user={i} handler={selectMemberHandler} isAdded={selectedMembers.includes(i._id)}/>
            )) :<p className='text-center font-semibold text-xl'>No Friends</p>
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