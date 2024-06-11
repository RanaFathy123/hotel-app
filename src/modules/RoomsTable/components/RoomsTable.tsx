import { Edit, RemoveRedEyeSharp } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Backdrop,
  Box,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Stack,
  TablePagination,
  Typography,
  colors,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import roomImage from "../../../assets/images/ForgetPass.png";
import img from "../../../assets/images/avatar.png";
import { axiosInstanceWithHeaders } from "../../../axiosConfig/axiosInstance";
import { Room } from "../../../interfaces/interface";
import DeleteData from "../../SharedModule/components/DeleteData/DeleteData";
import Loading from "../../SharedModule/components/Loading/Loading";
import { toast } from "react-toastify";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.black,
    fontWeight: "bold",
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
  textAlign: "right",
  p: 3,
});

const StyledSpan = styled("span")(() => ({
  fontWeight: "500",
  fontSize: 18,
  padding: 5,
}));

const StyledSpan2 = styled("span")(() => ({
  textDecorationLine: "line-through",
  textDecorationColor: colors.red[700],
}));

const RoomsList = () => {
  const [roomTable, setRoomTable] = useState<Room[]>([]);
  const [open, setOpen] = useState(false);
  const [roomID, setRoomID] = useState("");
  const [openView, setOpenView] = useState(false);
  const [room, setRoom] = useState<Roomtype | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<null | string>(null);
  const navigate = useNavigate();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleOpen = (id: any) => {
    setOpen(true);
    setRoomID(id);
  };

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    rowId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(rowId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
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
    handleMenuClose();
  };

  const handleCloseDelete = () => setOpen(false);
  const handleCloseView = () => setOpenView(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    console.log(event);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  async function getRoomdata() {
    try {
      let response = await axiosInstanceWithHeaders.get("admin/rooms");
      console.log(response);
      const rooms = response.data.data.rooms;
      setRoomTable(rooms);
    } catch (error: any) {
      console.error(error);
    }
  }

  async function DeleteRoom() {
    try {
      let response = await axiosInstanceWithHeaders.delete(
        `admin/rooms/${roomID}`
      );
      handleCloseDelete();
      getRoomdata();
      toast.success(response.data.message || 'Room Deleted')
      console.log(response);
    } catch (error: any) {
      console.error("error");
      toast.error(error.response.data.message || 'error')

    }
  }
  const goNewRoom = () => {
    navigate("/dashboard/room-data");
  };

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
            padding: 2,
            paddingTop: 3,
            borderRadius: 3,
            maxWidth: "90%",
            width: 600,
          }}
        >
          <IconButton
            onClick={handleCloseView}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            variant="h4"
            marginBottom={4}
            fontWeight={500}
            color="blue"
          >
            Room Details
          </Typography>
          {room?.images[0] ? (
            <img
              src={room?.images[0]}
              alt=""
              style={{ width: "100%", maxHeight: "20em", objectFit: "cover" }}
            />
          ) : (
            <img
              src={roomImage}
              alt=""
              style={{ width: "100%", height: "20em", objectFit: "cover" }}
            />
          )}
          <Stack
            spacing={2}
            marginTop={2}
            direction={isSmallScreen ? "column" : "row"}
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
      <Grid
        sx={{
          px: 5,
          mt: 2,
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
        }}
        alignItems="center"
      >
        <Grid item xs={12} md={6}>
          <Typography variant="h6" component="h2">
            Rooms Table Details
          </Typography>
          <Typography variant="body1">You can check all details</Typography>
        </Grid>
        <Button
          onClick={goNewRoom}
          sx={{ px: 3, py: 1, backgroundColor: "rgba(32, 63, 199, 1)" }}
          variant="contained"
        >
          Add New Room
        </Button>
      </Grid>
      <TableContainer component={Paper} sx={{ overflowY: "auto" }}>
        <Table
          sx={{ minWidth: 700, overflowY: "auto" }}
          aria-label="customized table"
        >
          <TableHead sx={{ background: "#F5F5F5", p: 5 }}>
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
            {roomTable
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item: any) => (
                <StyledTableRow key={item._id}>
                  <StyledTableCell component="th" scope="row">
                    {item.roomNumber}
                  </StyledTableCell>
                  <StyledTableCell>
                    {item.images[0] ? (
                      <img
                        width="50px"
                        height="50px"
                        style={{ borderRadius: "10px" }}
                        src={`${item.images[0]}`}
                        alt={""}
                      />
                    ) : (
                      <img
                        src={img}
                        width="50px"
                        height="50px"
                        alt="no image"
                      />
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="right">{item.price}</StyledTableCell>
                  <StyledTableCell align="right">
                    {item.discount}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {item.capacity}
                  </StyledTableCell>
                  <ActionTableCell align="right">
                    <IconButton
                      aria-label="more"
                      aria-controls="long-menu"
                      aria-haspopup="true"
                      onClick={(event) => handleMenuClick(event, item._id)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      keepMounted
                      open={selectedRow === item._id}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={() => handleOpenView(item)}>
                        <RemoveRedEyeSharp />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          View
                        </Typography>
                      </MenuItem>
                      <Link
                        style={{
                          display: "flex",
                          alignItems: "center",
                          textDecoration: "none",
                          color: "black",
                        }}
                        to={`/dashboard/edit-room-data/${item._id}`}
                        state={{ item, type: "edit" }}
                      >
                        <MenuItem>
                          <Edit />
                          <Typography variant="body2" sx={{ ml: 1 }}>
                            Edit
                          </Typography>
                        </MenuItem>
                      </Link>

                      <MenuItem onClick={() => handleOpen(item._id)}>
                        <DeleteIcon />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          Delete
                        </Typography>
                      </MenuItem>
                    </Menu>
                  </ActionTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {roomTable.length === 0 && <Loading />}
      <TablePagination
        component="div"
        count={roomTable.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default RoomsList;
