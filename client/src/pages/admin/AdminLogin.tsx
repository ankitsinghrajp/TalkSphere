import  { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModeToggle } from "../../components/toggle-theme";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Eye, EyeOff, Lock, UserCog } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { AdminSignIn } from "../../validators/signing-validators";
import { Navigate } from "react-router-dom";

let isAdmin = false;

const AdminLogin = () => {

    const [showPassword, setShowPassword] = useState(false);

    type formFields = {
      secretKey:string
    };
  
    const {
      control,
      handleSubmit,
      reset,
      formState: { isSubmitting },
    } = useForm<formFields>({
      defaultValues: {
        secretKey:""
      },
      resolver: zodResolver(AdminSignIn),
    });
  
    const onSubmit: SubmitHandler<formFields> = (data) => {
      console.log("This is the data",data);
      reset();
      isAdmin = true;
    
    };
  
    if(isAdmin) return <Navigate to={'/admin/dashboard'}/>
  
  
  return (
    <div className="w-full min-h-screen bg-gradient-to-br dark:from-gray-900/50 dark:via-gray-900 dark:to-gray-950/50 transition-all duration-500">
      {/* Fixed Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <ModeToggle />
      </div>


      <div className="container mx-auto py-20 px-4 flex items-center justify-center min-h-screen">
       
          <Card className="w-full max-w-md bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-gray-200 dark:border-gray-800 shadow-2xl transform transition-all duration-500 hover:scale-[1.02] animate-slideUp">
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center transform transition-transform duration-300 hover:rotate-12 hover:scale-110">
                  <UserCog className="text-white" size={28} />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Admin Login
              </CardTitle>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Sign in to your account</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
               

                {/* Password Field */}
                <div className="space-y-3 animate-fadeIn">
                 
                  <div className="relative group flex justify-center items-center">
                    <Lock className="absolute left-3 text-gray-400 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors duration-200" size={18} />
                    <Controller
                      name="secretKey"
                      control={control}
                      render={({ field }) => (
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          className="pl-10 pr-10 bg-white/80 dark:bg-[#09090b] dark:text-white border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500"
                          placeholder="Enter your secret key"
                          {...field}
                        />
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-200 hover:scale-110"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

               

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 dark:hover:shadow-blue-400/25 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="inline-block transition-transform duration-200">
                    {isSubmitting ? "Signing In..." : "Sign In"}
                  </span>
                </Button>
              </form>
            </CardContent>
          </Card>
      </div>
    </div>
  )
}

export default AdminLogin