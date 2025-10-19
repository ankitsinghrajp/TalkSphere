import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { SignInSchema } from "../validators/signing-validators";
import { SignUpSchema } from "../validators/signing-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModeToggle } from "../components/toggle-theme";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Eye, EyeOff, User, Mail, Lock, Camera, X } from "lucide-react";
import axios from "axios";
import {server} from "../components/constants/config";
import { useDispatch } from "react-redux";
import { userExists } from "../redux/reducers/auth";
import { toast } from "sonner";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);


  const dispatch = useDispatch();

  type formFields = {
    avatar?: File;
    name?: string;
    username: string;
    bio?: string;
    password: string;
  };

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<formFields>({
    defaultValues: {
      name: "",
      username: "",
      bio: "",
      password: "",
    },
    resolver: zodResolver(isLogin ? SignInSchema : SignUpSchema),
  });

  const onSubmit: SubmitHandler<formFields> = async (dataFromUser) => {

      if(!dataFromUser.bio && !dataFromUser.name){

           const config = {
           withCredentials:true,
           headers:{
          "Content-Type":"application/json"
          }
         };

        // Login Handler
        try {
        const {data} = await axios.post(`${server}/api/v1/user/login`,{
        username:dataFromUser.username,
        password:dataFromUser.password
      },config)
      
      dispatch(userExists(data.user));
      localStorage.setItem("loggedInUser",JSON.stringify(data.user));

      toast.success(data.message);

       } 
       catch (error) {
          toast.error(error?.response?.data?.message || "Something went wrong");
        }

      }
      else{
        // Sign Up Handler

        const config = {
            withCredentials:true,
            headers:{
              "Content-Type":"multipart/form-data"
            }
          }

        const formData = new FormData();
        formData.append("avatar",profileImage);
        formData.append("name",dataFromUser.name);
        formData.append("bio",dataFromUser.bio);
        formData.append("username",dataFromUser.username);
        formData.append("password",dataFromUser.password);
        try {
          
         const {data} = await axios.post(
          `${server}/api/v1/user/new`,
          formData,
          config
         );


         dispatch(userExists(data.user));
      localStorage.setItem("loggedInUser",JSON.stringify(data.user));
         toast.success(data.message);
        } catch (error) {
          toast.error(error?.response?.data?.message || "Something Went Wrong");
        }



      
    }

    reset();
    setProfileImagePreview(null);
  };

  useEffect(() => {
    reset();
    setProfileImagePreview(null);
  }, [isLogin, reset]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProfileImage(null);
    setProfileImagePreview(null);
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="w-full min-h-screen dark:bg-gray-900/95 transition-all duration-500">
      {/* Fixed Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <ModeToggle />
      </div>


      <div className="container mx-auto py-20 px-4 flex items-center justify-center min-h-screen">
        {isLogin ? (
          <Card className="w-full max-w-md bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-gray-200 dark:border-gray-800 shadow-2xl transform transition-all duration-500 hover:scale-[1.02] animate-slideUp">
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center transform transition-transform duration-300 hover:rotate-12 hover:scale-110">
                  <User className="text-white" size={28} />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Welcome Back
              </CardTitle>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Sign in to your account</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Username Field */}
                <div className="space-y-2 animate-fadeIn">
                  <label htmlFor="username" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Username
                  </label>
                  <div className="relative group flex justify-center items-center">
                    <Mail className="absolute left-3  text-gray-400 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors duration-200" size={18} />
                    <Controller
                      name="username"
                      control={control}
                      render={({ field }) => (
                        <Input
                          className="pl-10 bg-white/80 dark:bg-[#09090b] dark:text-white border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500"
                          placeholder="Enter your username"
                          {...field}
                        />
                      )}
                    />
                    </div>
                    {errors.username && (
                      <span className="text-red-500 dark:text-red-400 text-sm animate-fadeIn">
                        {errors.username.message}
                      </span>
                    )}
                  
                </div>

                {/* Password Field */}
                <div className="space-y-2 animate-fadeIn">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <div className="relative group flex justify-center items-center">
                    <Lock className="absolute left-3 text-gray-400 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors duration-200" size={18} />
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          className="pl-10 pr-10 bg-white/80 dark:bg-[#09090b] dark:text-white border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500"
                          placeholder="Enter your password"
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
                    {errors.password && (
                      <span className="text-red-500 dark:text-red-400 text-sm animate-fadeIn">
                        {errors.password.message}
                      </span>
                    )}
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

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">or</span>
                  </div>
                </div>


                {/* Toggle to Sign Up */}
                <div className="text-center mt-6">
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Don't have an account? </span>
                  <span
                    className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 font-semibold cursor-pointer transition-all duration-200 hover:underline transform hover:scale-105 inline-block"
                    onClick={() => setIsLogin(false)}
                  >
                    Sign up
                  </span>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card className="w-full max-w-md bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-gray-200 dark:border-gray-800 shadow-2xl transform transition-all duration-500 hover:scale-[1.02] animate-slideUp">
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center transform transition-transform duration-300 hover:rotate-12 hover:scale-110">
                  <User className="text-white" size={28} />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Create Account
              </CardTitle>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Join TalkSphere</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Profile Image Upload */}
                <div className="flex flex-col items-center space-y-4 animate-fadeIn">
                  <div className="relative group">
                    <div className={`w-28 h-28 rounded-full border-4 border-dashed transition-all duration-300 flex items-center justify-center overflow-hidden cursor-pointer border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 group-hover:bg-blue-50/50 dark:group-hover:bg-blue-900/20 ${profileImagePreview ? 'border-solid border-blue-500 dark:border-blue-400' : ''}`}>
                      {profileImagePreview ? (
                        <img 
                          src={profileImagePreview} 
                          alt="Profile Preview" 
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <div className="text-center">
                          <Camera className="text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-200 mx-auto" size={24} />
                          <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">Upload</span>
                        </div>
                      )}
                    </div>
                    <input
                      {...register("avatar", {
                        onChange: (e) => {
                          setProfileImage(e.target.files);
                          handleImageChange(e);
                        },
                      })}
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {profileImagePreview && (
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full text-xs transition-all duration-200 hover:scale-110 shadow-lg"
                      >
                        <X size={12} />
                      </button>
                    )}
                  </div>
                  {errors.avatar && (
                    <span className="text-red-500 dark:text-red-400 text-sm animate-fadeIn">
                      {errors.avatar.message}
                    </span>
                  )}
                </div>

                {/* Name Field */}
                <div className="space-y-2 animate-slideDown">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Full Name
                  </label>
                  <div className="relative group flex justify-center items-center">
                    <User className="absolute left-3  text-gray-400 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors duration-200" size={18} />
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <Input
                          className="pl-10 bg-white/80 dark:bg-[#09090b] dark:text-white border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500"
                          placeholder="Enter your full name"
                          {...field}
                        />
                      )}
                    />
                  </div>
                  {errors.name && (
                      <span className="text-red-500 dark:text-red-400 text-sm animate-fadeIn">
                        {errors.name.message}
                      </span>
                    )}
                </div>

                {/* Username Field */}
                <div className="space-y-2 animate-slideDown">
                  <label htmlFor="username" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Username
                  </label>
                  <div className="relative group flex justify-center items-center">
                    <Mail className="absolute left-3  text-gray-400 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors duration-200" size={18} />
                    <Controller
                      name="username"
                      control={control}
                      render={({ field }) => (
                        <Input
                          className="pl-10 bg-white/80 dark:bg-[#09090b] dark:text-white border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500"
                          placeholder="Choose a username"
                          {...field}
                        />
                      )}
                    />
                    </div>
                    {errors.username && (
                      <span className="text-red-500 dark:text-red-400 text-sm animate-fadeIn">
                        {errors.username.message}
                      </span>
                    )}
                </div>

                {/* Bio Field */}
                <div className="space-y-2 animate-slideDown">
                  <label htmlFor="bio" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Short Bio
                  </label>
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors duration-200" size={18} />
                    <Controller
                      name="bio"
                      control={control}
                      render={({ field }) => (
                        <Input
                          className="pl-10 bg-white/80 dark:bg-[#09090b] dark:text-white border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500"
                          placeholder="Tell us about yourself"
                          {...field}
                        />
                      )}
                    />
                    {errors.bio && (
                      <span className="text-red-500 dark:text-red-400 text-sm animate-fadeIn">
                        {errors.bio.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2 animate-slideDown">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <div className="relative group flex justify-center items-center">
                    <Lock className="absolute left-3 text-gray-400 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors duration-200" size={18} />
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          className="pl-10 pr-10 bg-white/80 dark:bg-[#09090b] dark:text-white border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500"
                          placeholder="Create a strong password"
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
                  {errors.password && (
                      <span className="text-red-500 dark:text-red-400 text-sm animate-fadeIn">
                        {errors.password.message}
                      </span>
                    )}
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 dark:hover:shadow-blue-400/25 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="inline-block transition-transform duration-200">
                    {isSubmitting ? "Creating Account..." : "Create Account"}
                  </span>
                </Button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">or</span>
                  </div>
                </div>


                {/* Toggle to Login */}
                <div className="text-center mt-6">
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Already have an account? </span>
                  <span
                    className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 font-semibold cursor-pointer transition-all duration-200 hover:underline transform hover:scale-105 inline-block"
                    onClick={() => setIsLogin(true)}
                  >
                    Login
                  </span>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Login;