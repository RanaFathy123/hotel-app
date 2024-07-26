import { Add, Remove } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { green, red } from "@mui/material/colors";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import image from "../../../assets/images/banner (1).png";
import Calendar from "../Calender/calendar";

const HeroSection = () => {
  const [bookingGuestCount, setBookingGuestCount] = useState(1);
  const today = dayjs();
  const nextDate = dayjs().add(5, "day");
  const [searchParams, setSearchParams] = useSearchParams();
  const initialStartDate = searchParams.get("startDate")
    ? dayjs(searchParams.get("startDate"))
    : today;
  const initialEndDate = searchParams.get("endDate")
    ? dayjs(searchParams.get("endDate"))
    : nextDate;

  const [selectedDateRange, setSelectedDateRange] = useState<[Dayjs, Dayjs]>([
    initialStartDate,
    initialEndDate,
  ]);

  const handleIncrease = () => {
    setBookingGuestCount(bookingGuestCount + 1);
  };

  const handleDecrease = () => {
    if (bookingGuestCount > 1) {
      setBookingGuestCount(bookingGuestCount - 1);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedDateRange[0] !== null && selectedDateRange[1] !== null) {
      const startDate = selectedDateRange[0].format("YYYY-MM-DD");
      const endDate = selectedDateRange[1].format("YYYY-MM-DD");
      setSearchParams({ startDate, endDate });
      localStorage.setItem('startDate',startDate)
      localStorage.setItem('endDate',endDate)

    }
  }, [selectedDateRange, setSearchParams]);

  return (
    <Container
      component="main"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "column", md: "row" },
        alignItems: "center",
        py: { xs: 4, sm: 6, md: 8 },
        justifyContent: "space-between",
      }}
    >
      {/* Text */}
      <Grid item xs={12} sm={6} md={6}>
        {/* Heading */}
        <Typography
          component="h1"
          sx={{
            marginTop: { xs: "10%", sm: "15%", md: "20%" },
            fontWeight: "bold",
            color: "rgba(21, 44, 91, 1)",
            fontSize: { xs: "32px", sm: "36px", md: "42px" },
          }}
        >
          Forget Busy Work,
          <br />
          Start Next Vacation
        </Typography>
        {/* Paragraph */}
        <Typography
          component="p"
          sx={{
            color: "rgba(176, 176, 176, 1)",
            fontSize: { xs: "16px", sm: "17px", md: "18px" },
            marginTop: 1,
          }}
        >
          We provide what you need to enjoy your holiday with family.
          <br /> Time to make another memorable moment.
        </Typography>
        {/* Start Booking */}
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "18px", sm: "19px", md: "20px" },
            marginBlock: "20px",
          }}
          color="rgba(21, 44, 91, 1)"
        >
          Start Booking
        </Typography>
        {/* Pick a Date */}
        <Typography
          variant="h5"
          sx={{ fontSize: { xs: "14px", sm: "15px" }, marginTop: "5px" }}
          color="rgba(21, 44, 91, 1)"
        >
          Pick a Date
        </Typography>
        {/* Calendar */}
        <Calendar {...{ selectedDateRange, setSelectedDateRange }} />
        {/* Capacity */}
        <Typography
          variant="h5"
          sx={{ fontSize: { xs: "14px", sm: "15px" }, marginTop: "20px" }}
          color="rgba(21, 44, 91, 1)"
        >
          Capacity
        </Typography>
        {/* Increase and Decrease Person */}
        <Box sx={{ display: "flex", width: "95%" }}>
          {/* Button Decrease */}
          <IconButton
            onClick={handleDecrease}
            sx={{
              fontSize: { xs: "1px", sm: "1px", md: "1px" },
              color: "white",
              backgroundColor: red[600],
              padding: {
                xs: "5px 10px",
                sm: "8px 15px",
                md: "10px 15px",
              },

              borderRadius: "5px",
              p: "8px",
              ml: "5px",
              mt: "16px",
              "&:hover": {
                backgroundColor: red[700],
              },
            }}
          >
            <Remove />
          </IconButton>
          <TextField
            sx={{
              backgroundColor: "#F5F6F8",
              border: "none !important",
              width: {
                xs: "100%",
                sm: "95%",
                md: "100%",
                lg: "100%",
                xl: "100%",
              },
              mt: 2,
              justifyContent: "center",
              alignItems: "center",
              "& .MuiInputBase-input": {
                textAlign: "center", // Center align the text value
                border: "none",
                outline: 0,
              },
              paddingX: 5,
            }}
            value={`${bookingGuestCount} person`}
          />
          {/* Button Increase */}
          <IconButton
            onClick={handleIncrease}
            sx={{
              color: "white",
              backgroundColor: green[500],
              fontSize: { xs: "1px", sm: "1px", md: "1px" },
              padding: {
                xs: "5px 10px",
                sm: "8px 15px",
                md: "10px 15px",
              },

              borderRadius: "5px",
              p: "8px",
              ml: "0px",
              mt: "16px",
              "&:hover": {
                backgroundColor: green[700],
              },
            }}
          >
            <Add />
          </IconButton>
        </Box>
        {/* Button Explore */}
        <Button
          onClick={() => {
            navigate("/explore");
          }}
          sx={{
            mt: 6,
            px: { xs: 6, sm: 8, md: 10 },
            fontSize: { xs: 16, sm: 18, md: 20 },
            bgcolor: "rgba(50, 82, 223, 1)",
          }}
          variant="contained"
        >
          Explore
        </Button>
      </Grid>
      {/* Image */}
      <Grid
        container
        item
        xs={12}
        sm={6}
        md={6}
        sx={{
          marginTop: { xs: "20px", sm: "40px", md: "80px" },
        }}
      >
        <img
          src={image}
          style={{ maxWidth: "100%", minWidth: "100%" }}
          alt="Responsive content"
        />
      </Grid>
    </Container>
  );
};

export default HeroSection;
