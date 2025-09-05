import React, { lazy, useState } from "react";
import { ModeToggle } from "../toggle-theme";
import { Bell, Group, LogOut, Menu, PlusIcon, SearchIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useNavigate } from "react-router-dom";

const SearchDialogue = lazy(()=>import("../specific/search"));
const NewGroupDialogue = lazy(()=>import("../specific/newGroup"));
const NotificationDialogue = lazy(()=> import("../specific/notification"));

const Header = () => {
  const navigate = useNavigate();
  const [isMobile,setIsMobile] = useState(false);
  const [isSearch,setIsSearch] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  const handleMobile = () => {
    setIsMobile((prev) =>!prev);
  };

  const openSearch = () => {
      setIsSearch((prev) =>!prev);
      // Close other dialogs when search is opened
      if (!isSearch) {
        setIsNewGroup(false);
        setIsNotification(false);
      }
  };

  const openNewGroup = () => {
    setIsNewGroup((prev)=>!prev);
    // Close other dialogs when new group is opened
    if (!isNewGroup) {
      setIsSearch(false);
      setIsNotification(false);
    }
  };

  const openNotification = () =>{
    setIsNotification((prev)=>!prev);
    // Close other dialogs when notification is opened
    if (!isNotification) {
      setIsSearch(false);
      setIsNewGroup(false);
    }
  }

  const navigateToGroups = () =>{
    navigate("/groups");
  }

  const logoutHandler = ()=>{
    console.log("Logged Out Successfully!");
  }

  return (
    <div className="relative">
      <div className="h-[4rem] w-full flex items-center dark:bg-gray-950/95 bg-gray-200 border-b-2 border-black/50 dark:border-white/50">
        <div className="w-full">
        <div className="w-[90%] mx-auto flex justify-between items-center">
          {/* Left Side */}
          <div className="text-2xl md:block hidden font-bold dark:text-gray-100 text-gray-700">
            TalkSphere
          </div>
          <div className="md:hidden">
            <Menu
              onClick={handleMobile}
              className="w-6 h-6 text-gray-700 hover:cursor-pointer dark:text-gray-200"
            />
          </div>

          {/* Right Side */}
          <div className="flex justify-center items-center gap-4">
            {/* Search  */}
            <Tooltip>
              <TooltipTrigger>
                  <SearchIcon
              onClick={openSearch}
              className="w-5 h-5 hover:cursor-pointer text-gray-700 dark:text-gray-200"
            />
              </TooltipTrigger>
              <TooltipContent>
                 Search
              </TooltipContent>
            </Tooltip>

  {/* New Groups */}
          
            <Tooltip>
              <TooltipTrigger>

                <PlusIcon
              onClick={openNewGroup}
              className="w-5 h-5 hover:text-gray-900 hover:cursor-pointer text-gray-700 hover:dark:text-gray-400 dark:text-gray-200"
            />    
              </TooltipTrigger>
              <TooltipContent>
                  Add New Group
              </TooltipContent>
            </Tooltip>

            {/* Manage Groups */}
            <Tooltip>
              <TooltipTrigger>
                 <Group
                 onClick={navigateToGroups}
                  className="w-5 h-5 hover:text-gray-900 hover:cursor-pointer text-gray-700 hover:dark:text-gray-400 dark:text-gray-200"/>
              </TooltipTrigger>
              <TooltipContent>
                      Manage Groups
              </TooltipContent>
            </Tooltip>

            {/* Notifications */}

            <Tooltip>
              <TooltipTrigger>
                 <Bell
                 onClick={openNotification}
                  className="w-5 h-5 hover:text-gray-900 hover:cursor-pointer text-gray-700 hover:dark:text-gray-400 dark:text-gray-200"/>
              </TooltipTrigger>
              <TooltipContent>
                      Notification
              </TooltipContent>
            </Tooltip>

            {/* Logout Handler */}
            
            <Tooltip>
              <TooltipTrigger>
                 <LogOut
                 onClick={logoutHandler}
                  className="w-5 h-5 hover:text-gray-900 hover:cursor-pointer text-gray-700 hover:dark:text-gray-400 dark:text-gray-200"/>
              </TooltipTrigger>
              <TooltipContent>
                      Logout
              </TooltipContent>
            </Tooltip>
            
            <ModeToggle />
          </div>
        </div>
        </div>
      </div>
      
      {/* Overlay Dialogs */}
      {(isSearch || isNewGroup || isNotification) && (
        <div 
          className="fixed inset-0  z-40"
          onClick={() => {
            setIsSearch(false);
            setIsNewGroup(false);
            setIsNotification(false);
          }}
        />
      )}
      
      {/* Search Dialog */}
      {isSearch && (
          <SearchDialogue/>    
      )}
      
      {/* New Group Dialog */}
      {isNewGroup && (
          <NewGroupDialogue/>
      )}
      
      {/* Notification Dialog */}
      {isNotification && (
          <NotificationDialogue/>
      )}
    </div>
  );
};

export default Header;