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
import { Users } from "../../../interfaces/interface";
import { Grid, TablePagination, Typography } from "@mui/material";
import Loading from "../../SharedModule/components/Loading/Loading";

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

export default function UsersList() {
  const [usersTable, setUsersTable] = useState<Users[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

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

  async function getUserList() {
    try {
      let response = await axiosInstanceWithHeaders.get(
        "/admin/users?page=1&size=10"
      );
      console.log(response.data.data.users);
      const users = response.data.data.users;
      setUsersTable(users);
    } catch (error: any) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <>
      <Grid sx={{ marginBottom: 4 }} item xs={12} md={6}>
        <Typography variant="h6" component="h2">
          User Table Details
        </Typography>
        <Typography variant="body1">You can check all details</Typography>
      </Grid>
      <TableContainer component={Paper} sx={{ overflowY: "auto" }}>
        <Table
          sx={{ minWidth: 700, overflowY: "auto" }}
          aria-label="customized table"
        >
          <TableHead sx={{ background: "#F5F5F5", p: 5 }}>
            <TableRow sx={{ background: "#F5F5F5" }}>
              <StyledTableCell>userName</StyledTableCell>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell align="right">email</StyledTableCell>
              <StyledTableCell align="right">country</StyledTableCell>
              <StyledTableCell align="right">phoneNumber</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersTable
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user: any) => (
                <StyledTableRow key={user._id}>
                  <StyledTableCell component="th" scope="row">
                    {user.userName}
                  </StyledTableCell>
                  <StyledTableCell>
                    {user.profileImage ? (
                      <img
                        width="50px"
                        height="50px"
                        style={{ borderRadius: "10px" }}
                        src={`${user.profileImage}`}
                        alt={""}
                      />
                    ) : (
                      <img
                        src={img}
                        width="50px"
                        height="50px"
                        alt="no image"
                      />
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="right">{user.email}</StyledTableCell>
                  <StyledTableCell align="right">
                    {user.country}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {user.phoneNumber}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {usersTable.length === 0 && <Loading />}
      <TablePagination
        component="div"
        count={usersTable.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
