import CloseIcon from "@mui/icons-material/Close";
import {
    Box,
    Button,
    Stack,
    Typography,
    colors
} from "@mui/material";
import imgTrash from "../../../../assets/images/Email.png";



type DeleteDataProps ={
title:string ,
item : string ,
closing : ()=> void
}


const DeleteData = ({ title, item, closing }:DeleteDataProps) => {
  return (
    <Box
    borderRadius={2}
  >
    <Stack>
      <Button
        onClick={closing}
        sx={{
          position: "relative",
          padding: 0,
          minWidth: 0,
          "&:focus": {
            backgroundColor: "transparent", 
          },
        }}
      >
        <CloseIcon
          fontSize="medium"
          sx={{
            position: "absolute",
            right: "-1em",
            top: "-1em",
            color: colors.red[900],
            borderRadius: "50%",
            padding: "3px",
          }}
        />
      </Button>
      <img
        src={imgTrash}
        alt="Trash"
        style={{ width: "5.5em", margin: "auto" }}
      />
      <Typography
        variant="subtitle1"
        sx={{ marginTop: "3em" }}
        fontWeight="700"
        fontFamily="sans-serif"
        color={colors.grey[800]}
      >
        Delete This {title}?
      </Typography>
      <Typography sx={{ mt: 1 }} color="gray">
        Are you sure you want to delete this {item}? If you are sure, just
        click on delete it.
      </Typography>
    </Stack>
  </Box>
  );
};

export default DeleteData;