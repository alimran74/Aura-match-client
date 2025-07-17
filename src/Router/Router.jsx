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
import BiodataDetails from "../Pages/Biodatas/BiodataDetails";
import MyFavourites from "../Pages/Dashboard/MyFavourites";
import Checkout from "../Pages/checkout/Checkout"
import MyContactRequest from "../Pages/Dashboard/MyContactRequest";
import AdminDashboard from "../Pages/Dashboard/AdminDashboard";
import ContactRequest from "../Pages/Dashboard/ContactRequest";
import ManageUser from "../Pages/Dashboard/ManageUsers";
import ManageUsers from "../Pages/Dashboard/ManageUsers";
import AdminRoute from "../routes/AdminRoute";
import ApprovedPremium from "../Pages/Dashboard/ApprovedPremium";
import GotMarried from "../Pages/Dashboard/GotMarried";
import AdminState from "../Pages/Dashboard/AdminState";
import SuccessStory from "../Pages/Dashboard/successStory";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <Forbidden />,
    children: [
      {
        index: true,
        element: <Home/>
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
        element: <Biodatas />,
      },
      {
        path: '/biodata/:id',
        element: <PrivateRoute>
          <BiodataDetails/>
        </PrivateRoute>
      },
      {
         path: "/checkout/contact/:id",
      element: <PrivateRoute>
          <Checkout/>
      </PrivateRoute>
      }
     
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        element: <Login/>
      },
      {
        path: "register",
        element: <Register/>
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
        path: "createbiodata",
        element: <CreateBiodata />,
      },
      {
        path: "editBiodata",
        element: <EditBiodata />,
      },
      {
        path: "myBiodata",
        element: <MyBiodata />,
      },
      {
        path: "favouriteBiodata",
        element: <MyFavourites/>
      },
      {
        path:'gotMarried',
        element: <GotMarried/>
      },
      {
        path: 'myContact-request',
        element: <MyContactRequest/>
      },
      {
        path: 'adminDashboard',
        element: <AdminRoute>
          <AdminDashboard/>
        </AdminRoute>
      },
      {
        path: 'approvedContactRequest',
        element: <AdminRoute>
          <ContactRequest/>
        </AdminRoute>
      },
      {
        path: 'manageUser',
        element: <AdminRoute>
          <ManageUsers/>
        </AdminRoute>
      },
      {
        path: 'ApprovePremium',
        element: <AdminRoute>
          <ApprovedPremium/>
        </AdminRoute>

      },
      {
        path:'Admin/state',
        element: <AdminRoute>
          <AdminState/>
        </AdminRoute>
      },
      {
        path:'successStory',
        element:<AdminRoute>
          <SuccessStory/>
        </AdminRoute>
      }

    ],
  },
]);
