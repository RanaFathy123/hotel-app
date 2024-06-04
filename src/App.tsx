import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdsList from "./modules/AdsModule/components/AdsList/AdsList";
import ChangePass from "./modules/AuthModule/components/ChangePass/ChangePass";
import ForgetPass from "./modules/AuthModule/components/ForgetPass/ForgetPass";
import Login from "./modules/AuthModule/components/Login/Login";
import LoginTest from "./modules/AuthModule/components/Login/LoginTest";
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
