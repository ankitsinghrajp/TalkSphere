import { useEffect } from "react";
import { toast } from "sonner";

const useErrors = (errors = [])=>{

    useEffect(()=>{
          errors.forEach(({isError, error, fallback})=>{
                 if(isError){

                    if(fallback){
                        fallback();
                    }
                    else{
                        toast.error(error?.data?.message || "Error in fetching conversations!");
                    }

                    
                 }
          })
        },[])

}

export {useErrors};