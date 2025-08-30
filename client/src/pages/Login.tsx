import React, { useState } from "react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ModeToggle } from "../components/toggle-theme";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="w-full min-h-screen">
      <div className="container mx-auto py-20">
        <Card>
          {isLogin?<>
           <CardHeader>
            <ModeToggle/>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
            <CardAction>Card Action</CardAction>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
          </>:<>
          </>}
         
        </Card>
      </div>
    </div>
  );
};

export default Login;
