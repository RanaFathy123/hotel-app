import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import styled from "styled-components";
// import img from '../../../../assets/images/avatar.png'
// import { Room } from '../../../interfaces/Auth';
import { RemoveRedEyeSharp, Upload } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Backdrop, Box, Button, IconButton, Modal, Stack } from "@mui/material";
import { axiosInstanceWithHeaders } from "../../../../axiosConfig/axiosInstance";
import DeleteData from "../../../SharedModule/components/DeleteData/DeleteData";
import Loading from "../../../SharedModule/components/Loading/Loading";
import { toast } from "react-toastify";

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
  // hide last border
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

const AdsList = () => {
  const [ads, setAds] = useState([]);
  const [open, setOpen] = useState(false);
  const [adsID, setAdsID] = useState("");
  const handleClose = () => setOpen(false);

  const handleOpen = (id: any) => {
    setOpen(true);
    setAdsID(id);
  };

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

  async function DeleteAds() {
    try {
      let response = await axiosInstanceWithHeaders.delete(
        `admin/ads/${adsID}`
      );
      handleClose();
      toast.success(response.data.message || "something error");
      getAds();
    } catch (error: any) {
      toast.error(error.response.data.message || "error");
      console.log("error");
    }
  }

  useEffect(() => {
    getAds();
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
          <DeleteData title="Ads" item="Ads" closing={handleClose} />
          <Stack mt={5}>
            <Button variant="outlined" color="error" onClick={DeleteAds}>
              Delete
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Button variant="contained" sx={{ mb: 3 }}>
        Add New Ads
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow sx={{ background: "#F5F5F5" }}>
              <StyledTableCell>room Number</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Discount</StyledTableCell>
              <StyledTableCell align="right">Capacity</StyledTableCell>
              <StyledTableCell align="right">Active</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ads.map((item: any) => (
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
                  <StyledIconButton>
                    <Upload />
                  </StyledIconButton>
                  <DeleteIconButton onClick={() => handleOpen(item._id)}>
                    <DeleteIcon />
                  </DeleteIconButton>
                  <StyledIconButton>
                    <RemoveRedEyeSharp />
                  </StyledIconButton>
                </ActionTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {ads.length == 0 && <Loading />}
    </>
  );
};

export default AdsList;
