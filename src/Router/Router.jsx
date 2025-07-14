import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Registration/Register";
import PrivateRoute from "../routes/PrivateRoute";
import Biodatas from "../Pages/Biodatas/Biodatas";
import DashboardLayout from "../Layouts/DashboardLayout";
import Forbidden from "../Pages/Error/Forbidden";
import CreateBiodata from "../Pages/Dashboard/CreateBiodata";
import EditBiodata from "../Pages/Dashboard/EditBiodata";
import MyBiodata from "../Pages/Dashboard/MyBiodata";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <Forbidden/>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "/forbidden",
        element: <Forbidden />,
      },
      {
        path: "/biodatas",
        element: 
            <Biodatas />
          
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: 'createbiodata',
        element: <CreateBiodata/>

      },
      {
        path: 'editBiodata',
        element: <EditBiodata/>
      },
      {
        path:'myBiodata',
        element: <MyBiodata/>
      }
    ]
  },
]);
