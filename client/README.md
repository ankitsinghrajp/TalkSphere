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


