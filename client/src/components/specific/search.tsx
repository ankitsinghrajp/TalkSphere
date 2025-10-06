import { SearchIcon } from "lucide-react"
import { Input } from "../ui/input"
import { useEffect, useState } from "react"
import UserItem from "../shared/UserItem";
import { useLazySearchUserQuery, useSendFriendRequestMutation } from "../../redux/api/api";
import { useAsyncMutation } from "../../hooks/hook";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");

  const [users, setUser] = useState([]);

  const [searchUser] = useLazySearchUserQuery();
  const [sendFriendRequest, isLoadingSendFriendRequest ] = useAsyncMutation(useSendFriendRequestMutation);

  const addFriendHandler = async (id) => {
     await sendFriendRequest("Sending friend request...", {userId:id})
  }

  useEffect(()=>{
    // Using Debounce Concept
    const timeOutId = setTimeout(()=>{
        searchUser(searchValue).then(({data})=>{
          setUser(data.users);
        })
    },1000);

    return ()=>{
      clearTimeout(timeOutId);
    }

  },[searchValue]);

  return (
    <div className="absolute top-full right-4 w-80 max-w-[90vw] bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 z-50 mt-2">
      <div className="p-2">
        <h2 className="text-center text-md font-bold pt-2 dark:text-gray-300 text-gray-700">
          Find People
        </h2>

        <div className="relative mt-2">
          <SearchIcon className="h-4 w-4 absolute left-2 top-[10px]" />
          <Input 
            value={searchValue} 
            onChange={(e) => setSearchValue(e.target.value)} 
            className="pl-8"
          />
        </div>

        <div className="h-[400px] py-10 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent hover:scrollbar-thumb-gray-500">
          {users.length > 0 ? (
            users.map((user) => (
              <ul key={user._id}>
                <UserItem 
                  user={user} 
                  handler={addFriendHandler} 
                  handlerIsLoading={isLoadingSendFriendRequest} 
                />
              </ul>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <SearchIcon className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-3" />
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {searchValue ? "No users found" : "Start typing to search for people"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Search
