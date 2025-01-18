import { createBrowserRouter } from "react-router-dom";
import Aboutus from "./components/Aboutus";
import Greetings from './components/Greetings';
import Contactus from './components/Contactus';
import App from "./App";
import Click from "./components/Click";
import CreatePost from "./components/blog/CreatePost";
import ViewPost from "./components/blog/Viewpost";
import EditPost from "./components/blog/EditPost";
import ListPosts from "./components/blog/ListPosts";
import Register from "./components/auth/register";
import Login from "./components/auth/Login";


const router = createBrowserRouter([
    { path: '', element: <App/> },
    { path: 'aboutus', element: <Aboutus/> },
    { path: 'greeting/:name', element: <Greetings/>},
    { path: 'contactus', element:<Contactus />},
    { path: "Click", element: <Click /> },
    {path: 'blog/posts', element:<ListPosts/>},
     { path : 'blog/posts/create' , element : <CreatePost/> },
     { path: 'blog/posts/:postId', element: <ViewPost/>},
     { path : '/blog/posts/:postId/edit', element: <EditPost/>},
     {path : 'Register', element: <Register/>},
     {path : 'Login', element: <Login/>}
   
   
    
]);

export default router;