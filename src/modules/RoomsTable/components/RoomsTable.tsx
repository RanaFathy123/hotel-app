/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import {  IconButton } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstanceWithHeaders } from '../../../axiosConfig/axiosInstance';
import { Room } from '../../../interfaces/Auth';
import { Button, IconButton, TableBody, Typography } from '@mui/material';
import { RemoveRedEyeSharp, Upload } from '@mui/icons-material';
import {  Grid} from '@mui/material';
import img from "../../../assets/images/avatar.png";
import DeleteIcon from "@mui/icons-material/Delete";
import TablePagination from '@mui/material/TablePagination';


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






export default function RoomTable() {
  const [roomTable, setRoomTable] = useState<Room[]>([]);

  async function getRomedata() {
    try {
      let response = await axiosInstanceWithHeaders.get("admin/rooms");
      // console.log(response.data.data.rooms);
      const rooms = response.data.data.rooms;
      console.log(response.data.data.rooms);

      setRoomTable(rooms);
    } catch (error: any) {
      // console.log("error");
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


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return <>
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

    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table"  >
          <TableHead>
            <TableRow>
            <StyledTableCell>room Number</StyledTableCell>
          <StyledTableCell>Image</StyledTableCell>
          <StyledTableCell align="right">Price</StyledTableCell>
          <StyledTableCell align="right">Discount</StyledTableCell>
          <StyledTableCell align="right">Capacity</StyledTableCell>
          <StyledTableCell align="right">Facilities</StyledTableCell>
          <StyledTableCell align="right">Actions</StyledTableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {roomTable.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item:any) => (
          <StyledTableRow key={item._id}  hover role="checkbox" tabIndex={-1} >
            <StyledTableCell component="th" scope="row">
              {item.roomNumber}
            </StyledTableCell>
            <StyledTableCell sx={{width: "10%"}}>{item.images ? 
                  <img
                    src={ item.images}
                    srcSet={ item.images} 
                    alt={''}
                    className='imgrec'
                    />
                  
                : 
                  <img src={img} className='imgreca' alt='no image'/>
              }</StyledTableCell>
            <StyledTableCell align="right">{item.price}</StyledTableCell>
            <StyledTableCell align="right">{item.discount}</StyledTableCell>
            <StyledTableCell align="right">{item.capacity}</StyledTableCell>
            <StyledTableCell align="right">{item.facilities[0]?.name}</StyledTableCell>
            <ActionTableCell align="right" sx={{ display: "flex" }}>
            <StyledIconButton onClick={handle}>
            <Link to={`/dashboard/roomsEdit/${item.id}`}
          state={{RoomData:item,type:'edit'}}
          className=' text-decoration-none'

>
                  <Upload />

</Link>
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
      <TablePagination
        rowsPerPageOptions={[1,10 ,20]}
        component="div"
        count={roomTable.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  </>
}