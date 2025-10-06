import moment from 'moment';
import React, { memo } from 'react'
import { fileFormat } from '../../lib/feature';
import RenderAttachments from './RenderAttachments';

const MessageComponent = ({message, user, theme = 'dark'}) => {
    const {sender, content, attachments = [], createdAt} = message
    const timeAgo = moment(createdAt).fromNow();
    const sameSender = sender?._id === user?._id;
    
    
    const isDark = theme === 'dark';
  
    return (
        <div className={`flex mb-3 ${sameSender ? "justify-end" : "justify-start"}`}>
            {/* Message Content */}
            <div className={`flex flex-col max-w-[65%] ${sameSender ? "items-end" : "items-start"}`}>
                {/* Sender Name */}
                {!sameSender && (
                    <div className="mb-1 px-1">
                        <span className={`text-xs font-semibold ${
                            isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                            {sender.name}
                        </span>
                    </div>
                )}
                
                {/* Message Bubble */}
                <div className={`relative px-3.5 py-2 rounded-2xl backdrop-blur-sm transition-all duration-200 ${
                    sameSender 
                        ? isDark
                            ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/20" 
                            : "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md"
                        : isDark
                            ? "bg-gray-800/80 text-gray-100 border border-gray-700/50 shadow-md" 
                            : "bg-white text-gray-800 border border-gray-200 shadow-sm"
                } ${sameSender ? "rounded-tr-sm" : "rounded-tl-sm"}`}>
                    
                    {/* Text Content */}
                    {content && (
                        <div className="text-[13px] leading-relaxed whitespace-pre-wrap break-words">
                            {content}
                        </div>
                    )}
                    
                    {/* Attachments */}
                    {attachments.length > 0 && (
                        <div className={`space-y-2 ${content ? 'mt-2' : ''}`}>
                            {attachments.map((attachment, index) => {
                                const url = attachment.url;
                                const file = fileFormat(url);
                                return (
                                    <div 
                                        key={index} 
                                        className="rounded-lg overflow-hidden transition-transform hover:scale-[1.02]"
                                    >
                                        <a 
                                            href={url} 
                                            target='_blank' 
                                            download 
                                            className="block"
                                            rel="noopener noreferrer"
                                        >
                                            {RenderAttachments(file, url, theme)}
                                        </a>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
                
                {/* Time - shown for all messages */}
                <div className="flex items-center gap-1.5 mt-1 px-1">
                    <span className={`text-[10px] ${
                        isDark ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                        {timeAgo}
                    </span>
                    {sameSender && (
                        <svg 
                            className={`w-3.5 h-3.5 ${
                                isDark ? 'text-blue-400' : 'text-blue-500'
                            }`} 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                        >
                            <path 
                                fillRule="evenodd" 
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                                clipRule="evenodd" 
                            />
                        </svg>
                    )}
                </div>
            </div>
        </div>
    )
}

export default memo(MessageComponent)