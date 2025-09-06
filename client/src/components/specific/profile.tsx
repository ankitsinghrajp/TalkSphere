import React, { type ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { AtSign, Calendar, User } from "lucide-react";
import moment from "moment"

type profileCardProps = {
  text: string,
  Icon?: ReactNode,
  heading: string
}

const Profile = () => {
  return (
    <div className="w-full h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 border-l-2 border-black/50 dark:border-white/50 transition-colors duration-200">
      <div className="flex flex-col items-center p-6 space-y-6">
        {/* Avatar Section */}
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="w-24 h-24 border-4 border-gray-200 dark:border-gray-600 shadow-lg transition-all duration-200 hover:shadow-xl">
            <AvatarImage src="https://github.com/shadcn.png" className="object-cover" />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl font-semibold">
              AS
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Profile Cards */}
        <div className="w-full space-y-4">
          <ProfileCard 
            heading="Bio" 
            text="We are here to put a dent in the universe otherwise why else even be here!" 
          />
          <ProfileCard 
            Icon={<AtSign className="w-5 h-5 text-blue-500 dark:text-blue-400" />} 
            heading="Username" 
            text="ankit.singh.rajput404" 
          />
          <ProfileCard 
            Icon={<User className="w-5 h-5 text-green-500 dark:text-green-400" />} 
            heading="Name" 
            text="Ankit Singh Chouhan" 
          />
          <ProfileCard 
            Icon={<Calendar className="w-5 h-5 text-purple-500 dark:text-purple-400" />} 
            heading="Joined" 
            text={moment('2025-09-05T10:15:30.000Z').fromNow()} 
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;

export const ProfileCard = ({ text, Icon, heading }: profileCardProps) => {
  return (
    <div className="w-full p-4 rounded-xl h-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 transition-all duration-200 hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-750">
      <div className="flex items-start space-x-3">
        {/* Icon */}
        {Icon && (
          <div className="flex-shrink-0 mt-1">
            {Icon}
          </div>
        )}
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
            {heading}
          </div>
          <div className="text-sm text-gray-900 dark:text-gray-100 font-medium leading-relaxed break-words">
            {text}
          </div>
        </div>
      </div>
    </div>
  );
};