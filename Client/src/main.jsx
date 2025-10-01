import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./components/Home/Home.jsx";
import About from "./components/about/About.jsx";
import Contact from "./components/Contact/Contact.jsx";
import AllBooks from "./components/AllBooks/AllBooks.jsx";
import AddToCart from "./components/AddToCart/AddToCart.jsx";
import UserProfile from "./components/User/UserProfile.jsx";
import Register from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";
import AIBookReader from "./components/AIBook/AIBookReader.jsx";
import AdminHome from "./Admin/AdminHome.jsx";
import UserRoute from "./components/AuthRoute/UserRoute.jsx";
import ProtectedRoute from "./components/AuthRoute/ProtectedRoute.jsx";
import AdminLayout from "./Admin/AdminLayout.jsx";
import AdminRoute from "./components/AuthRoute/AdminRoute.jsx";

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout/>,
//     children: [
//       {path:"",
//         element: <Home/>
//       },
//       {
//         path: "about",
//         element: <About/>
//       },
//       {
//         path: "Contact",
//         element: <Contact/>
//       }
//     ]
//   }
// ])

// onother way to declare route
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route
          path=""
          element={
            <UserRoute>
              <Home />
            </UserRoute>
          }
        ></Route>

        <Route
          path="about"
          element={
            <UserRoute>
              <About />
            </UserRoute>
          }
        ></Route>

        <Route
          path="Contact"
          element={
            <UserRoute>
              <Contact />
            </UserRoute>
          }
        ></Route>

        <Route
          path="AllBooks"
          element={
            <UserRoute>
              <AllBooks />
            </UserRoute>
          }
        ></Route>

        <Route
          path="AIBookReader"
          element={
            <UserRoute>
              <AIBookReader />
            </UserRoute>
          }
        ></Route>

        {/* Register & Login */}
        <Route
          path="Register"
          element={
            <ProtectedRoute requireAuth={false}>
              <Register />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="Login"
          element={
            <ProtectedRoute requireAuth={false}>
              <Login />
            </ProtectedRoute>
          }
        ></Route>

        {/* User Profile and cart*/}
        <Route
          path="AddToCart"
          element={
            <ProtectedRoute requireAuth={true}>
              <UserRoute>
                <AddToCart />
              </UserRoute>
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="UserProfile"
          element={
            <ProtectedRoute requireAuth={true}>
              <UserRoute>
                <UserProfile />
              </UserRoute>
            </ProtectedRoute>
          }
        ></Route>
      </Route>

      {/* Admin panel */}
      <Route
        path="AdminHome"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<AdminHome />} />
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
