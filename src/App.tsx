import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdsList from "./modules/AdsModule/components/AdsList/AdsList";
import ChangePass from "./modules/AuthModule/components/ChangePass/ChangePass";
import ForgetPass from "./modules/AuthModule/components/ForgetPass/ForgetPass";
import Login from "./modules/AuthModule/components/Login/Login";
import Register from "./modules/AuthModule/components/Register/Register";
import ResetPass from "./modules/AuthModule/components/ResetPass/ResetPass";
import Dashboard from "./modules/DashboardModule/components/Dashboard";
import FacilitesData from "./modules/FacilitesModule/components/FacilitesData/FacilitesData";
import FacilitesList from "./modules/FacilitesModule/components/FacilitesList/FacilitesList";
import Favorites from "./modules/FavoritesModule/components/Favorites";
import Home from "./modules/HomeModule/components/Home";
import RoomDetails from "./modules/RoomsModule/components/RoomDetails/RoomDetails";
import RoomsData from "./modules/RoomsModule/components/RoomsData/RoomsData";
import RoomsList from "./modules/RoomsModule/components/RoomsList/RoomsList";
import RoomsTable from "./modules/RoomsTable/components/RoomsTable";
import AdminLayout from "./modules/SharedModule/components/AdminLayout/AdminLayout";
import AuthLayout from "./modules/SharedModule/components/AuthLayout/AuthLayout";
import MasterLayout from "./modules/SharedModule/components/MasterLayout/MasterLayout";
import NotFound from "./modules/SharedModule/components/NotFound/NotFound";
import ProtectedRoute from "./modules/SharedModule/components/ProtectedRoute/ProtectedRoute";
import UsersList from "./modules/UsersModules/components/UsersList";
import PrivateRoute from "./modules/SharedModule/components/PrivateRoute/PrivateRoute";

const App: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [messageType, setMessageType] = React.useState("");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    console.log(event);
  };
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [
        { path: "", element: <Home /> },
        { path: "room-details/:id", element: <RoomDetails /> },
        { path: "rooms", element: <RoomsList /> },
        { path: "favorites", element: <Favorites /> },
      ],
    },
    {
      path: "/",
      element: (
        <PrivateRoute>
          <AuthLayout />
        </PrivateRoute>
      ),
      children: [
        {
          path: "login",
          element: (
            <Login
              handleClick={handleClick}
              setMessage={setMessage}
              setMessageType={setMessageType}
            />
          ),
        },

        { path: "register", element: <Register /> },
        // { path: "verify", element: <VerifyAccount /> },
        { path: "forget-password", element: <ForgetPass /> },
        { path: "reset-password", element: <ResetPass /> },
        { path: "change-password", element: <ChangePass /> },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "", element: <Dashboard /> },
        { path: "rooms-list", element: <RoomsTable /> },
        { path: "room-data", element: <RoomsData /> },
        { path: "room-list", element: <RoomsList /> },
        { path: "facilites", element: <FacilitesList /> },
        { path: "facilites-data", element: <FacilitesData /> },
        { path: "ads", element: <AdsList /> },
        { path: "users", element: <UsersList /> },
      ],
    },
  ]);
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={handleClose}
          severity={messageType == "success" ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <ToastContainer />
      <RouterProvider router={routes} />
    </div>
  );
};

export default App;
