import { useState } from "react"
import { SampleUsers } from "../constants/sampleData"
import UserItem from "../shared/UserItem"
const NewGroup = () => {

  const [groupName, setGroupName] = useState("")
  const [members, setMembers] = useState(SampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);




  const selectMemberHandler = (id)=>{
      setSelectedMembers(prev=> prev.includes(id)? prev.filter((current)=>current !== id) : [...prev, id])   
  }


  const submitHandler = ()=>{

  }

  return (
    <div className="absolute top-full right-4 w-80 max-w-[90vw] bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 z-50 mt-2">
     
          <div className="p-1">
            <div className="dark:text-gray-100 text-gray-700">
              <h3 className="text-lg font-semibold text-center py-2  mb-4">Create New Group</h3>
              <div className="">
                <div className="px-4">
                <input 
                  type="text" 
                  value={groupName}
                  onChange={(e)=>setGroupName(e.target.value)}
                  placeholder="Group name..." 
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                />
                 </div>

                  <div className="h-[300px] py-5  overflow-scroll">
                                {members.map((user,index)=>{
                                  return <ul>
                                    <UserItem user={user} key={index} handler={selectMemberHandler} isAdded={selectedMembers.includes(user._id)}/>
                                  </ul>
                                })}
                            </div>


                <button className="w-full mb-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors" onClick={submitHandler}>
                  Create Group
                </button>
              </div>
            </div>
          </div>
        </div>
  )
}

export default NewGroup