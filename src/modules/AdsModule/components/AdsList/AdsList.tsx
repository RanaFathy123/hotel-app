import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Grid,
  Menu,
  TablePagination,
  TextField,
  Typography,
  colors,
} from "@mui/material";
import { useForm } from "react-hook-form";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import { Ads, Room } from "../../../../interfaces/interface";
import MenuItem from "@mui/material/MenuItem";

import { useEffect, useState } from "react";
import styled from "styled-components";

import { Edit } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Backdrop, Box, Button, IconButton, Modal, Stack } from "@mui/material";
import { axiosInstanceWithHeaders } from "../../../../axiosConfig/axiosInstance";
import DeleteData from "../../../SharedModule/components/DeleteData/DeleteData";
import Loading from "../../../SharedModule/components/Loading/Loading";
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

// /////////////////////style Model
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    width: "30%", // Set the width to 70% of the viewport width
    maxWidth: "none", // Ensure maxWidth does not constrain the dialog
    height: "auto", // Set the height to auto
    margin: "auto", // Center the dialog horizontally
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));
const AdsList = () => {
  const [ads, setAds] = useState<Ads[]>([]);
  const [room, setRoom] = useState<Room[]>([]);
  const [modalState, setModalState] = useState("");
  const [open, setOpen] = useState(false);
  const [deleteopen, setdeleteOpen] = useState(false);
  const [adsId, setAdsId] = useState("");
  const [activeValue, setActiveValue] = useState(false);
  const [activeValueAdd, setActiveValueAdd] = useState<boolean | string>("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<null | string>(null);
  const [roomValue, setRoomValue] = useState("");

  let {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<Ads>();
  //Model
  const handleAddModel = () => {
    setModalState("add");
    // setValue("isActive", activeValue)
    setOpen(true);
    setValue("discount", 0);
    setActiveValueAdd("");
    setRoomValue("");
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseDelete = () => setdeleteOpen(false);
  const handelUpdateModel = (item: Ads) => {
    setAdsId(item._id);
    console.log(item.isActive);
    setActiveValue(item.isActive);
    setValue("isActive", item.isActive);
    setValue("discount", item.room.discount);
    setOpen(true);
  };
  async function onSubmit(data: Ads) {
    if (modalState !== "update") {
      try {
        let response = await axiosInstanceWithHeaders.post("/admin/ads", data);
        toast.success(response.data.message);
        getAds();
        handleClose();
        reset();
      } catch (error: any) {
        toast.error(error.message);
      }
    } else {
      try {
        let response = await axiosInstanceWithHeaders.put(
          `/admin/ads/${adsId}`,
          { discount: data.discount, isActive: data.isActive }
        );

        getAds();
        toast.success(response.data.message);

        handleClose();
        reset();
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  }
  async function getRoom() {
    try {
      let response = await axiosInstanceWithHeaders.get(
        "/admin/rooms?page=1&size=10"
      );

      let room = response.data.data.rooms;
      // console.log(room);

      setRoom(room);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteOpen = (id: any) => {
    setdeleteOpen(true);
    setAdsId(id);
  };
  async function DeleteAds() {
    try {
      let response = await axiosInstanceWithHeaders.delete(
        `admin/ads/${adsId}`
      );
      handleCloseDelete();
      toast.success(response.data.message || "something error");
      getAds();
    } catch (error: any) {
      toast.error(error.response.data.message || "error");
      console.log("error");
    }
  }
  async function getAds() {
    try {
      let response = await axiosInstanceWithHeaders.get("admin/ads");
      const ads = response.data.data.ads;
      console.log(response.data.data.ads);
      setAds(ads);
    } catch (error: any) {
      console.log("error");
    }
  }
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

  useEffect(() => {
    getAds();
    getRoom();
  }, []);

  return (
    <>
      <Modal
        open={deleteopen}
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
          <DeleteData title="Ads" item="Ads" closing={handleCloseDelete} />
          <Stack mt={5}>
            <Button variant="outlined" color="error" onClick={DeleteAds}>
              Delete
            </Button>
          </Stack>
        </Box>
      </Modal>
      {/* //add update Model */}

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit(onSubmit),
        }}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, fontWeight: "bold" }}
          id="customized-dialog-title"
        >
          {modalState === "update" ? "Update" : "Add"} Facilites
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {modalState !== "update" ? (
            <TextField
              id="outlined-select-currency"
              select
              label="Room"
              fullWidth
              value={roomValue}
              sx={{ background: "#F5F6F8" }}
              margin="normal"
              required
              {...register("room")}
              onChange={(e) => setRoomValue(e.target.value)}
            >
              {room.map((item: Room, index) => (
                <MenuItem key={index} value={item._id}>
                  {item.roomNumber}
                </MenuItem>
              ))}
            </TextField>
          ) : (
            ""
          )}

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Discount"
            sx={{ background: "#F5F6F8" }}
            {...register("discount")}
          />
          <TextField
            id="outlined-select-currency"
            select
            label="Active "
            fullWidth
            sx={{ background: "#F5F6F8" }}
            margin="normal"
            required
            value={modalState === "update" ? activeValue : activeValueAdd}
            {...register("isActive", {
              onChange: (e) => {
                setActiveValue(e.target.value);
                setActiveValueAdd(e.target.value);
              },
            })}
          >
            <MenuItem value={true}>Active</MenuItem>
            <MenuItem value={false}>UnActive</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          {modalState === "update" ? (
            <Button
              sx={{
                backgroundColor: "#203FC7",
                color: "#fff",
                margin: 2,
              }}
              type="submit"
              variant="contained"
            >
              Update
            </Button>
          ) : (
            <Button
              sx={{
                backgroundColor: "#203FC7",
                color: "#fff",
                margin: 2,
              }}
              type="submit"
              variant="contained"
            >
              Save
            </Button>
          )}
        </DialogActions>
      </BootstrapDialog>

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
            Ads Table Details
          </Typography>
          <Typography variant="body1">You can check all details</Typography>
        </Grid>
        <Button
          sx={{ px: 3, py: 1, backgroundColor: "rgba(32, 63, 199, 1)" }}
          variant="contained"
          onClick={() => {
            handleAddModel();
          }}
        >
          Add New Ads
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

              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Discount</StyledTableCell>
              <StyledTableCell align="right">Capacity</StyledTableCell>
              <StyledTableCell align="right">Active</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ads
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item: any) => (
                <StyledTableRow key={item._id}>
                  <StyledTableCell component="th" scope="row">
                    {item.room.roomNumber}
                  </StyledTableCell>

                  <StyledTableCell align="right">
                    {item.room.price}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {item.room.discount}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {item.room.capacity}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {item.isActive ? "Yes" : "No"}
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
                      {/* <MenuItem 
                      onClick={() => handleOpenView(item)}
                      >
                        <RemoveRedEyeSharp />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          View
                        </Typography>
                      </MenuItem> */}
                      <MenuItem
                        onClick={() => {
                          handelUpdateModel(item), setModalState("update");
                        }}
                      >
                        <Edit />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          Edit
                        </Typography>
                      </MenuItem>
                      <MenuItem onClick={() => handleDeleteOpen(item._id)}>
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
      {ads.length === 0 && <Loading />}
      <TablePagination
        component="div"
        count={ads.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default AdsList;
