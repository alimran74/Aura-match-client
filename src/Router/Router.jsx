import {
  createBrowserRouter,

} from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";

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
]);