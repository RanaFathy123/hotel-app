/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Button,
  CardContent,
  CircularProgress,
  IconButton,
  Pagination,
  Stack,
} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs"; 
import { axiosInstance, axiosInstanceWithHeaders } from "../../axiosConfig/axiosInstance";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import imgLogin from "../../assets/images/login PopUp.jpg";

// Style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

// interface
interface IRoom {
  roomNumber:string
  _id:string
  price:string
  images:string
}
interface State {
  range?: any;
  // range?: [Date, Date];
}


// Function
export default function ExplorePage() {

  const navigate = useNavigate();
  const [roomsList, setRoomsList] = useState<IRoom[]>([]);
  const [page, setPage] = React.useState(1);
  const handleChange = (_e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const location = useLocation();
  const state = (location.state as State) || {};
  const roomDateStart = state.range?.[0]?.$d;
  const roomDateEnd = state.range?.[1].$d;
  const startDate = dayjs(roomDateStart).format("YYYY-MM-DD");
  const endDate = dayjs(roomDateEnd).format("YYYY-MM-DD");
  //modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  // AuthContext
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null;
  }
  const {  loginData,  } = authContext;

// goToLogin
  const goToLogin = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

// Function getAllRooms
  const getAllRooms = async (page: number,startDate?: string,endDate?: string) => {
    if (!location.state) {
      try {
        const response = await axiosInstance.get(
          `/portal/rooms/available`,
          {
            params: {
              size: 12,
              page: page,
            },
          }
        );
      
        setRoomsList(response.data.data.rooms);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      const response = await axiosInstance.get(`/portal/rooms/available`, {
        params: {
          size: 12,
          page: page,
          startDate: startDate,
          endDate: endDate,
        },
      });
      
      setRoomsList(response.data.data.rooms);
    } catch (error) {
      console.log(error);
    }
  };

  // Function addfav
  const addToFav = async (id: string) => {
    if (!loginData) {
      handleOpen();
    } else {
      try {
        const response = await axiosInstanceWithHeaders.post(
          `/portal/favorite-rooms`,
          { roomId: id },
         
        );
        toast.success(" Add To Favorites Successfully");
        console.log(response)
        navigate("/favorites")
      } catch (error:any) {
          toast.error(error.response.data.message);
      }
    }
  };

// UseEffect
  if (location?.state) {
    useEffect(() => {
      getAllRooms(page, startDate, endDate);
    }, [page, startDate, endDate]);
  } else {
    useEffect(() => {
      getAllRooms(page);
    }, [page]);
  }


  return <>
              {/* Modal for user Not Login (Button Fav) */}
                <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2"
            sx={{color:"rgba(50, 82, 223, 1)",marginLeft:"20%"}}
            >
              Hey you need to login first !
            </Typography>
            <img
              src={imgLogin}
              style={{ width: "300px", height: "200px",marginLeft:"10%" }}
              alt=""
            />
            <Button
            onClick={goToLogin}
            sx={{
            p: 1,
            width: "50%",
            mt: 4,
            marginLeft:"25%",
            alignItems: "center",
            bgcolor: " rgba(50, 82, 223, 1)",
            color: "rgba(255, 255, 255, 1)",
            "&:hover":{
              bgcolor: " rgba(50, 82, 223, 0.6)",
              color: "rgba(255, 255, 255, 0.8)",  
            }
            }}
            
            >
          Login Now
            </Button>
         </Box>
        </Modal>

        {/*Code  */}
      {roomsList?.length > 0 ? (
        <Box  sx={{ mx: 5, mt: 1 }}>
          <Box 
          sx={{
            position:"relative",
            overflow:"hidden",
            textAlign:"center",
            height:"150px",
            margin:"auto"
          }}
          >
            <h2 className="animatText">Explore ALL Rooms </h2>

          </Box>

          <Typography sx={{
            color:"rgba(21, 44, 91, 1)",
            fontSize:24,
            marginLeft:"5%",
            marginBottom:"0%"
          }}>All Rooms</Typography>

          <Grid sx={{ mx: 1, mt: 0 }} container spacing={2}>

            {roomsList?.map((room , index) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                <CardContent>
                  <div className="imgoverlay">
                    <img
                      src={room.images[0]}
                      alt=""
                      style={{
                        width: "100%",
                        height: "300px",
                        borderRadius: "30px",
                        overflow: "hidden",
                      }}
                    />
                    <Typography
                    sx={{
                      padding:"5px",
                      color:"white",
                      position:"absolute",
                      bottom:"15px",
                      zIndex:2
                    }}
                    >
                    {room?.roomNumber}
                    </Typography>
                    <Typography 
                    sx={{
                    padding:"5px",
                    bgcolor:"rgb(255,20,147)",
                    color:"white",
                    position:"absolute",
                    right:0,
                    top:0,
                    borderBottomLeftRadius:"15px",
                    borderTopRightRadius:"15px",
                    zIndex:2
                    }}
                    >
                      ${room?.price} per night
                    </Typography>
                    <Box className="overlay">
                      <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                      >
                        <IconButton onClick={() => addToFav(room._id)}>
                          <FavoriteIcon style={{ color: "white" }} />
                        </IconButton>

                        <IconButton 
                         onClick={() => navigate(`/RoomDetails/${room?._id}`)}>
                          <VisibilityIcon style={{ color: "white" }} />
                        </IconButton>
                      </Grid>
                    </Box>
                  </div>
                </CardContent>
              </Grid>
            ))}

          </Grid>
        </Box>
      ) : (
        <Box className="imageWrapperr" sx={{ mx: 5, mt: 1 }}>
          <CircularProgress sx={{ mx: "50%" }} size={54} color="inherit" />
        </Box>
      )}
      <Stack
        sx={{ margin: "20px", display: "flex", justifyContent: "center" }}
        spacing={2}
      >
        <Pagination
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "inherit",
          }}
          count={50}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
          page={page}
        />
      </Stack>

      <div>
    

      </div>
    </>

}
