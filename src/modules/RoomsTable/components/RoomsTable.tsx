import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { axiosInstanceWithHeaders } from "../../../axiosConfig/axiosInstance";
import img from "../../../assets/images/avatar.png";
import { Room } from "../../../interfaces/Auth";
import {
  Backdrop,
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  Typography,
  colors,
  createTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Height, RemoveRedEyeSharp, Upload, WidthFull } from "@mui/icons-material";
import DeleteData from "../../SharedModule/components/DeleteData/DeleteData";
import roomImage from "../../../assets/images/ForgetPass.jpg";
import CloseIcon from "@mui/icons-material/Close";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ActionTableCell = styled(TableCell)({
  textAlign: "left",
  marginLeft: 5,
});

const StyledIconButton = styled(IconButton)({
  color: "#4CAF50",
});

const DeleteIconButton = styled(IconButton)({
  color: "#FF0000",
});

const StyledSpan = styled("span")(({ theme }) => ({
  fontWeight: "500",
  fontSize: 18,
  padding: 5,
}));

const StyledSpan2 = styled("span")(({ theme }) => ({
  textDecorationLine: "line-through",
  textDecorationColor: colors.red[700],
}));

interface SnackbarProps {
  handleClick: () => void;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setMessageType: React.Dispatch<React.SetStateAction<string>>;
}

const RoomsList: React.FC<SnackbarProps> = ({
  handleClick,
  setMessage,
  setMessageType,
}) => {
  const [roomTable, setRoomTable] = useState<Room[]>([]);
  const [open, setOpen] = useState(false);
  const [roomID, setRoomID] = useState("");
  const [openView, setOpenView] = useState(false);
  const [room, setRoom] = useState<Roomtype | null>(null);

  const handleOpen = (id: any) => {
    setOpen(true);
    setRoomID(id);
  };
  type Roomtype = {
    price: number;
    discount: number;
    images: string[];
    roomNumber: number;
  };
  const handleOpenView = (Room: Roomtype) => {
    setOpenView(true);
    setRoom(Room);
  };

  const handleCloseDelete = () => setOpen(false);
  const handleCloseView = () => setOpenView(false);

  async function getRoomdata() {
    try {
      let response = await axiosInstanceWithHeaders.get(
        "admin/rooms"
      );
      console.log(response);

      const rooms = response.data.data.rooms;
      setRoomTable(rooms);
    } catch (error: any) {
      
    }
  }

  async function DeleteRoom() {
    try {
      let response = await axiosInstanceWithHeaders.delete(
        `admin/rooms/${roomID}`
      );
      handleCloseDelete();
      handleClick()
      setMessage('the Room has been Deleted successfully')
      setMessageType('success')
      getRoomdata()
      console.log(response);
      
      getRoomdata();
    } catch (error: any) {
      handleClick()
      setMessage(`there's an error`)
      setMessageType('error')

      console.log("error");
    }
  }

  useEffect(() => {
    getRoomdata();
  }, []);

  return (
    <>
      <Modal
        open={open}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 600,
          },
        }}
      >
        <Box
          sx={{
            margin: "auto",
            textAlign: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 3,
            p: 6,
            maxWidth: 500,
          }}
        >
          <DeleteData title="Room" item="Room" closing={handleCloseDelete} />
          <Stack mt={5}>
            <Button variant="outlined" color="error" onClick={DeleteRoom}>
              Delete
            </Button>
          </Stack>
        </Box>
      </Modal>

      {/* Modal for view */}
      <Modal
        open={openView}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 600,
          },
        }}
      >
        <Box
          sx={{
            margin: "auto",
            textAlign: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 5,
            padding: 4,
            paddingTop: 3,
            // maxWidth: 600,
            borderRadius: 3,
          }}
        >
          <Button
            onClick={handleCloseView}
            sx={{
              padding: 0,
              minWidth: 0,
              "&:focus": {
                backgroundColor: "transparent",
              },
            }}
          >
            <CloseIcon
              fontSize="medium"
              sx={{
                position: "absolute",
                right: "-14.75em",
                top: "em",
                borderRadius: "50%",
                color: colors.red[900],
              }}
            />
          </Button>
          <Typography
            variant="h4"
            marginBottom={4}
            fontWeight={500}
            color={colors.lightBlue[900]}
          >
            Room Details
          </Typography>
          {room?.images[0] ? (
            <img
              src={room?.images[0]}
              alt=""
              style={{ width: "70em", maxHeight: "20em" }}
            />
          ) : (
            <img
              src={roomImage}
              alt=""
              style={{ width: "70em", height: "20em" }}
            />
          )}
          <Stack
            spacing={2}
            marginTop={2}
            direction="row"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography sx={{ mt: 4 }} variant="h6" fontWeight="200">
              Room Number:
              <StyledSpan>{room?.roomNumber}</StyledSpan>
            </Typography>
            <Typography variant="h6">
              Price: $
              {room?.discount ? (
                <>
                  <StyledSpan2>{room?.price}</StyledSpan2> = $
                  {room?.price - room?.discount}
                </>
              ) : (
                room?.price
              )}
            </Typography>
          </Stack>
        </Box>
      </Modal>
      <Button
        sx={{
          backgroundColor: "#203FC7",
          color: "#fff",
          margin: 2,
          display: "flex",
          justifyContent: "end",
          alignItems: "flex-end",
        }}
      >
        Add New Room
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow sx={{ background: "#F5F5F5" }}>
              <StyledTableCell>Room Number</StyledTableCell>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Discount</StyledTableCell>
              <StyledTableCell align="right">Capacity</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roomTable?.map((item: any) => (
              <StyledTableRow key={item._id}>
                <StyledTableCell component="th" scope="row">
                  {item.roomNumber}
                </StyledTableCell>
                <StyledTableCell>
                  {item.images ? (
                    <img src={item.images[0]} alt={""} width={100} style={{height:'75px'}} />
                  ) : (
                    <img src={img} alt="no image" />
                  )}
                </StyledTableCell>
                <StyledTableCell align="right">{item.price}</StyledTableCell>
                <StyledTableCell align="right">{item.discount}</StyledTableCell>
                <StyledTableCell align="right">{item.capacity}</StyledTableCell>
                <ActionTableCell align="right" sx={{ display: "flex" }}>
                  <StyledIconButton>
                    <Upload />
                  </StyledIconButton>
                  <DeleteIconButton onClick={() => handleOpen(item._id)}>
                    <DeleteIcon />
                  </DeleteIconButton>
                  <StyledIconButton onClick={() => handleOpenView(item)}>
                    <RemoveRedEyeSharp />
                  </StyledIconButton>
                </ActionTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default RoomsList;
