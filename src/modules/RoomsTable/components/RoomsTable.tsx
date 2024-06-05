import { RemoveRedEyeSharp, Upload } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import styled from "styled-components";
import img from "../../../assets/images/avatar.png";
import { axiosInstanceWithHeaders } from "../../../axiosConfig/axiosInstance";
import { Room } from "../../../interfaces/Auth";

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

const RoomsList = () => {
  const [roomTable, setRoomTable] = useState<Room[]>([]);

  async function getRomedata() {
    try {
      let response = await axiosInstanceWithHeaders.get("admin/rooms");
      // console.log(response.data.data.rooms);
      const rooms = response.data.data.rooms;
      console.log(response);

      setRoomTable(rooms);
    } catch (error: any) {
      // console.log("error");
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
      <Button
        sx={{
          backgroundColor: "#203FC7",
          color: "#fff",
          margin: 2,
          display: "flex",
          justifyContent: "end",
          alignItems: "flex-end",
        }}
      >
        Add New Room
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow sx={{ background: "#F5F5F5" }}>
              <StyledTableCell>room Number</StyledTableCell>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Discount</StyledTableCell>
              <StyledTableCell align="right">Capacity</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roomTable.map((item: any) => (
              <StyledTableRow key={item._id}>
                <StyledTableCell component="th" scope="row">
                  {item.roomNumber}
                </StyledTableCell>
                <StyledTableCell>
                  {item.images[0] ? (
                    <img width="50px" height='50px' src={`${item.images[0]}`} alt={""} />
                  ) : (
                    <img src={img} alt="no image" />
                  )}
                </StyledTableCell>
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
};

export default RoomsList;
