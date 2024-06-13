/* eslint-disable no-extra-semi */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { IconButton, TextField, Button } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { green, red } from "@mui/material/colors";
import PopularAds from "./PopularAds";
import Calendar from "./calendar";
import { axiosInstanceWithHeaders } from "../axiosConfig/axiosInstance";
import { AuthContext } from "../context/AuthContext";
import dayjs, { Dayjs } from "dayjs";
import image from "../assets/images/banner (1).png";
import defaultImage from "../assets/images/defaultImage.jpg";

// interface
interface ADS {
  _id: string;
  room: {
    price: number;
    roomNumber: string;
    capacity: number;
    discount: number;
    images: string[];
    _id: string;
  };
}
// Function Landing
export default function Landing () {
  const navigate = useNavigate();
  const theme = useTheme();

  // get ads
  const [ADSList, setADSList] = useState<ADS[]>([]);

  //Pick a Date
  const today = dayjs();
  const nextDate = dayjs().add(1, "day");
  const [selectedDateRange, setSelectedDateRange] = useState<[Dayjs, Dayjs]>([
    today,
    nextDate,
  ]);

  // bookingGuestCount
  const [bookingGuestCount, setBookingGuestCount] = useState(1);
  // increase Number
  const handleIncrease = () => {
    setBookingGuestCount(bookingGuestCount + 1);
  };
// Decrease Number
  const handleDecrease = () => {
    if (bookingGuestCount > 1) {
      setBookingGuestCount(bookingGuestCount - 1);
    }
  };

  // get ads data for PopularAds
  const DataAds = async () => {
    try {
      const response = await axiosInstanceWithHeaders.get(
        `/portal/ads?page=1&size=5`
      );
      setADSList(response.data.data.ads);
    } catch (error) {
      console.log("error");
    }
  };
  // hook use Effect
  useEffect(() => {
    DataAds();
  }, []);

  // condition for context
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null;
  }

  // Code tsx 
  return <>
    {/* 1)Forget Busy Work,*/}
    <Grid container sx={{paddingX:"80px",marginBottom:"100px"}}>

<Grid container component="main" sx={{justifyContent:"space-evenly"}} >
{/* Text */}
  <Grid  item xs={12} sm={6} md={6}  >
            {/* Heading */}
        <Typography component="h1" sx={{marginLeft:5,marginTop:"20%",fontWeight:"bold",color: "rgba(21, 44, 91, 1)",fontSize:"42px" }}>
       Forget Busy Work,<br/>
       Start Next Vacation
            </Typography>
            {/* Prag */}
      <Typography component="h1" sx={{marginLeft:5,color: " rgba(176, 176, 176, 1)",fontSize:"18px" }}>
We provide what you need to enjoy your holiday with family.<br/> Time to make another memorable moments.  
      </Typography>
      {/* Start Booking*/}
        <Typography variant="h2" sx={{fontSize:"20px",marginTop:"20px",marginLeft:5,}}
        color=" rgba(21, 44, 91, 1)">
              Start Booking
        </Typography>
        {/*Pick a Date*/}
              <Typography variant="h5" 
              sx={{fontSize:"15px",marginTop:"5px",marginLeft:5,}}
              color=" rgba(21, 44, 91, 1)"
              
              >
              Pick a Date
              </Typography>
              {/* Calendar */}
              <Calendar
                {...{ selectedDateRange, setSelectedDateRange, theme }}
              />
              {/* Capacity */}
          <Typography variant="h5" 
              sx={{fontSize:"15px",marginTop:"20px",marginLeft:5,}}
              color=" rgba(21, 44, 91, 1)"
              >
              Capacity
              </Typography>
              {/* increase And Decrease Person */}
              <Box sx={{display: "flex", marginLeft:"5%",}}
              >
                {/* Button Decrease */}
    <IconButton
     onClick={handleDecrease}
    sx={{
    fontSize: { xs: "1px", sm: "1px", md: "1px" },
    color: "white",
    backgroundColor: red[600],
    padding: {xs: "8px 16px",sm: "10px 20px",md: "12px 24px"},
      width: { xs: "40px", sm: "50px" },
      height: { xs: "40px", sm: "50px", lg: "55px" },
      borderRadius: "5px",
      p: "8px",
    ml: "5px",
    mt: "16px","&:hover": {
    backgroundColor: red[700], 
      },
    }}
                >
                  <Remove />
                </IconButton>
                <TextField
                  sx={{
                    backgroundColor: theme?.palette.grey[100],
                    border: "none !important",
                    width : { xs : "100%" ,sm : "87.5%" ,md :"100%" , lg :"75%"  , xl : "90%" },
                    mt: 2,
                    justifyContent: "center",
                    alignItems: "center",
                    "& .MuiInputBase-input": {
                      textAlign: "center", // Center align the text value
                      border: "none",
                    },
                  }}
                  value={`${bookingGuestCount} person`}
                />
                {/* Button increase */}
                <IconButton
                  onClick={handleIncrease}
                  sx={{
                    color: "white",
                    backgroundColor: green[500],
                    fontSize: { xs: "1px", sm: "1px", md: "1px" },
                    padding: {
                      xs: "8px 16px",
                      sm: "10px 20px",
                      md: "12px 24px",
                    },
                    width: { xs: "40px", sm: "50px" },
                    height: { xs: "40px", sm: "50px", lg: "55px" },
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
              {/* Button Explor */}
              <Button
                onClick={() => {
                  navigate("/explore", {
                    state: {
                      range: selectedDateRange,
                      persons: bookingGuestCount,
                    },
                  });
                }}
                sx={{marginLeft:"5%" ,mt: 6, px: 10, fontSize: 20 ,bgcolor:" rgba(50, 82, 223, 1)"}}
                variant="contained"
                      >
                Explor
              </Button>
  </Grid>
  {/* img */}
  <Grid container item xs={12} sm={6} md={6} sx={{marginTop:"80px"}}>
    <img
      src={image}
      style={{ width: "80%", padding: 20 }}
    />

    
  </Grid>
</Grid>
</Grid>
  {/* 2)popular ads */}
  <Grid container sx={{paddingX:"80px"}}>
  <Typography component="h1" sx={{marginLeft:5,marginTop:1,marginBottom:1, color: " rgba(21, 44, 91, 1)",fontSize:25 }}>
  Most popular ads
</Typography>
{/* PopularAds */}
<PopularAds ADSList={ADSList}  />

  </Grid>

{/* 3)Room */}
<Box sx={{  width: "80%", mx: "auto", mb: "100px"  }}>


<Box>
  <Typography variant="h4" color=" rgba(21, 44, 91, 1)" 
  sx={{
        marginTop:"5%"
  }}>
  Rooms
  </Typography>

  <Grid container sx={{ mt: "2rem" }}>
    {ADSList.slice(1).map((ad) => {
      return (
        <Grid lg={3} xl={3} md={6} sm={6}>
          <img
            style={{
              width: "95%",
              height: "300px",
              borderRadius: "25px",
            }}
            src={ad?.room?.images[0] ? ad?.room?.images[0] : defaultImage}
            alt=""
          />
          <Typography sx={{ m: 1 }} variant="h5" color="initial">
            {ad?.room?.roomNumber}
          </Typography>
        </Grid>
      );
    })}
  </Grid>
</Box>


</Box>

    </>

};


