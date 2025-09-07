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
        <div className={`flex mb-4 ${sameSender ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-sm lg:max-w-md ${sameSender ? "ml-16" : "mr-16"}`}>
                {!sameSender && (
                    <div className={`text-xs mb-2 px-3 font-medium ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                        {sender.name}
                    </div>
                )}
                
                <div className={`px-4 py-3 rounded-2xl shadow-sm ${
                    sameSender 
                        ? "bg-gradient-to-r dark:from-blue-600 dark:to-blue-700 dark:text-white dark:shadow-blue-900/20 from-blue-500 to-blue-600 text-white shadow-blue-200/40" 
                            
                        : isDark
                            ? "dark:bg-gray-800 bg-slate-400 dark:text-gray-100 text-gray-950 border dark:border-gray-700/50 shadow-gray-900/20" 
                            : "bg-white text-gray-800 border border-gray-200 shadow-gray-100/60"
                }`}>
                    {content && (
                        <div className="text-sm leading-relaxed mb-2 last:mb-0">
                            {content}
                        </div>
                    )}
                    
                    {/* Attachments */}
                    {attachments.length > 0 && (
                        <div className="space-y-2 mt-3">
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
                    
                    <div className="flex items-center justify-end mt-2 space-x-1">
                        <span className={`text-xs font-medium ${
                            sameSender 
                                ? isDark 
                                    ? 'text-blue-200' 
                                    : 'text-blue-100'
                                : isDark 
                                    ? 'text-gray-400' 
                                    : 'text-gray-500'
                        }`}>
                            {timeAgo}
                        </span>
                        {sameSender && (
                            <svg 
                                className={`w-4 h-4 ${
                                    isDark ? 'text-blue-200' : 'text-blue-100'
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
        </div>
    )
}

export default memo(MessageComponent)