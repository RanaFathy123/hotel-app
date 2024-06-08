import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import { useForm } from "react-hook-form";

import { Edit } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";

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

} from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";

import DeleteIcon from "@mui/icons-material/Delete";
import { axiosInstanceWithHeaders } from "../../../../axiosConfig/axiosInstance";
import DeleteData from "../../../SharedModule/components/DeleteData/DeleteData";
import Loading from "../../../SharedModule/components/Loading/Loading";
import { toast } from "react-toastify";
import { Facilities } from "../../../../interfaces/interface";

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
const FacilitesList = () => {
  const [roomFacilites, setRoomFacilites] = useState([]);
  const [modalState, setModalState] = useState("");
  const [open, setOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<null | string>(null);
  const [facilityID, setFacilityID] = useState("");
  const [page, setPage] = useState(0);
  const [deleteopen, setdeleteOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  let {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<Facilities>();
  //Model
  const handleAddModel = () => {
    setOpen(true);
    reset({ name: "" });
  };

  const handelUpdateModel = (item: Facilities) => {
    setFacilityID(item._id);
    setOpen(true);
    setValue("name", item.name);
  };

  async function onSubmit(data: Facilities) {
    //  add

    if (modalState !== "update") {

      try {
        let response = await axiosInstanceWithHeaders.post(
          "/admin/room-facilities",
          data
        );

        toast.success(response.data.message);
        getFacilites();
        handleClose();
      } catch (error: any) {
        toast.error(error.message);
      }
    } else {
      // update
      try {
        let response = await axiosInstanceWithHeaders.put(
          `/admin/room-facilities/${facilityID}`,
          data
        );

        getFacilites();
        toast.success(response.data.message);
        handleClose();
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  }
  async function getFacilites() {
    try {
      let response = await axiosInstanceWithHeaders.get(
        "admin/room-facilities"
      );

      const facilities = response.data.data.facilities;
      // console.log(response.data.data.facilities);
      setRoomFacilites(facilities);
    } catch (error: any) {
      console.log("error");
    }
  }
  const handleCloseDelete = () => setdeleteOpen(false);
  const handleDeleteOpen = (id: any) => {
    setdeleteOpen(true);
    setFacilityID(id);
  };
  async function DeleteFacility() {
    try {
      let response = await axiosInstanceWithHeaders.delete(
        `admin/room-facilities/${facilityID}`
      );
      handleCloseDelete();
      toast.success(response.data.message || "Facility Deleted Successfully");
      getFacilites();
    } catch (error: any) {
      toast.error(error.response.message || "erroe");
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
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    getFacilites();
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
          <DeleteData
            title="Facility"
            item="Facility"
            closing={handleCloseDelete}
          />
          <Stack mt={5}>
            <Button variant="outlined" color="error" onClick={DeleteFacility}>
              Delete
            </Button>
          </Stack>
        </Box>
      </Modal>
      {/* //Model */}

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
          {modalState === "update" ? "Updata" : "Add"} Facilites
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
          <TextField
            fullWidth
            margin="normal"
            required
            placeholder="Name"
            sx={{ marginBottom: 7, background: "#F5F6F8", marginTop: 7 }}
            {...register("name", { required: "Name Is Requird" })}
          />
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
            Facilites Table Details
          </Typography>
          <Typography variant="body1">You can check all details</Typography>
        </Grid>
        <Button
        
           sx={{ px: 3, py: 1, backgroundColor: "rgba(32, 63, 199, 1)" }}
           variant="contained"
          onClick={() => {
            handleAddModel()
          }}
        >
          Add New Facilites
        </Button>
      </Grid>

      <TableContainer component={Paper} sx={{ overflowY: "auto" }}>
        <Table
          sx={{ minWidth: 700, overflowY: "auto" }}
          aria-label="customized table"
        >
          <TableHead sx={{ background: "#F5F5F5", p: 5 }}>
            <TableRow sx={{ background: "#F5F5F5" }}>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="center">createdAt</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roomFacilites
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item: any) => (
                <StyledTableRow key={item._id}>
                  <StyledTableCell component="th" scope="row">
                    {item.name}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {" "}
                    {new Date(item.createdAt).toLocaleDateString("en-US")}
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
                      {/* <MenuItem onClick={() => handleOpenView(item)}>
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
      {roomFacilites.length === 0 && <Loading />}
      <TablePagination
        component="div"
        count={roomFacilites.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default FacilitesList;
