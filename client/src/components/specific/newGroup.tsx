import { useState } from "react"
import UserItem from "../shared/UserItem"
import { useAvailableFriendsQuery, useNewGroupMutation } from "../../redux/api/api"
import { useAsyncMutation, useErrors } from "../../hooks/hook"
import { MoonLoader } from "react-spinners"
import { toast } from "sonner"

const NewGroup = () => {

  const [groupName, setGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);

  const {error, isError, data, isLoading} = useAvailableFriendsQuery();

  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);


  const errors = [{
    isError,
    error,
  }];


  useErrors(errors);
  const selectMemberHandler = (id) => {
    setSelectedMembers(prev =>
      prev.includes(id) ? prev.filter((current) => current !== id) : [...prev, id]
    )
  }

  const submitHandler = () => {
    if(!groupName) return toast.error("Group Name is Required!");

    if(selectedMembers.length < 2) return toast.error("Atleast 3 members are required to create a group.");

    newGroup("Creating group...",{name:groupName, members:selectedMembers});
  }

  return (
    <div className="absolute top-full right-4 w-80 max-w-[90vw] bg-white dark:bg-gray-800 
                    rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 
                    z-50 mt-2">
     
      <div className="p-1">
        <div className="dark:text-gray-100 text-gray-700">
          <h3 className="text-lg font-semibold text-center py-2 mb-4">Create New Group</h3>
          <div>
            <div className="px-4">
              <input 
                type="text" 
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Group name..." 
                className="w-full p-2 border border-gray-300 dark:border-gray-600 
                           rounded-md dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Scrollable Members List */}
            <div className="h-[300px] py-5 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 
                            scrollbar-track-transparent hover:scrollbar-thumb-gray-500">
              {isLoading?<div 
              className='w-full flex justify-center items-center mt-10'
              >
                <MoonLoader color='#f5f5f5' size={20}/>
              </div>:data?.friends?.map((user, index) => (
                <ul key={index}>
                  <UserItem 
                    user={user} 
                    handler={selectMemberHandler} 
                    isAdded={selectedMembers.includes(user._id)} 
                  />
                </ul>
              ))}
            </div>

            <button 
              className="w-full mb-2 hover:cursor-pointer bg-blue-500 hover:bg-blue-600 text-white 
                         py-2 px-4 rounded-md transition-colors" 
              onClick={submitHandler}
              disabled={isLoadingNewGroup}
            >
              Create Group
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewGroup
