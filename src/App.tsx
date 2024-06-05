import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MasterLayout from "./modules/SharedModule/components/MasterLayout/MasterLayout";
import NotFound from "./modules/SharedModule/components/NotFound/NotFound";
import RoomDetails from "./modules/RoomsModule/components/RoomDetails/RoomDetails";
import RoomsList from "./modules/RoomsModule/components/RoomsList/RoomsList";
import AuthLayout from "./modules/SharedModule/components/AuthLayout/AuthLayout";
import "react-toastify/dist/ReactToastify.css";
import Register from "./modules/AuthModule/components/Register/Register";
import Login from "./modules/AuthModule/components/Login/Login";
import ForgetPass from "./modules/AuthModule/components/ForgetPass/ForgetPass";
import ResetPass from "./modules/AuthModule/components/ResetPass/ResetPass";
import AdminLayout from "./modules/SharedModule/components/AdminLayout/AdminLayout";
import RoomsTable from "./modules/RoomsTable/components/RoomsTable";
import RoomsData from "./modules/RoomsModule/components/RoomsData/RoomsData";
import FacilitesList from "./modules/FacilitesModule/components/FacilitesList/FacilitesList";
import AdsList from "./modules/AdsModule/components/AdsList/AdsList";
import FacilitesData from "./modules/FacilitesModule/components/FacilitesData/FacilitesData";
import Dashboard from "./modules/DashboardModule/components/Dashboard";
import Home from "./modules/HomeModule/components/Home";
import Favorites from "./modules/FavoritesModule/components/Favorites";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./modules/SharedModule/components/ProtectedRoute/ProtectedRoute";
import ChangePass from "./modules/AuthModule/components/ChangePass/ChangePass";
import LoginTest from "./modules/AuthModule/components/Login/LoginTest";
import DeleteData from "./modules/SharedModule/components/DeleteData/DeleteData";
import { Alert, Snackbar } from "@mui/material";
import React, { forwardRef } from "react";

const App: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");
  const [messageType, setMessageType] = React.useState<string>("");

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
      element: <AuthLayout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "login-test", element: <LoginTest /> },

        { path: "register", element: <Register /> },
        // { path: "verify", element: <VerifyAccount /> },
        { path: "forget-pass", element: <ForgetPass /> },
        { path: "reset-pass", element: <ResetPass /> },
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
        {
          path: "rooms-list",
          element: (
            <RoomsTable
              handleClick={handleClick}
              setMessage={setMessage}
              setMessageType={setMessageType}
            />
          ),
        },
        { path: "room-data", element: <RoomsData /> },
        { path: "room-list", element: <RoomsList /> },
        { path: "facilites", element: <FacilitesList handleClick={handleClick}
        setMessage={setMessage}
        setMessageType={setMessageType}/> },
        { path: "facilites-data", element: <FacilitesData /> },
        { path: "ads", element: <AdsList  handleClick={handleClick}
        setMessage={setMessage}
        setMessageType={setMessageType} /> },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={routes} />
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={messageType === "success" ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default App;
