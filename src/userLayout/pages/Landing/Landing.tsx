/* eslint-disable no-extra-semi */
import { Box, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import defaultImage from "../../../assets/images/defaultImage.jpg";
import useFetchApi from "../../../hooks/useFetchApi";
import HeroSection from "../../components/LandingPage/HeroSection";
import PopularAds from "../../components/LandingPage/PopularAds";
import  Reviews  from "../../components/LandingPage/Reviews/Reviews";



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
export default function Landing() {
  const [adsList, setAdsList] = useState<ADS[]>([]);
  const { data, getData }: any = useFetchApi("/portal/ads?page=1&size=5");

  // hook use Effect
  useEffect(() => {
    if (data.ads) {
      const adsData = data.ads;
      setAdsList(adsData);
    }
  }, [getData]);

  // Code tsx
  return (
    <>
      {/* 1)Forget Busy Work,*/}
      <Grid sx={{ paddingX: "70px", marginBottom: "100px" }}>
        <HeroSection />
      </Grid>
      {/* 2)popular ads */}
      <Container>
        <Grid container sx={{ paddingX: "60px" }}>
          <Typography
            component="h1"
            sx={{
              marginTop: 1,
              marginBottom: 3,
              color: "rgba(21, 44, 91, 1)",
              fontSize: 25,
            }}
          >
            Most popular ads
          </Typography>
          {/* PopularAds */}
          <PopularAds adsList={adsList} />
        </Grid>
      </Container>
      {/* 3)Room */}
      <Container>
        <Box sx={{ width: "90%", mx: "auto", mb: "100px" }}>
          <Box>
            <Typography
              variant="h5"
              color=" rgba(21, 44, 91, 1)"
              sx={{
                marginTop: "5%",
              }}
            >
              Rooms
            </Typography>
            <Grid container sx={{ mt: "2rem" }}>
              {adsList.slice(1).map((ad) => {
                return (
                  <Grid xl={3} key={ad._id}>
                    <img
                      style={{
                        width: "95%",
                        height: "300px",
                        borderRadius: "25px",
                      }}
                      src={
                        ad?.room?.images[0] ? ad?.room?.images[0] : defaultImage
                      }
                      alt="roomimg"
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
        <Reviews/>
      </Container>
    </>
  );
}
