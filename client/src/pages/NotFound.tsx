import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../components/toggle-theme";
import { Home, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  
  return (
    <div className="w-full min-h-screen dark:bg-gray-900/95 transition-all duration-500">
      {/* Fixed Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <ModeToggle />
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto py-20 px-4 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-lg bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-gray-200 dark:border-gray-800 shadow-2xl transform transition-all duration-500 hover:scale-[1.02] animate-slideUp">
          <CardHeader className="text-center pb-6">
            {/* 404 Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center transform transition-transform duration-300">
                  <AlertTriangle className="text-white" size={36} />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm animate-pulse">
                  !
                </div>
              </div>
            </div>

            {/* 404 Text */}
            <div className="mb-4">
              <h1 className="text-8xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-fadeIn">
                404
              </h1>
            </div>

            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-slideDown">
              Page Not Found
            </CardTitle>
            <p className="text-gray-600 dark:text-gray-400 mt-4 text-lg animate-fadeIn">
              Oops! The page you're looking for seems to have wandered off into the digital void.
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Fun Message */}
            <div className="text-center space-y-3 animate-slideUp">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800/50">
                <p className="text-blue-700 dark:text-blue-300 font-medium">
                  Don't worry, even the best explorers sometimes take a wrong turn!
                </p>
              </div>
              
              <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <p>Here are a few things you can try:</p>
                <ul className="list-none space-y-1">
                  <li>• Check if the URL is typed correctly</li>
                  <li>• Go back to the previous page</li>
                  <li>• Search for what you're looking for</li>
                  <li>• Return to our homepage</li>
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 animate-slideUp">
              {/* Primary Action - Go Home */}
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 dark:hover:shadow-blue-400/25 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <Home className="mr-2" size={20} />
                <Link to={'/'}>
                <span className="inline-block transition-transform duration-200">
                  Go to Homepage
                </span>
                </Link>
              </Button>

             
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">or</span>
              </div>
            </div>

            {/* Help Section */}
            <div className="text-center animate-fadeIn">
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                Need help finding something specific?
              </p>
              <Button
                variant="ghost"
                className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 hover:underline transform hover:scale-105"
              >
                Contact Support
              </Button>
            </div>

            {/* Footer Message */}
            <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700 animate-slideUp">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Lost in <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">TalkSphere</span>? 
                We'll help you find your way back.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
};

export default NotFound;