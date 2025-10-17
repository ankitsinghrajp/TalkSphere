import { AudioLines, Camera, File, FileAudioIcon, VideoIcon } from 'lucide-react';
import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { setIsUploadingLoader } from '../../redux/reducers/misc';
import { useSendAttachmentsMutation } from '../../redux/api/api';

const FileMenu = ({ anchorEl, onClose, isOpen, chatId }) => {
  const menuRef = useRef(null);

  const imageRef = useRef(null);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const fileRef = useRef(null);

  const dispatch = useDispatch();

  const [sendAttachments] = useSendAttachmentsMutation();
  

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      // Close if clicked outside the menu
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };


    // Add event listeners
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

const selectImage = (ref)=>{
  ref.current.click();
}

const selectAudio = (ref)=>{
  ref.current.click();
}

const selectVideo = (ref)=>{
  ref.current.click();
}

const selectFile = (ref)=>{
  ref.current.click();
}

  const fileChangeHandler = async (e, key)=>{

    const files = Array.from(e.target.files);
    
    if(files.length <= 0) return;

    if(files.length > 5) return toast.error(`You can only attached 5 ${key} at a time.`);
   
    dispatch(setIsUploadingLoader(true));
    
    const toastId = toast.loading(`Sending ${key}...`);

    onClose();

    try {

      const myForm =  new FormData();

      myForm.append("chatId",chatId);
      files.forEach((file)=>myForm.append("files",file));

      const res = await sendAttachments(myForm);
      
      if(res.data) toast.success(`${key} sent successfully`, {id:toastId});
      else toast.error(`Failed to sent ${key}.`,{id:toastId});

    } catch (error) {
      console.error(error);
      toast.error(`Error uploading ${key}`,{id:toastId});
      dispatch(setIsUploadingLoader(false));
    }
    finally{
      dispatch(setIsUploadingLoader(false));
    }

    }

  return (
    <>
      {/* Backdrop overlay */}
      <div className="fixed inset-0 z-40" />
      
      {/* Menu */}
      <div 
        ref={menuRef}
        className="absolute bottom-full mb-2 left-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 min-w-[200px] z-50"
      >
        <div className="text-sm text-gray-900 dark:text-gray-100 mb-3 font-medium">
          Attach Files
        </div>
        
        <div className="space-y-2">

          {/* Upload image functionality */}
          <div 
            className="flex hover:cursor-pointer items-center w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            onClick={()=>selectImage(imageRef)}
           
          >
            <span className="mr-2"><Camera className='h-4 dark:text-gray-300'/></span>
            Send Image
            <input 
            type='file' 
            multiple 
            accept='image/png, image/jpeg, image/gif, image/jpg' 
            style={{display:"none"}}
            onChange={(e)=> fileChangeHandler(e,"Images")}
             ref={imageRef}
            />
          </div>
          
          {/* Upload Video Functionality */}
          <div 
            className="flex hover:cursor-pointer items-center w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            onClick={()=>selectVideo(videoRef)}
          >
            <span className="mr-2"><VideoIcon className='h-4 dark:text-gray-300'/></span>
            Send Video
                <input 
            type='file' 
            multiple 
            accept='video/mp4, video/webm, video/ogg' 
            style={{display:"none"}}
            onChange={(e)=> fileChangeHandler(e,"Videos")}
             ref={videoRef}
            />
          </div>
          

          {/* Upload Audio Functionality */}
          <div 
            className="flex hover:cursor-pointer items-center w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            onClick={()=>selectAudio(audioRef)}
          >
            <span className="mr-2"><AudioLines className='h-4 dark:text-gray-300'/></span>
            Send Audio
                <input 
            type='file' 
            multiple 
            accept='audio/mpeg, audio/wav, audio/ogg' 
            style={{display:"none"}}
            onChange={(e)=> fileChangeHandler(e,"Audios")}
             ref={audioRef}
            />
          </div>

          {/* Upload File Functionality */}
          <div 
            className="flex hover:cursor-pointer items-center w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            onClick={()=>selectFile(fileRef)}
          >
            <span className="mr-2"><File className='h-4 dark:text-gray-300'/></span>
            Send Any File
                <input 
            type='file' 
            multiple 
            accept='*' 
            style={{display:"none"}}
            onChange={(e)=> fileChangeHandler(e,"Files")}
            ref={fileRef}
            />
          </div>

        </div>
      </div>
    </>
  )
}

export default FileMenu