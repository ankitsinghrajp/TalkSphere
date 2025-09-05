import React,{lazy, Suspense} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ProtectedRoute from "./components/auth/protectRoute";
import { LayoutLoader } from "./components/layout/Loaders";

// These are the dynamic imports...

const Index = lazy(()=>import("./pages/Index"));
const Login = lazy(()=>import("./pages/Login"));
const Chat = lazy(()=>import("./pages/Chat"));
const Groups = lazy(()=>import("./pages/Groups"));
const NotFound = lazy(()=>import("./pages/NotFound"));

const user = true;


const App = () => {
  return <Router>

       <Suspense fallback={<LayoutLoader/>}>

         <Routes>
       {/* This all are the protected routes */}
      <Route element={<ProtectedRoute user={user}/>}>
          <Route path="/" element={<Index/>}/>
          <Route path="/chat/:chatId" element={<Chat/>}/>
          <Route path="/groups" element={<Groups/>}/>

      </Route>

       {/* This is how can we give single single protected routes */}
      {/* <Route path="/" element={<ProtectedRoute user={user}> <Index/> </ProtectedRoute>}/> */}
      <Route path="/login" element={
        <ProtectedRoute user={!user} redirect="/">
            <Login/>
        </ProtectedRoute>
       
        }/>

        <Route path="*" element={<NotFound/>}/>

    </Routes>

       </Suspense>

  </Router>
}

export default App
