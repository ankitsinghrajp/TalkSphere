import React, { lazy, useState, useCallback, memo, useEffect } from "react";
import { ModeToggle } from "../toggle-theme";
import { Bell, Group, LogOut, Menu, PlusIcon, SearchIcon, Users } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useNavigate } from "react-router-dom";
import Search from "../specific/search";
import NewGroup from "../specific/newGroup";
import Notification from "../specific/notification";
import axios from "axios";
import { server } from "../constants/config";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { userNotExists } from "../../redux/reducers/auth";
import { setIsMobileMenu, setIsSearch} from "../../redux/reducers/misc";

// Memoize logo to prevent re-renders
const TalkSphereLogo = memo(() => {
  return (
    <div className="md:block hidden">
      <div className="text-2xl font-bold">
        <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
          Talk
        </span>
        <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
          Sphere
        </span>
      </div>
      <div className="text-[11px] text-gray-400 ml-2 dark:text-gray-300 font-normal -mt-[1px]">
        &lt;by Ankit Singh Rajput&gt;
      </div>
    </div>
  );
});

TalkSphereLogo.displayName = "TalkSphereLogo";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const {isSearch} = useSelector((state)=>state.misc);

  // Memoize all handlers with useCallback
  const handleMobile = useCallback(() => {
    dispatch(setIsMobileMenu(true));
  }, [dispatch]);

  const openSearch = useCallback(() => {
    dispatch(setIsSearch(true));
    // Close other dialogs when search is opened
    setIsNewGroup(false);
    setIsNotification(false);
  }, [dispatch]);

  const openNewGroup = useCallback(() => {
    setIsNewGroup((prev) => !prev);
    // Close other dialogs when new group is opened
    dispatch(setIsSearch(false));
    setIsNotification(false);
  }, [dispatch]);

  const openNotification = useCallback(() => {
    setIsNotification((prev) => !prev);
    // Close other dialogs when notification is opened
    dispatch(setIsSearch(false));
    setIsNewGroup(false);
  }, [dispatch]);

  const navigateToGroups = useCallback(() => {
    navigate("/groups");
  }, [navigate]);

  const logoutHandler = useCallback(async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });

      toast.success(data.message);
      dispatch(userNotExists());
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  }, [dispatch]);

  const closeAllDialogs = useCallback(() => {
    dispatch(setIsSearch(false));
    setIsNewGroup(false);
    setIsNotification(false);
  }, [dispatch]);

  const hasOpenDialog = isSearch || isNewGroup || isNotification;

  useEffect(()=>{
      
  },[])

  return (
    <div className="relative">
      <div className="h-[4rem] w-full flex items-center bg-white dark:bg-gray-900 border-b-2 border-black/50 dark:border-white/50">
        <div className="w-full">
          <div className="w-[90%] mx-auto flex justify-between items-center">
            {/* Left Side */}
            <TalkSphereLogo />
            <div className="md:hidden">
              <Menu
                onClick={handleMobile}
                className="w-6 h-6 text-gray-700 hover:cursor-pointer dark:text-gray-200"
              />
            </div>

            {/* Right Side */}
            <div className="flex justify-center items-center gap-4">
              {/* Search */}
              <Tooltip>
                <TooltipTrigger>
                  <SearchIcon
                    onClick={openSearch}
                    className="w-5 h-5 hover:cursor-pointer text-gray-700 dark:text-gray-200"
                  />
                </TooltipTrigger>
                <TooltipContent>Search</TooltipContent>
              </Tooltip>

              {/* New Groups */}
              <Tooltip>
                <TooltipTrigger>
                  <PlusIcon
                    onClick={openNewGroup}
                    className="w-5 h-5 hover:text-gray-900 hover:cursor-pointer text-gray-700 hover:dark:text-gray-400 dark:text-gray-200"
                  />
                </TooltipTrigger>
                <TooltipContent>Add New Group</TooltipContent>
              </Tooltip>

              {/* Manage Groups */}
              <Tooltip>
                <TooltipTrigger>
                  <Users
                    onClick={navigateToGroups}
                    className="w-5 h-5 hover:text-gray-900 hover:cursor-pointer text-gray-700 hover:dark:text-gray-400 dark:text-gray-200"
                  />
                </TooltipTrigger>
                <TooltipContent>Manage Groups</TooltipContent>
              </Tooltip>

              {/* Notifications */}
              <Tooltip>
                <TooltipTrigger>
                  <Bell
                    onClick={openNotification}
                    className="w-5 h-5 hover:text-gray-900 hover:cursor-pointer text-gray-700 hover:dark:text-gray-400 dark:text-gray-200"
                  />
                </TooltipTrigger>
                <TooltipContent>Notification</TooltipContent>
              </Tooltip>

              {/* Logout Handler */}
              <Tooltip>
                <TooltipTrigger>
                  <LogOut
                    onClick={logoutHandler}
                    className="w-5 h-5 hover:text-gray-900 hover:cursor-pointer text-gray-700 hover:dark:text-gray-400 dark:text-gray-200"
                  />
                </TooltipTrigger>
                <TooltipContent>Log Out</TooltipContent>
              </Tooltip>

              <ModeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Overlay Dialogs */}
      {hasOpenDialog && (
        <div
          className="fixed inset-0 z-40"
          onClick={closeAllDialogs}
        />
      )}

      {/* Search Dialog */}
      {isSearch && <Search />}

      {/* New Group Dialog */}
      {isNewGroup && <NewGroup />}

      {/* Notification Dialog */}
      {isNotification && <Notification />}
    </div>
  );
};

export default memo(Header);