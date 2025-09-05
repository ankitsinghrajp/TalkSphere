# LazyLoading
---> When we go to the inspect and see the source and and then see all the pages are loaded initially with all the images videos etc. 
But it is not good practice to load them at once here the lazyloading concept comes in.


So What is Lazyloading?
--> Lazyloading (or lazyload) is a technique in web development where content is loaded only when it's needed, instead of loading everything upfront.

-> Normally, when a web page loads, it tries to fetch all images, videos, scripts and data at once.
-> With lazy loading, elements(like images or components) are loaded only when they come into the user's viewport(visible area of the screen).

This reduces initial page load time, saves bandwidth, and improve performance.

Example with HTML: 
<img src="thumbnail.jpg" data-src="big-image.jpg" loading="lazy" alt="Example">

Example with React: 

import React, { Suspense } from "react";

const LazyComponent = React.lazy(() => import("./MyComponent"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}




# Difference between static & dynamic imports

# Static Import
  ---> Modules are imported at the top of the file, before code execution.
  ---> They are loaded at build time(compile time).
  ---> Always bring everything in before execution starts.
  ---> Syntax is fixed (import... from...);

# Dynamic Import
---> Modules are imported when needed during runtime.
---> They are loaded on demand(lazy-loaded).
---> Uses the import() function which returns a Promise.


# Dynamic Routing in React
---> Dynamic routing means routes are generated based on parameters instead of being fixed.
Example: 
static routes -> /about, /contact
dynamic routes -> /user/1 , /user/2 (the id changes dynamically)

# How to do dynamic routing in react
--> 1. Install React Router
    npm install react-router-dom

--> 2. Wrap your App in BrowserRouter
   import {BrowserRouter as Router} from "react-router-dom"
   <Router>
   <App/>
   </Router>

--> 3. Now in the App 
   import {Routes,Route} from "react-router-dom"
   <Routes>
   // This is the static routing
   <Route path="/home" element={<h1>This is the home page</h1>}/>
   // This is the dynamic routing
   <Route path="/home/:id" element={<h2> This is the dynamic routing page</h2>}/>
   </Routes>


# What is REACTNODE Why is it used?

--> In TypeScript, ReactNode is a type provided by React.
--> It describes anything that React can render inside the DOM

--> It is defined like this in React types:
  
  type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined
  
         ReactChild → string, number, React element (<div>Hi</div>)

         ReactFragment → <>...</>

         ReactPortal → rendering into another DOM tree (like modals)

         boolean, null, undefined → valid "nothing" values in React


# Why is ReactNode used?

When you make a reusable component that accepts children, you don’t know whether children will be:

a single element

text

a fragment

null (nothing)

or a mix of these

✅ ReactNode covers all those possibilities.


example:

 import React, { type ReactNode } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

type protectRouteProps = {
    children?: ReactNode;
    user: unknown | null;
    redirect?: string;
}

const ProtectedRoute: React.FC<protectRouteProps> = ({children, user, redirect='/login'}) => {

    if(!user) return <Navigate to={redirect}/>
       
    return children?children: <Outlet/>
}

export default ProtectedRoute



# What is Outlet in React Router Dom 

Outlet is a component provided by react-router-dom.

It acts as a placeholder for rendering the child routes of a parent route.

🔹 Why is it used?

When you define nested routes, Outlet tells React Router where to render those nested components inside the parent layout. Without it, nested routes won’t appear.


# memo
--> React.memo is a higher-order component (HOC) in react
--> It memoizes (remembers) a functional component's rendered output
--> This means if the component's props do not change, React will skip re-rendering that component.

# How to disable the right click behavior
--> 
  For example you create an react app and dont want to use this right open this inspect from right click
  Do one thing
  Go to your main.tsx file
  Wrap your app with 
  <div onContextMenu={e=>e.preventDefault()}>
   <App/> 
   </div>