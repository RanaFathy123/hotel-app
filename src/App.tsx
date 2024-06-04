import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MasterLayout from "./modules/SharedModule/components/MasterLayout/MasterLayout";
import NotFound from "./modules/SharedModule/components/NotFound/NotFound";
import RoomDetails from "./modules/RoomsModule/components/RoomDetails/RoomDetails";
import RoomsList from "./modules/RoomsModule/components/RoomsList/RoomsList";
import AuthLayout from "./modules/SharedModule/components/AuthLayout/AuthLayout";
import { ToastContainer } from "react-toastify";
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

const App = () => {
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
        { path: "change-pass", element: <ChangePass /> },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <AdminLayout  />
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
        { path: "DeleteData", element: <DeleteData /> },

      ],
    },
  ]);
  return (
    <div>
      <ToastContainer />
      <RouterProvider router={routes} />
    </div>
  );
};

export default App;
