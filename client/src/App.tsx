import React,{lazy} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

// These are the dynamic imports...

const Index = lazy(()=>import("./pages/Index"));
const Login = lazy(()=>import("./pages/Login"));
const Chat = lazy(()=>import("./pages/Chat"));
const Groups = lazy(()=>import("./pages/Groups"));
const App = () => {
  return <Router>

    <Routes>
      <Route path="/" element={<Index/>}/>
      <Route path="/chat/:chatId" element={<Chat/>}/>
      <Route path="/groups" element={<Groups/>}/>
      <Route path="/login" element={<Login/>}/>

    </Routes>

  </Router>
}

export default App
