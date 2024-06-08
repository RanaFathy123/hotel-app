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
import { Room } from '../../../interfaces/Auth';
import { Button, IconButton, TextField } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import { RemoveRedEyeSharp } from '@mui/icons-material';
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

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

  useEffect(() => {
    getRomedata();
  }, []);

  return (
    <>
    <Grid sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 , marginTop: 2 }}>
    <Grid>
      <Typography component="h4" variant="h5" sx={{ fontWeight: "bold" }}>
        Rooms Table Details
      </Typography>
      <Typography>
        You can check all details
      </Typography>
    </Grid>
    <Button 
    variant="contained" 
      sx={{ 
        backgroundColor: '#203FC7',
        color: '#fff',
      }}
    >
      Add New Room
    </Button>
    </Grid>
    <Grid sx={{ marginBottom: 2, }}>
      <TextField id="outlined-basic" placeholder='search' sx={{ width:'50%', marginRight: 1 }} />
      <TextField id="outlined-basic" placeholder='tag' sx={{ marginRight: 1 }} variant="outlined" />
      <TextField id="outlined-basic" placeholder='Category' sx={{ marginRight: 1 }} variant="outlined" />
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
            <StyledTableCell align="right">
              <Grid  sx={{ width: '10%' }}>
                <img src={item.images} alt="" />
              </Grid>
            </StyledTableCell>
            <StyledTableCell align="right">{item.price}</StyledTableCell>
            <StyledTableCell align="right">{item.discount}</StyledTableCell>
            <StyledTableCell align="right">{item.capacity}</StyledTableCell>
            <ActionTableCell align="right" sx={{ display: "flex" }}>
                <StyledIconButton onClick={handle}>
                  <EditIcon />
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