import { SearchIcon } from "lucide-react"
import { Input } from "../ui/input"
import { useState } from "react"
import UserItem from "../shared/UserItem";
import { SampleUsers } from "../constants/sampleData";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");

    let isLoadingSendFriendRequest = false;

  const [users,setUser] = useState(SampleUsers)



  const addFriendHandler = (id)=>{
         console.log("Adding friend",id);
  }

  
  return (
      <div className="absolute top-full right-4 w-80 max-w-[90vw] bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 z-50 mt-2">
              <div className="p-2">
            <h2 className="text-center text-md font-bold pt-2 dark:text-gray-300 text-gray-700">Find People</h2>
            <div className="relative mt-2">
              <SearchIcon className="h-4 w-4 absolute left-2 top-[10px]"/>
              <Input value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} className="pl-8"/>
            </div>

            <div className="h-[400px] py-10  overflow-scroll">
                {users.map((user)=>{
                  return <ul>
                    <UserItem user={user} key={user._id} handler={addFriendHandler} handlerIsLoading={isLoadingSendFriendRequest}/>
                  </ul>
                })}
            </div>
          </div>
        </div>
  )
}

export default Search