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
import BookingList from "./modules/BookingModule/components/BookingList";
import RoomsData from "./modules/RoomsModule/components/RoomsData/RoomsData";
import RoomsTable from "./modules/RoomsTable/components/RoomsTable";
import AdminLayout from "./modules/SharedModule/components/AdminLayout/AdminLayout";
import AuthLayout from "./modules/SharedModule/components/AuthLayout/AuthLayout";
import NotFound from "./modules/SharedModule/components/NotFound/NotFound";
import PrivateRoute from "./modules/SharedModule/components/PrivateRoute/PrivateRoute";
import ProtectedRoute from "./modules/SharedModule/components/ProtectedRoute/ProtectedRoute";
import UsersList from "./modules/UsersModules/components/UsersList";
import Checkout from "./userLayout/pages/Checkout/Checkout";
import ExplorePage from "./userLayout/pages/ExplorePage/ExplorePage";
import Landing from "./userLayout/pages/Landing/Landing";
import UserLayout from "./userLayout/Layout/UserLayout";
import RoomDetails from "./userLayout/pages/RoomDetails/RoomDetails";
import "./App.css";

import Favorites from "./userLayout/pages/Favorites/Favorites";
import SuccessPayment from "./userLayout/pages/SuccessPayment/SuccessPayment";

const App = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <UserLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Landing /> },
        { path: "landing", element: <Landing /> },
        { path: "explor/:state", element: <Landing /> },
        { path: "explore", element: <ExplorePage /> },
        { path: "favorites", element: <Favorites /> },
        { path: "RoomDetails/:id", element: <RoomDetails /> },
        { path: "checkout", element: <Checkout /> },
        { path: "success-checkout", element: <SuccessPayment /> },

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
          element: <Login />,
        },

        { path: "register", element: <Register /> },
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
        {
          path: "rooms-list",
          element: <RoomsTable />,
        },
        { path: "room-data", element: <RoomsData /> },
        { path: "edit-room-data/:id", element: <RoomsData /> },

        {
          path: "facilites",
          element: <FacilitesList />,
        },
        { path: "facilites-data", element: <FacilitesData /> },
        {
          path: "ads",
          element: <AdsList />,
        },
        {
          path: "booking",
          element: <BookingList />,
        },
        { path: "users", element: <UsersList /> },
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
