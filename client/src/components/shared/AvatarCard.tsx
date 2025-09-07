import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { transformImage } from '../../lib/feature';

const AvatarCard = ({ avatar = [], max = 4 }) => {
  const displayedAvatars = avatar.slice(0, max);

  return (
    <div className="flex -space-x-6">
      {displayedAvatars.map((i, index) => (
        <Avatar
          key={index}
          className="w-10 h-10 border-2 border-white rounded-full"
        >
          <AvatarImage src={transformImage(i)} className="rounded-full" />
          <AvatarFallback>$$</AvatarFallback>
        </Avatar>
      ))}
    </div>
  )
}

export default AvatarCard
