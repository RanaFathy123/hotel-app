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
      localStorage.setItem("startDate", startDate);
      localStorage.setItem("endDate", endDate);
    }
  }, [selectedDateRange, setSearchParams]);

  return (
    <Container
      component="main"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        py: { xs: 4, md: 8 },
        justifyContent: "space-between",
      }}
    >
      {/* Text Section */}
      <Grid item xs={12} md={6}>
        {/* Heading */}
        <Typography
          component="h1"
          sx={{
            mt: { xs: "10%", md: "20%" },
            fontWeight: "bold",
            color: "rgba(21, 44, 91, 1)",
            fontSize: { xs: "32px", md: "42px" },
            textAlign: { xs: "center", md: "left" },
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
            fontSize: { xs: "16px", md: "18px" },
            mt: 1,
            textAlign: { xs: "center", md: "left" },
          }}
        >
          We provide what you need to enjoy your holiday with family.
          <br /> Time to make another memorable moment.
        </Typography>
        {/* Start Booking */}
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "18px", md: "20px" },
            my: 2,
            textAlign: { xs: "center", md: "left" },
          }}
          color="rgba(21, 44, 91, 1)"
        >
          Start Booking
        </Typography>
        {/* Pick a Date */}
        <Typography
          variant="h5"
          sx={{
            fontSize: { xs: "14px", md: "15px" },
            mt: 1,
            textAlign: { xs: "center", md: "left" },
          }}
          color="rgba(21, 44, 91, 1)"
        >
          Pick a Date
        </Typography>
        {/* Calendar */}
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "flex-start" },
          }}
        >
          <Calendar {...{ selectedDateRange, setSelectedDateRange }} />
        </Box>
        {/* Capacity */}
        <Typography
          variant="h5"
          sx={{
            fontSize: { xs: "14px", md: "15px" },
            mt: 2,
            textAlign: { xs: "center", md: "left" },
          }}
          color="rgba(21, 44, 91, 1)"
        >
          Capacity
        </Typography>
        {/* Increase and Decrease Person */}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: { xs: "center", md: "flex-start" },
            alignItems: "center",
            mt: 2,
          }}
        >
          <IconButton
            onClick={handleDecrease}
            sx={{
              color: "white",
              backgroundColor: red[500],
              fontSize: { xs: "1px", sm: "1px", md: "1px" },
              padding: {
                xs: "5px 10px",
                sm: "8px 15px",
                md: "10px 15px",
              },
              borderRadius: "5px",
              "&:hover": {
                backgroundColor: red[500], // Keeping the same background color on hover
              },
            }}
          >
            <Remove />
          </IconButton>
          <TextField
            sx={{
              mx: 2,
              width: "100%",
              textAlign: "center",
              "& .MuiInputBase-input": {
                textAlign: "center",
              },
            }}
            value={`${bookingGuestCount} person`}
            inputProps={{ readOnly: true }}
          />
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
              "&:hover": {
                backgroundColor: green[500], // Keeping the same background color on hover
              },
              borderRadius: "5px",
            }}
          >
            <Add />
          </IconButton>
        </Box>
        {/* Button Explore */}
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "flex-start" },
            mt: 4,
          }}
        >
          <Button
            onClick={() => navigate("/explore")}
            sx={{
              px: { xs: 6, md: 10 },
              fontSize: { xs: 16, md: 20 },
              bgcolor: "rgba(50, 82, 223, 1)",
            }}
            variant="contained"
          >
            Explore
          </Button>
        </Box>
      </Grid>
      {/* Image Section */}
      <Grid
        container
        item
        xs={12}
        md={6}
        sx={{
          mt: { xs: 4, md: 0 },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src={image}
          style={{ maxWidth: "100%", height: "auto" }}
          alt="Responsive content"
        />
      </Grid>
    </Container>
  );
};

export default HeroSection;
