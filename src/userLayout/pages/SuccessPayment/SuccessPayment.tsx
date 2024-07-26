import { Box, Button, Container, Typography } from "@mui/material";
import stepImg from "../../../assets/images/stepper.png";
import successImg from "../../../assets/images/successpayment.png";
import { Link } from "react-router-dom";

const SuccessPayment = () => {
  return (
    <Container>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <img src={stepImg} alt="success payment step" style={{ maxWidth: "100%", marginBottom: "16px" }} />
      <Typography variant="h4" sx={{ color: "#152C5B", fontSize: { xs: "28px", sm: "36px" }, fontWeight: "bold" }}>
        Yay! Completed
      </Typography>
      <img src={successImg} alt="success payment" style={{ maxWidth: "100%", marginBottom: "16px", marginTop: "16px" }} />
      <Typography variant="body1" sx={{ color: "#B0B0B0", fontSize: { xs: "16px", sm: "18px" }, marginBottom: "32px" }}>
        We will inform you via email later once the transaction has been accepted.
      </Typography>
      <Button 
        component={Link} 
        to="/" 
        variant="contained" 
        sx={{ backgroundColor: "#3252DF", color: "#FFFFFF", '&:hover': { backgroundColor: "#0d1c3d" }, fontSize: { xs: "16px", sm: "18px" } }}
      >
        Back to Home
      </Button>
    </Box>
  </Container>
  );
};

export default SuccessPayment;
