import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { axiosInstanceWithHeaders } from "../../../axiosConfig/axiosInstance";

const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 20,
}));

function PieCenterLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    adsCount: 0,
    roomsCount: 0,
    facilitesCount: 0,
    users: 0,
    admin: 0,
    completed: 0,
    pending: 0,
  });
  const [loading, setLoading] = useState(true);

  const getDashboardData = async () => {
    try {
      const response = await axiosInstanceWithHeaders.get("/admin/dashboard");
      const data = response.data.data;
      setDashboardData({
        roomsCount: data.rooms,
        adsCount: data.ads,
        facilitesCount: data.facilities,
        users: data.users.user,
        admin: data.users.admin,
        completed: data.bookings.completed,
        pending: data.bookings.pending,
      });
      setLoading(false);
    } catch (error) {
   /*    console.log(error); */
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  const data1 = [
    { value: dashboardData.users, label: "Users" },
    { value: dashboardData.admin, label: "Admin" },
  ];

  const data2 = [
    { value: dashboardData.completed, label: "Completed" },
    { value: dashboardData.pending, label: "Pending" },
  ];

  const size = {
    width: 400,
    height: 200,
  };

  return (
    <>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
       
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              flexWrap: "wrap",
              gap: 3,
              marginBottom: 20,
              marginTop:7
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
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                '&:hover': {
                  boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                }
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
                    {dashboardData.roomsCount}
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
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                '&:hover': {
                  boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                }
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
                    {dashboardData.facilitesCount}
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
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                '&:hover': {
                  boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                }
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
                    {dashboardData.adsCount}
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              flexWrap: "wrap",
              gap: 3,
              alignItems: "center",
            }}
          >
            <Box>
              <PieChart
                series={[{ data: data2, innerRadius: 50 }]}
                {...size}
                sx={{ '& text': { fill: 'white' } }}
              />
            </Box>
            <Box>
              <PieChart series={[{ data: data1, innerRadius: 80 }]} {...size}>
                <PieCenterLabel>{dashboardData.users + dashboardData.admin}</PieCenterLabel>
              </PieChart>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default Dashboard;
