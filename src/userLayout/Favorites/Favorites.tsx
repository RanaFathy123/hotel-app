/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {CardContent,IconButton,Pagination, Typography,} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// import StyleFav from "./Favorites.module.css";
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import VisibilityIcon from "@mui/icons-material/Visibility";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import { axiosInstanceWithHeaders } from "../../axiosConfig/axiosInstance";


export default function Favorites() {

  const navigate = useNavigate();
  const [favRoomsList, setFavRoomsList] = useState<{ images: string[]; roomNumber: string; price: number; _id: string; }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(isLoading)
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;

  const pageCount = Math.ceil(favRoomsList.length / itemsPerPage);

  const displayedRooms = favRoomsList.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (_event:any, value:any) => {
    setPage(value);
  };


  //Function Get FavRooms
  const getAllFavRooms = async () => {
    setIsLoading(true);

    try {
      const response = await axiosInstanceWithHeaders.get(
        `/portal/favorite-rooms`,{
          params: {
            size: 6,
          }
        }

        
      );
      setFavRoomsList(response?.data?.data?.favoriteRooms[0].rooms);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  //Function remove FavRooms
  const removeFromFav = async (roomId: string) => {
    setIsLoading(true);
    try {
      const response = await axiosInstanceWithHeaders.delete(
        `/portal/favorite-rooms/${roomId}`,
        {
          data: { roomId },
        }
      );
      toast.success(response.data.message);
      getAllFavRooms();
    } catch (error) {
      toast.error("you can't remove your favorite room");

    } finally {
      setIsLoading(false);
    }
  };
 

  // UseEffect
  useEffect(() => {
    getAllFavRooms();

  }, []);

  const authContext = useContext(AuthContext);
  if (authContext) {
axiosInstanceWithHeaders
  } else {
    return null;
  }

  return <>
      <Box sx={{ mx: 5, mt: 1 }}>
        <Box 
        sx={{
            position:"relative",
            overflow:"hidden",
            textAlign:"center",
            height:"150px",
            margin:"auto"
          
        }}
        >
          <h2 className="animatText"> Your Favorites</h2>
        </Box>
        <Typography sx={{
            color:"rgba(21, 44, 91, 1)",
            fontSize:24,
            marginLeft:"5%",
            marginBottom:"0%"
          }}>Your Rooms</Typography>
   

        <Grid sx={{ mx: 1 ,mt:5 }} container spacing={2}>
          {displayedRooms.map((room, index) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
              <CardContent>
                <div className="imgoverlay">
                  <img
                    src={room.images[0]}
                    alt=""
                    style={{
                      width: "100%",
                      height: "250px",
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
                    zIndex:2,
                    marginLeft:"1.5rem"
               
                  }}
                  >
                    {room?.roomNumber}
                    <p>
                      <span style={{ color: "#f44336" }}>price: </span>$
                      {room?.price}
                    </p>
                  </Typography>

                  <div className="overlay">
                    <Grid>
                      <IconButton
                        style={{
                          padding: "1rem",
                          // backgroundColor: "#bdbdbd                        ",
                          borderRadius: "50%",
                        }}
                        onClick={() => removeFromFav(room?._id)}
                      >
                        <DoNotDisturbOnIcon
                          style={{
                            color: "white",
                          }}
                        />
                      </IconButton>
                      <IconButton
                  style={{
                        padding: "1rem",
                        // backgroundColor: "#bdbdbd                        ",
                        borderRadius: "50%",
                      }}
                      onClick={() => navigate(`/RoomDetails/${room?._id}`)}>
                      
                          <VisibilityIcon style={{ color: "white" }} />
                        </IconButton>
                    </Grid>
                  </div>
                </div>
              </CardContent>
            </Grid>
          ))}
        </Grid>

        <Pagination
          count={pageCount}
          page={page}
          onChange={handlePageChange}
          color="primary"
          size="large"
          sx={{ marginBottom:"30px",mt: 3, justifyContent: 'center',alignItems:"center",marginLeft:"50%" }}
        />
      </Box>
    </>
  
}
