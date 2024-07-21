import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";

const UserLayout = () => {
  return (
    <>
      <Box sx={{ width: "100%", margin: "auto" }}>
        <NavBar />
        <Box sx={{ minHeight: "65vh" }}>
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default UserLayout;
