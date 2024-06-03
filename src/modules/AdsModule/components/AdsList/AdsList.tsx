import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
// import img from '../../../../assets/images/avatar.png'
// import { Room } from '../../../interfaces/Auth';
import { Button } from '@mui/material';
import { axiosInstanceWithHeaders } from '../../../../axiosConfig/axiosInstance';


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

const AdsList = () => {

  const [ads, setAds] = useState([]);

  async function getFacilites() {
    try {
      let response = await axiosInstanceWithHeaders.get("admin/ads");
      const ads = response.data.data.ads
      console.log(response.data.data.ads);
      setAds(ads);
    } catch (error: any) {
      console.log("error");
    }
  }

  useEffect(() => {
    getFacilites();
  }, []);

  return (
    <>
    <Button  
      sx={{ 
        backgroundColor: '#203FC7',
        color: '#fff',
        margin: 2 
      }}
    >
      Add New Ads
    </Button>
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow  sx={{ background : "#F5F5F5" }} >
        <StyledTableCell>room Number</StyledTableCell>
          <StyledTableCell align="right">Price</StyledTableCell>
          <StyledTableCell align="right">Discount</StyledTableCell>
          <StyledTableCell align="right">Capacity</StyledTableCell>
          <StyledTableCell align="right">Active</StyledTableCell>
          {/* <StyledTableCell align="right">Actions</StyledTableCell> */}
        </TableRow>
      </TableHead>
      <TableBody>
        {ads.map((item : any) => (
          <StyledTableRow key={item._id}>
            <StyledTableCell component="th" scope="row">
              {item.room.roomNumber}
            </StyledTableCell>
            <StyledTableCell align="right">{item.room.price}</StyledTableCell>
            <StyledTableCell align="right">{item.room.discount}</StyledTableCell>
            <StyledTableCell align="right">{item.room.capacity}</StyledTableCell>
            <StyledTableCell align="right">{item.isActive ? "Yes"  : "No"}</StyledTableCell>

          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  </>
  )
}

export default AdsList