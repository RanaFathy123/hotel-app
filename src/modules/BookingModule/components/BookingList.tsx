import { RemoveRedEyeSharp } from "@mui/icons-material";
import {
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    colors,
    tableCellClasses
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { axiosInstanceWithHeaders } from "../../../axiosConfig/axiosInstance";
import Loading from "../../SharedModule/components/Loading/Loading";

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

const BookingList = () => {
  const [bookingList, setBookingList] = useState([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<null | string>(null);
  const [booking, setBooking] = useState<Booking | null>(null);

  const [open, setOpen] = React.useState(false);

  type Booking = {
    endDate: string;
    room: { _id: string; roomNumber: string };
    startDate: string;
    status: string;
    totalPrice: number;
    updatedAt: string;
    user: { _id: string; userName: string };
  };
  const handleOpen = (booking: Booking) => {
    setOpen(true);
    setBooking(booking);
  };
  const handleClose = () => setOpen(false);

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

  async function getAllBooking() {
    try {
      const response = await axiosInstanceWithHeaders("admin/booking");
      const Booking = response?.data?.data?.booking;
      console.log(Booking);
      setBookingList(Booking);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllBooking();
  }, []);
  return (
    <>
      {/* showModal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            width: 500,
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 5,
            p: 5,
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            textAlign="center"
            color={colors.blue[900]}
            marginBottom={5}
          >
            {booking?.room?.roomNumber}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              mt: 2,
            }}
          >
            <Typography id="modal-modal-description">
              {`Start Date: ${new Date(
                booking?.startDate || ""
              ).toLocaleDateString()}`}
            </Typography>
            <Typography id="modal-modal-description">
              {`End Date: ${new Date(
                booking?.endDate || ""
              ).toLocaleDateString()}`}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Typography id="modal-modal-description">
              {"Status: "}
              {booking?.status === "pending" ? (
                <Typography component="span" color={colors.red[500]}>
                  {booking?.status}
                </Typography>
              ) : (
                <Typography component="span" color={colors.green[500]}>
                  {booking?.status}
                </Typography>
              )}
            </Typography>
            <Typography>Price : {booking?.totalPrice}</Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography>Booked by : {booking?.user?.userName}</Typography>
          </Box>

          <Box
            sx={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}
          >
            <Button variant="outlined" color="error" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
      <TableContainer component={Paper} sx={{ overflowY: "auto" }}>
        <Table
          sx={{ minWidth: 700, overflowY: "auto", textAlign: "center" }}
          aria-label="customized table"
        >
          <TableHead sx={{ background: "#F5F5F5", p: 5 }}>
            <TableRow sx={{ background: "#F5F5F5" }}>
              <StyledTableCell>Room Number</StyledTableCell>
              <StyledTableCell>start Date</StyledTableCell>
              <StyledTableCell>End Date</StyledTableCell>
              <StyledTableCell>status</StyledTableCell>
              <StyledTableCell>Total price</StyledTableCell>
              <StyledTableCell>User</StyledTableCell>
              <StyledTableCell >Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookingList?.map((Book: any) => (
              <StyledTableRow key={Book._id}>
                <StyledTableCell component="th" scope="row">
                  {Book?.room?.roomNumber}
                </StyledTableCell>
                <StyledTableCell>
                  {new Date(Book.startDate).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell>
                  {new Date(Book.endDate).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell>{Book.status}</StyledTableCell>
                <StyledTableCell>{Book.totalPrice}</StyledTableCell>
                <StyledTableCell>{Book.user?.userName}</StyledTableCell>
                <ActionTableCell>
                  <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={(event) => handleMenuClick(event, Book._id)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={selectedRow === Book._id}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={() => handleOpen(Book)}>
                      <RemoveRedEyeSharp />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        View
                      </Typography>
                    </MenuItem>
                  </Menu>
                </ActionTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {bookingList.length === 0 && <Loading />}
    </>
  );
};

export default BookingList;
