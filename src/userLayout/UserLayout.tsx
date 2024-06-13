import Box from "@mui/material/Box";
import Navbar from "../modules/SharedModule/components/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";

const UserLayout = () => {
  return (
    <>
      <Box sx={{ width: "100%", margin: "auto" }}>
        <Navbar />
        <Box sx={{ minHeight: "65vh" }}>
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default UserLayout;
