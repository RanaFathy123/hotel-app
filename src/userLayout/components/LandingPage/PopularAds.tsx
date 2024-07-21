/* eslint-disable @typescript-eslint/no-explicit-any */
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import defaultImage from "../../../assets/images/defaultImage.jpg";
import imgLogin from "../../../assets/images/login PopUp.jpg";
import { axiosInstanceWithHeaders } from "../../../axiosConfig/axiosInstance";
import { AuthContext } from "../../../context/AuthContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// interface
interface MostPopularAdsProps {
  adsList: ADS[];
}

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

// Function
const PopularAds: React.FC<MostPopularAdsProps> = ({ adsList }:any) => {
  const [open, setOpen] = useState(false);

  const [searchPramas, _setSearchParams] = useSearchParams();
  const startDate = searchPramas.get("startDate");
  const endDate = searchPramas.get("endDate");


  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  // AuthContext
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null;
  }
  const { loginData } = authContext;
  
  const navigate = useNavigate();
  // Modal for user Not Login
  const goToLogin = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  //Function  Add To favorite
  const addToFav = async (id: string) => {
    if (loginData == null) {
      handleOpen();
    } else {
      try {
        const response = await axiosInstanceWithHeaders.post(
          `/portal/favorite-rooms`,
          { roomId: id }
        );
        toast.success(" Add To Favorites Successfully");
        navigate("/favorites");
        console.log(response);
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <>
      {/* Modal for user Not Login (Button Fav) */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ color: "rgba(50, 82, 223, 1)", marginLeft: "20%" }}
          >
            Hey you need to login first !
          </Typography>
          <img
            src={imgLogin}
            style={{ width: "300px", height: "200px", marginLeft: "10%" }}
            alt=""
          />
          <Button
            onClick={goToLogin}
            sx={{
              p: 1,
              width: "50%",
              mt: 4,
              marginLeft: "25%",
              alignItems: "center",
              bgcolor: " rgba(50, 82, 223, 1)",
              color: "rgba(255, 255, 255, 1)",
              "&:hover": {
                bgcolor: " rgba(50, 82, 223, 0.6)",
                color: "rgba(255, 255, 255, 0.8)",
              },
            }}
          >
            Login Now
          </Button>
        </Box>
      </Modal>

      <Box className="grid">
        <Box
          className="main  card"
          sx={{ height: "100%", borderRadius: "25px", position: "relative" }}
        >
          {/* img h100 */}
          <img
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "25px",
            }}
            src={
              adsList[0]?.room?.images[0]
                ? adsList[0]?.room?.images[0]
                : defaultImage
            }
            alt="RoomPicture"
          />
          {/* Box RoomPrice */}
          <Box
            sx={{
              position: "absolute",
              top: "0%",
              right: "1px",
              bgcolor: " rgba(255, 73, 139, 1);",
              color: "white",
              paddingX: "50px",
              paddingY: "5px",
              borderBottomLeftRadius: "25px",
              borderTopRightRadius: "25px",
            }}
            color="initial"
          >
            {/* RoomPrice */}
            <Typography
              sx={{
                fontSize: 15,
                py: {
                  md: "10px",
                },
              }}
            >
              {adsList[0]?.room.price}$ per Night
            </Typography>
          </Box>
          <Typography
            sx={{
              position: "absolute",
              top: "90%",
              left: "10%",
              color: "white",
            }}
            variant="h6"
            color="initial"
          >
            {adsList[0]?.room?.roomNumber}
          </Typography>
          <Box
            className="layer"
            sx={{
              height: "100%",
              width: "100%",
              position: "absolute",
              top: "100%",
              left: "0",
              display: "none",
              borderRadius: "25px",
            }}
          >
            <Grid container justifyContent="center" alignItems="center">
              {/* FavoriteIcon popular ads */}
              <IconButton onClick={() => addToFav(adsList[0]?.room._id)}>
                <FavoriteIcon style={{ color: "white" }} />
              </IconButton>
              {/*VisibilityIcon popular ads*/}
              <IconButton
                onClick={() =>
                  navigate(`/RoomDetails/${adsList[0]?.room._id}`, {
                    state: { startDate, endDate },
                  })
                }
              >
                <VisibilityIcon style={{ color: "white" }} />
              </IconButton>
              {/* </Link> */}
            </Grid>
          </Box>
        </Box>
        {adsList.slice(1).map((ad:any, index:any) => (
          <Box
            key={index}
            className="card"
            sx={{
              height: "100%",
              width: "100%",
              borderRadius: "25px",
              position: "relative",
            }}
          >
            {/* img Four */}
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "25px",
              }}
              src={ad?.room?.images[0] ? ad?.room?.images[0] : defaultImage}
              alt={`RoomPicture ${index}`}
            />
            {/* Box Room Price */}
            <Box
              sx={{
                position: "absolute",
                top: "0%",
                right: "1px",
                bgcolor: " rgba(255, 73, 139, 1);",
                color: "white",
                paddingX: "40px",
                paddingY: "5px",
                borderBottomLeftRadius: "25px",
                borderTopRightRadius: "25px",
              }}
              color="initial"
            >
              {/* Room Price */}
              <Typography
                sx={{
                  fontSize: 13,
                  py: {
                    md: "10px",
                  },
                }}
              >
                {ad.room.price}$ per Night
              </Typography>
            </Box>
            <Typography
              sx={{
                position: "absolute",
                top: "85%",
                left: "10%",
                color: "white",
              }}
              variant="h6"
              color="initial"
            >
              {ad?.room?.roomNumber}
            </Typography>
            <Box
              className="layer"
              sx={{
                height: "100%",
                width: "100%",
                position: "absolute",
                top: "100%",
                left: "0",
                display: "none",
                borderRadius: "25px",
              }}
            >
              <Grid container justifyContent="center" alignItems="center">
                {/* FavoriteIcon */}
                <IconButton onClick={() => addToFav(ad.room._id)}>
                  <FavoriteIcon style={{ color: "white" }} />
                </IconButton>
                {/* VisibilityIcon */}
                <IconButton
                  onClick={() => navigate(`/RoomDetails/${ad.room._id}`)}
                >
                  <VisibilityIcon style={{ color: "white" }} />
                </IconButton>
                {/* </Link> */}
              </Grid>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default PopularAds;
