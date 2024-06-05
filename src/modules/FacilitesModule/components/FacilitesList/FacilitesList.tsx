import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import React, { FC, useEffect, useState } from 'react';
// import img from '../../../../assets/images/avatar.png'
// import { Room } from '../../../interfaces/Auth';
import { Backdrop, Box, Button, IconButton, Modal, Stack } from '@mui/material';
import { axiosInstanceWithHeaders } from '../../../../axiosConfig/axiosInstance';
import { RemoveRedEyeSharp, Upload } from '@mui/icons-material';
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteData from '../../../SharedModule/components/DeleteData/DeleteData';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
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

 interface SnackBarProps{
handleClick: ()=> void ;
setMessage : React.Dispatch<React.SetStateAction<string>>;
setMessageType : React.Dispatch<React.SetStateAction<string>>
}

const FacilitesList:FC<SnackBarProps> = ({handleClick , setMessage , setMessageType}) => {

  const [roomFacilites, setRoomFacilites] = useState([]);
  const [open, setOpen] = useState(false);
  const [facilityID, setFacilityID] = useState("");
  const handleClose = () => setOpen(false);
  
  const handleOpen = (id: any) => {
    setOpen(true);
    setFacilityID(id);
  };

  async function getFacilites() {
    try {
      let response = await axiosInstanceWithHeaders.get("admin/room-facilities");
      const facilities = response.data.data.facilities
      // console.log(response.data.data.facilities);
      setRoomFacilites(facilities);
    } catch (error: any) {
      console.log("error");
    }
  }

  async function DeleteFacility() {
    try {
      let response = await axiosInstanceWithHeaders.delete(`admin/room-facilities/${facilityID}`);
      handleClose()
      handleClick()
      setMessage('the Facility has been Deleted successfully')
      setMessageType('success')
      getFacilites()
    } catch (error: any) {
      handleClick()
      setMessage(`there's an error`)
      setMessageType('error')
      console.log("error");
    }
  }

  useEffect(() => {
    getFacilites();
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
        <Box  sx={{
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
        }} >
          <DeleteData title="Facility" item="Facility" closing={handleClose} />
         <Stack mt={5}>
         <Button variant="outlined" color="error" onClick={DeleteFacility}>
            Delete
          </Button>
         </Stack>
        </Box>
      </Modal>
    <Button  
      sx={{ 
        backgroundColor: '#203FC7',
        color: '#fff',
        margin: 2 
      }}
    >
      Add New Facilites
    </Button>
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow  sx={{ background : "#F5F5F5" }} >
          <StyledTableCell>Name</StyledTableCell>
          <StyledTableCell>createdAt</StyledTableCell>
          <StyledTableCell align="right">Actions</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {roomFacilites.map((item : any) => (
          <StyledTableRow key={item._id}>
            <StyledTableCell component="th" scope="row">
              {item.name}
            </StyledTableCell>
            <StyledTableCell>{item.createdAt}</StyledTableCell>
            <ActionTableCell align="right" sx={{ display: "flex" }}>
                <StyledIconButton >
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
  </>
  )
}

export default FacilitesList