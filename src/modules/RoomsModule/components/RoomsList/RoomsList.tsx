import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import React from "react";

// Define interface for row data
interface RowData {
  id: number;
  name: string;
}

const StyledTableContainer = styled(TableContainer)({
  marginTop: 100,
});

const StyledTableHead = styled(TableHead)({
  backgroundColor: "#E2E5EB",
  borderRadius: "10px",
  padding: "20px",
  fontWeight: "bold",
});

const StyledTableCell = styled(TableCell)({
  color: "black",
  fontWeight: "bold",
});

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

const rows: RowData[] = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "John Doe" },
  { id: 3, name: "John Doe" },

  // Add more rows as needed
];

const RoomsList: React.FC = () => {
  const handle = () => {
    console.log("r");
  };

  return (
    <StyledTableContainer>
      <Table>
        <StyledTableHead>
          <TableRow>
            <StyledTableCell sx={{ padding: 4 }}>
              <Typography variant="body1">Name</Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="body1">Edit</Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="body1">Delete</Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="body1">Delete</Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="body1">Delete</Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="body1">Delete</Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="body1">Delete</Typography>
            </StyledTableCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <ActionTableCell>
                <Typography variant="body1">{row.name}</Typography>
              </ActionTableCell>
              <ActionTableCell>
                <Typography variant="body1">{row.name}</Typography>
              </ActionTableCell>
              <ActionTableCell>
                <Typography variant="body1">{row.name}</Typography>
              </ActionTableCell>
              <ActionTableCell>
                <Typography variant="body1">{row.name}</Typography>
              </ActionTableCell>
              <ActionTableCell>
                <Typography variant="body1">{row.name}</Typography>
              </ActionTableCell>
              <ActionTableCell>
                <StyledIconButton>
                  <EditIcon />
                </StyledIconButton>
              </ActionTableCell>
              <ActionTableCell sx={{ display: "flex" }}>
                <StyledIconButton onClick={handle}>
                  <EditIcon />
                </StyledIconButton>
                <DeleteIconButton>
                  <DeleteIcon />
                </DeleteIconButton>
              </ActionTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default RoomsList;
