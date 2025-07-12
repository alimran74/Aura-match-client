import {
  createBrowserRouter,

} from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Login/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
            index: true,
            Component: Home,
        },
        {
          path:'about',
          element: <About/>
        },
        {
          path: 'contact',
          element: <Contact/>
        }
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login,
      }
    ]
  }
]);