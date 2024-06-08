import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { axiosInstanceWithHeaders } from "../../../axiosConfig/axiosInstance";
// import { PieChart } from "@mui/x-charts/PieChart";
import { Stack } from "@mui/material";
import { Palette } from "@mui/icons-material";

const Dashboard = () => {
  const [roomsCount, setRoomsCount] = useState(0);
  const [facilitesCount, setFacilitesCount] = useState(0);
  const [adsCount, setAddsCount] = useState(0);
  const [pending, setPendind] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [users, setUsers] = useState(0);
  const [admin, setAdmin] = useState(0);

  const pieParams = { height: 200, margin: { right: 5 } };

  const getDashboardData = async () => {
    try {
      const response = await axiosInstanceWithHeaders.get("/admin/dashboard");
      const roomsCount = response.data.data.rooms;
      const facilitesCount = response.data.data.facilities;
      const adsCount = response.data.data.ads;
      console.log(response.data.data.users.user);
      console.log(response.data.data.users.admin);
      const users = response.data.data.users.user;
      setUsers(users);
      const admin = response.data.data.users.admin;
      setAdmin(admin);
      const pendingBookings = response.data.data.bookings.pending;
      const completedBookings = response.data.data.bookings.completed;
      setPendind(pendingBookings);
      setCompleted(completedBookings);
      setRoomsCount(roomsCount);
      setFacilitesCount(facilitesCount);
      setAddsCount(adsCount);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);
  return (
    <>
      <Box
        component="div"
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          gap: 3,
          marginBottom: 20,
        }}
      >
        <Card
          sx={{
            minWidth: 275,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            background: "#1A1B1E",
            borderRadius: "10px",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "white",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography sx={{ fontSize: 23, fontWeight: "bold" }}>
                {roomsCount}
              </Typography>
              <Typography
                sx={{ fontSize: 22, fontWeight: "bold", color: "#FFFFFF" }}
              >
                Rooms
              </Typography>
            </Box>
            <Typography sx={{ color: "blue" }}>
              <MeetingRoomIcon />
            </Typography>
          </CardContent>
        </Card>
        <Card
          sx={{
            minWidth: 275,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            background: "#1A1B1E",
            borderRadius: "10px",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "white",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography sx={{ fontSize: 23, fontWeight: "bold" }}>
                {facilitesCount}
              </Typography>
              <Typography
                sx={{ fontSize: 22, fontWeight: "bold", color: "#FFFFFF" }}
              >
                Facilities
              </Typography>
            </Box>
            <Typography sx={{ color: "blue" }}>
              <ManageAccountsIcon />
            </Typography>
          </CardContent>
        </Card>
        <Card
          sx={{
            minWidth: 275,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            background: "#1A1B1E",
            borderRadius: "10px",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "white",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography sx={{ fontSize: 23, fontWeight: "bold" }}>
                {roomsCount}
              </Typography>
              <Typography
                sx={{ fontSize: 22, fontWeight: "bold", color: "#FFFFFF" }}
              >
                Ads
              </Typography>
            </Box>
            <Typography sx={{ color: "blue" }}>
              <CalendarMonthIcon />
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Stack
        direction="row"
        width="100%"
        textAlign="center"
        spacing={5}
        sx={{ marginTop: 5 }}
      >
        <Box flexGrow={1}>
          <Typography variant="h6" gutterBottom>
            Tasks Status
          </Typography>
          {/* <PieChart
            series={[{ data: [{ value: pending }, { value: completed }] }]}
            {...pieParams}
          /> */}
          <Box mt={2}>
            <Typography variant="body1">Pending: {pending}</Typography>
            <Typography variant="body1">Completed: {completed}</Typography>
          </Box>
        </Box>
        <Box flexGrow={1}>
          <Typography variant="h6" gutterBottom>
            User Roles
          </Typography>
          {/* <PieChart
            series={[{ data: [{ value: users }, { value: admin }] }]}
            {...pieParams}
          /> */}
          <Box mt={2}>
            <Typography variant="body1">Users: {users}</Typography>
            <Typography variant="body1">Admins: {admin}</Typography>
          </Box>
        </Box>
      </Stack>
    </>
  );
};

export default Dashboard;
