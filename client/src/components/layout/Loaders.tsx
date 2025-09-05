import React from 'react'
import Header from './Header'
import { MoonLoader} from "react-spinners"
import { useTheme } from '../theme-provider'

export const LayoutLoader = ()=>{
    const {theme} = useTheme();
    return(
        <div className='bg-gray-200 dark:bg-gray-950/95'>
        <Header/>
      <div className="container h-[calc(100vh-4rem)] mx-auto">
        
        <div className="grid grid-cols1 md:grid-cols-3">
              <div className=" md:block hidden w-full">
                <div className='w-full pt-20 flex justify-center items-center'>
                    {
                        theme=="dark"?<>
                         <MoonLoader size={30} color='#ffffff'/>
                        </>:<>
                        <MoonLoader size={30} color='#000000'/>
                        </>
                    }
               
                </div>
              </div>
              <div className='w-full'>
                    <div className='w-full pt-20 flex justify-center items-center'>
               {
                        theme=="dark"?<>
                         <MoonLoader size={30} color='#ffffff'/>
                        </>:<>
                        <MoonLoader size={30} color='#000000'/>
                        </>
                    }

                    </div>
              </div>

              <div className="hidden md:block w-full">
                <div className='w-full pt-20 flex justify-center items-center'>
                    {
                        theme=="dark"?<>
                         <MoonLoader size={30} color='#ffffff'/>
                        </>:<>
                        <MoonLoader size={30} color='#000000'/>
                        </>
                    }
                </div>
              </div>
        </div>
      
      </div>
      </div>
    )
}