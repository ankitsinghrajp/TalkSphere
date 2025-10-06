import { useEffect, useState } from "react";
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

const useAsyncMutation = (mutationHook)=>{

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);

    const [mutate] = mutationHook();

    const executeMutation = async (toastMessage, ...args)=>{
        setIsLoading(true);

        const toastId = toast.loading(toastMessage || "Updating data...");
        
        try {

            const res = await mutate(...args);

            if(res.data){
                toast.success(res?.data?.message || "Success!",{
                    id:toastId,
                })

                 setData(res.data);
            }

            else{
                toast.error("Something went wrong",{
                    id:toastId,
                });
            }
            
        } catch (error) {
            toast.error("Something went wrong!",{
                id:toastId
            });
            
        }finally{
            setIsLoading(false);
        }
 }
  return [executeMutation, isLoading, data];
}

export {useErrors, useAsyncMutation};