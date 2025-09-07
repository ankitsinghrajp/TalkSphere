import React from 'react'
import { transformImage } from '../../lib/feature';
import { Paperclip } from 'lucide-react';

const RenderAttachments = (file, url) => {
    
    switch (file) {
        case "video":
            return (
                <video 
                    src={url} 
                    preload='none' 
                    width={'200px'} 
                    controls
                    style={{
                        borderRadius: '8px',
                        maxWidth: '200px',
                        height: 'auto',
                        backgroundColor: '#000',
                        border: '1px solid #333'
                    }}
                />
            )
                     
        case "audio":
            return (
                <audio 
                    src={url} 
                    preload='none' 
                    controls 
                    style={{
                        width: '200px',
                        height: '40px',
                        borderRadius: '20px',
                        backgroundColor: '#f0f0f0',
                        outline: 'none'
                    }}
                />
            )
         
        case "image":
            return (
                <img
                    src={transformImage(url, 200)}
                    width="200px"
                    height="150px"
                    style={{ 
                        objectFit: "contain",
                        borderRadius: '8px',
                        border: '1px solid #e0e0e0'
                    }}
                    alt="Image"
                />
            );
         
        default:
            return <Paperclip/>
     
    }
}

export default RenderAttachments