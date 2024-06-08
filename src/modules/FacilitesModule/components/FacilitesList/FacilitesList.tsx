import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import EditIcon from "@mui/icons-material/Edit";
// import img from '../../../../assets/images/avatar.png'
// import { Room } from '../../../interfaces/Auth';
import { Button, IconButton, Typography } from '@mui/material';
import { axiosInstanceWithHeaders } from '../../../../axiosConfig/axiosInstance';
import { RemoveRedEyeSharp } from '@mui/icons-material';
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";

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

const FacilitesList = () => {

  const [roomFacilites, setRoomFacilites] = useState([]);

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

  const handle = () => {
    console.log("r");
  };

  useEffect(() => {
    getFacilites();
  }, []);


  return (
    <>
    <Grid sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 , marginTop: 2 }}>
      <Grid>
        <Typography component="h4" variant="h5" sx={{ fontWeight: "bold" }}>
        Facilites Table Details
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
       Add New Facilites
      </Button>
    </Grid>
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
  )
}

export default FacilitesList