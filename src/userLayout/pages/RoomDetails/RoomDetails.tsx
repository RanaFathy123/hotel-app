/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import AcUnitIcon from "@mui/icons-material/AcUnit";
import BathtubIcon from "@mui/icons-material/Bathtub";
import BedIcon from "@mui/icons-material/Bed";
import BluetoothIcon from "@mui/icons-material/Bluetooth";
import CommentIcon from "@mui/icons-material/Comment";
import FlatwareIcon from "@mui/icons-material/Flatware";
import NetworkWifiIcon from "@mui/icons-material/NetworkWifi";
import StarsIcon from "@mui/icons-material/Stars";
import TvIcon from "@mui/icons-material/Tv";
import WeekendIcon from "@mui/icons-material/Weekend";
import { Box, Button, TextField, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/system";
import dayjs, { Dayjs } from "dayjs";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import imgRooms from "../../../assets/images/joshua-michaels-5SteU6iJIIE-unsplash.jpg";
import { axiosInstanceWithHeaders } from "../../../axiosConfig/axiosInstance";
import { AuthContext } from "../../../context/AuthContext";
import Breadcrumb from "../../components/BreadCrumbs/BreadCrumb";
import Calendar from "../../components/Calender/calendar";
import styleRoomDetails from "./RoomDetails.module.css";
import { useForm } from "react-hook-form";

const RoomDetails = () => {
  const [bookingId, setBookingId] = useState("");
  const [roomDetails, setRoomDetails] = useState<any>({});
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);

  const startDate = localStorage.getItem("startDate");
  const endDate = localStorage.getItem("endDate");
  const today = dayjs(startDate);
  const nextDate = dayjs(endDate);

  const [selectedDateRange, setSelectedDateRange] = useState<[Dayjs, Dayjs]>([
    today,
    nextDate,
  ]);

  const roomDateStart = selectedDateRange[0];
  const roomDateEnd = selectedDateRange[1];
  const { loginData } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  // Function getRoomDetails
  const getRoomDetails = async () => {
    try {
      const response = await axiosInstanceWithHeaders.get(
        `/portal/rooms/${id}`
      );
      setRoomDetails(response.data.data.room);
      console.log(response);

      setPrice(response?.data.data.room?.price);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching room details:", error);
      setLoading(false);
    }
  };
  // data is ready to be sent to the backend for Containio booking

  // Function  createBooking
  const createBooking = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("hey you need to login first ");
      throw new Error("User is not authenticated");
    }
    try {
      const requestBody = {
        startDate: startDate,
        endDate: endDate,
        room: id,
        totalPrice: price * dayjs(roomDateEnd).diff(roomDateStart, "day"),
      };

      const response = await axiosInstanceWithHeaders.post(
        `/portal/booking`,
        requestBody
      );
      const bookingId = response.data.data.booking._id;
      console.log(bookingId);
      setBookingId(bookingId);
      toast.success("Booking created successfully");
      navigate("/checkout", { state: { bookingId } });
    } catch (error) {
      console.log(error);
      toast.error("Booking creation failed ");
    }
  };
  const onSubmitMessage = async (data: any) => {
    try {
      const response = await axiosInstanceWithHeaders.post(
        "/portal/room-reviews",
        {
          review: data.review,
          roomId: id,
          rating: 3,
        }
      );
      toast.success(response.data.message);
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };
  const onSubmitComment = async (data: any) => {
    try {
      const response = await axiosInstanceWithHeaders.post(
        "/portal/room-comments",
        {
          roomId: id,
          comment: data.comment,
        }
      );
      toast.success(response.data.message);
    } catch (err: any) {
      toast.error(err.respone.data.message);
    }
  };
  useEffect(() => {
    if (id) {
      getRoomDetails();
    }
  }, [id]);

  return (
    <Box>
      <Breadcrumb />
      <Box
        sx={{
          marginLeft: "45%",
          marginTop: "5%",
          marginBottom: "1%",
        }}
      >
        <Typography
          sx={{
            color: " rgba(21, 44, 91, 1)",
            fontSize: 34,
            fontWeight: "bold",
          }}
        >
          Village Angga
        </Typography>
        <Typography
          sx={{
            color: "rgba(176, 176, 176, 1)",
            fontSize: 18,
            marginLeft: "5%",
          }}
        >
          Bogor, Indonesia
        </Typography>
      </Box>

      {loading ? (
        <Typography variant="body1" component="div">
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        </Typography>
      ) : (
        <>
          <Container maxWidth="xl">
            <Grid container spacing={2}>
              <Grid item xs={12} md={8} lg={8}>
                <img
                  src={
                    roomDetails.images && roomDetails.images.length > 0
                      ? roomDetails.images[0]
                      : { imgRooms }
                  }
                  alt="Large Image"
                  style={{
                    width: "100%",
                    height: "500px",
                    objectFit: "cover",
                    borderRadius: "2em",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                {roomDetails.images && roomDetails.images.length > 1 ? (
                  <>
                    {roomDetails.images
                      .slice(1, 3)
                      .map((img: any, index: any) => (
                        <img
                          key={index}
                          src={img}
                          alt={`Small Image ${index + 1}`}
                          style={{
                            width: "100%",
                            height: "250px",
                            objectFit: "cover",
                            borderRadius: "2em",
                          }}
                        />
                      ))}
                  </>
                ) : (
                  <>
                    <img
                      src={imgRooms}
                      alt="No additional images available"
                      style={{
                        width: "100%",
                        height: "250px",
                        objectFit: "cover",
                        borderRadius: "2em",
                      }}
                    />
                    <img
                      src={imgRooms}
                      alt="No additional images available"
                      style={{
                        width: "100%",
                        height: "250px",
                        objectFit: "cover",
                        borderRadius: "2em",
                      }}
                    />
                  </>
                )}
              </Grid>
            </Grid>
          </Container>

          <Container maxWidth="xl">
            <Grid
              container
              spacing={2}
              style={{ marginTop: "3rem", marginBottom: "5rem" }}
            >
              <Grid item xs={12} md={12} lg={8}>
                <Typography
                  component="div"
                  style={{
                    color: "#B0B0B0",
                    fontSize: "16px",
                    fontWeight: "300",
                  }}
                  variant="body2"
                >
                  Minimal techno is a minimalist subgenre of techno music. It is
                  characterized by a stripped-down aesthetic that exploits the
                  use of repetition and understated development. Minimal techno
                  is thought to have been originally developed in the early
                  1990s by Detroit-based producers Robert Hood and Daniel Bell.
                </Typography>

                <Typography
                  component="div"
                  style={{
                    color: "#B0B0B0",
                    fontSize: "16px",
                    fontWeight: "300",
                  }}
                  variant="body2"
                >
                  Such trends saw the demise of the soul-infused techno that
                  typified the original Detroit sound. Robert Hood has noted
                  that he and Daniel Bell both realized something was missing
                  from techno in the post-rave era.
                </Typography>

                <Typography
                  component="div"
                  style={{
                    color: "#B0B0B0",
                    fontSize: "16px",
                    fontWeight: "300",
                  }}
                  variant="body2"
                >
                  Design is a plan or specification for the construction of an
                  object or system or for the implementation of an activity or
                  process, or the result of that plan or specification in the
                  form of a prototype, product or process. The national agency
                  for design: enabling Singapore to use design for economic
                  growth and to make lives better.
                </Typography>

                {/* Icon */}

                <Box
                  sx={{
                    marginTop: "2rem",
                    display: "flex",
                    justifyContent: "space-between",
                    paddingRight: 2,
                    flexWrap: "wrap",
                  }}
                >
                  <Box>
                    <BedIcon
                      style={{
                        color: "#152C5B",
                        fontSize: "38px",
                        height: "38px",
                      }}
                    />
                    <Box style={{ color: "#B0B0B0" }}> Bedroom</Box>
                  </Box>
                  <Box>
                    <WeekendIcon
                      style={{
                        color: "#152C5B",
                        fontSize: "38px",
                        height: "38px",
                      }}
                    />
                    <Box style={{ color: "#B0B0B0" }}> Living room</Box>
                  </Box>

                  <Box>
                    <BathtubIcon
                      style={{
                        color: "#152C5B",
                        fontSize: "38px",
                        height: "38px",
                      }}
                    />
                    <Box style={{ color: "#B0B0B0" }}> Bathroom</Box>
                  </Box>
                  <Box>
                    <FlatwareIcon
                      style={{
                        color: "#152C5B",
                        fontSize: "38px",
                        height: "38px",
                      }}
                    />
                    <Box style={{ color: "#B0B0B0" }}> Dining room</Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    marginTop: "2rem",
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    paddingRight: 2,
                  }}
                >
                  <Box>
                    <NetworkWifiIcon
                      style={{
                        color: "#152C5B",
                        fontSize: "38px",
                        height: "38px",
                      }}
                    />
                    <Box style={{ color: "#B0B0B0" }}> Mbp/s</Box>
                  </Box>
                  <Box>
                    <AcUnitIcon
                      style={{
                        color: "#152C5B",
                        fontSize: "38px",
                        height: "38px",
                      }}
                    />
                    <Box style={{ color: "#B0B0B0" }}>Unit Ready</Box>
                  </Box>

                  <Box>
                    <BluetoothIcon
                      style={{
                        color: "#152C5B",
                        fontSize: "38px",
                        height: "38px",
                      }}
                    />
                    <Box style={{ color: "#B0B0B0" }}> Bluetooth</Box>
                  </Box>

                  <Box>
                    <TvIcon
                      style={{
                        color: "#152C5B",
                        fontSize: "38px",
                      }}
                    />
                    <Box style={{ color: "#B0B0B0" }}> television</Box>
                  </Box>
                </Box>
              </Grid>

              {/* border */}
              <Grid item xs={12} md={12} lg={4}>
                <Box
                  sx={{
                    border: "1px solid #E5E5E5",
                    padding: "2rem",
                    paddingBlock: 7,
                    borderRadius: "1rem",
                  }}
                >
                  <Typography
                    variant="h5"
                    color="secondary"
                    sx={{ color: "#1a237e", marginTop: "2" }}
                  >
                    Start Booking
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: "#1ABC9C",
                      fontSize: "36px",
                      fontWeight: "300",
                      marginTop: "1rem",
                    }}
                  >
                    {price}
                    <span style={{ color: "#B0B0B0", marginLeft: "2rem" }}>
                      per night
                    </span>
                  </Typography>
                  <Box component="div" sx={{ width: "100%" }}>
                    <Calendar
                      {...{ selectedDateRange, setSelectedDateRange }}
                    />
                  </Box>
                  {/* btn */}

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "3rem",
                    }}
                  >
                    <Link to="/checkout" state={bookingId}>
                      <Button
                        onClick={() => {
                          createBooking();
                        }}
                        variant="contained"
                      >
                        Continue Book
                      </Button>
                    </Link>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>

          {loginData && (
            <Container maxWidth="xl" sx={{ marginTop: "2rem" }}>
              <Box
                sx={{
                  border: "1px solid #E5E5E5",
                  padding: "5rem",
                  borderRadius: "1rem",
                }}
              >
                <Grid
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  container
                  spacing={2}
                >
                  <Grid item xs={12} md={6} lg={6}>
                    <Typography
                      variant="h5"
                      color="secondary"
                      sx={{ color: "#1a237e", marginBottom: "2rem" }}
                    >
                      <StarsIcon
                        sx={{ marginRight: "1rem", color: "#DFCB1D" }}
                      />
                      Rate
                    </Typography>

                    <Typography
                      component="div"
                      variant="h5"
                      color="secondary"
                      sx={{ color: "#1a237e", marginBottom: "1rem" }}
                    >
                      Message
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmitMessage)}>
                      <TextField
                        fullWidth
                        id="outlined-multiline-static"
                        multiline
                        rows={5}
                        {...register("review")}
                      />
                      <Button
                        sx={{ marginTop: "2rem" }}
                        type="submit"
                        variant="contained"
                      >
                        Rate
                      </Button>
                    </form>
                  </Grid>
                  <Grid
                    className={`${styleRoomDetails.spaceInputs}`}
                    item
                    xs={12}
                    md={6}
                    lg={6}
                  >
                    <Typography
                      variant="h5"
                      color="secondary"
                      sx={{ color: "#1a237e", marginBottom: "2rem" }}
                    >
                      <CommentIcon
                        sx={{ marginRight: "0.5rem", color: "#c62828" }}
                      />
                      Add Your Comment
                    </Typography>

                    <Typography
                      variant="h5"
                      color="secondary"
                      sx={{ color: "#1a237e", marginBottom: "1rem" }}
                    >
                      Comment
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmitComment)}>
                      <TextField
                        fullWidth
                        id="outlined-multiline-static"
                        multiline
                        rows={5}
                        {...register("comment")}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginTop: "2rem",
                        }}
                      >
                        <Button variant="contained" type="submit">
                          Send
                        </Button>
                      </Box>
                    </form>
                  </Grid>
                </Grid>
              </Box>
            </Container>
          )}
        </>
      )}
    </Box>
  );
};

export default RoomDetails;
