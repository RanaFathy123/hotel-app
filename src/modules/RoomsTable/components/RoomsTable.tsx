/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { axiosInstanceWithHeaders } from '../../../axiosConfig/axiosInstance';
import img from '../../../assets/images/avatar.png'
import { Room } from '../../../interfaces/Auth';
import { Button, IconButton, Typography,Grid } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
import { RemoveRedEyeSharp, Upload } from '@mui/icons-material';
// import { Grid } from 'react-loader-spinner';
import {  useNavigate } from "react-router-dom";



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

const RoomsList = () => {

  const [roomTable, setRoomTable] = useState<Room[]>([]);

  async function getRomedata() {
    try {
      let response = await axiosInstanceWithHeaders.get("admin/rooms");
      // console.log(response.data.data.rooms);
      const rooms = response.data.data.rooms
      setRoomTable(rooms);
    } catch (error: any) {
      console.log("error");
    }
  }

  const handle = () => {
    console.log("r");
  };
  const navigate = useNavigate();

  const goNewRoom = () => {
    navigate("/dashboard/room-data");
  };

  useEffect(() => {
    getRomedata();
  }, []);

  return (
    <>
    {/* <Button  
      sx={{ 
        backgroundColor: '#203FC7',
        color: '#fff',
        margin: 2 ,
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'flex-end'
      }}
    >
      Add New Room
    </Button> */}
     <Grid sx={{px:5, mt:2 ,mb:3, display:"flex", justifyContent:"space-between"}} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h6" component="h2">
              Rooms Table Details
            </Typography>
            
            <Typography variant="body1">You can check all details</Typography>
           
          </Grid>
          <Button onClick={goNewRoom}   sx={{ px: 5,py:2,backgroundColor:" rgba(32, 63, 199, 1)" }} variant="contained">
              Add New Room
            </Button>
        </Grid>
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow  sx={{ background : "#F5F5F5" }} >
          <StyledTableCell>room Number</StyledTableCell>
          <StyledTableCell>Image</StyledTableCell>
          <StyledTableCell align="right">Price</StyledTableCell>
          <StyledTableCell align="right">Discount</StyledTableCell>
          <StyledTableCell align="right">Capacity</StyledTableCell>
          <StyledTableCell align="right">Actions</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {roomTable.map((item : any) => (
          <StyledTableRow key={item._id}>
            <StyledTableCell component="th" scope="row">
              {item.roomNumber}
            </StyledTableCell>
            <StyledTableCell>{item.images ? 
                  <img
                    src={"https://upskilling-egypt.com:3000/" + item.images}
                    srcSet={"https://upskilling-egypt.com:3000/" + item.images} 
                    alt={''}/>
                : 
                  <img src={img} alt='no image'/>
              }</StyledTableCell>
            <StyledTableCell align="right">{item.price}</StyledTableCell>
            <StyledTableCell align="right">{item.discount}</StyledTableCell>
            <StyledTableCell align="right">{item.capacity}</StyledTableCell>
            <ActionTableCell align="right" sx={{ display: "flex" }}>
                <StyledIconButton onClick={handle}>
                  <Upload />
                </StyledIconButton>
                <DeleteIconButton>
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
);
}

export default RoomsList