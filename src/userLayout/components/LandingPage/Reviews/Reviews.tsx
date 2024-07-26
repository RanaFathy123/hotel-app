import {
  Container,
  Box,
  Typography,
  Rating,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import reviewImg from "../../../../assets/images/happy.png";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Reviews = () => {
  const theme: any = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: isSmallScreen ? "column" : "row",
          mb: 3,
          px: 5,
          mt: 4,
          textAlign: isSmallScreen ? "center" : "left",
        }}
      >
        <img
          src={reviewImg}
          alt="review"
          style={{
            borderRadius: "8px",
            width: "100%",
            maxWidth: "600px",
            height: "auto",
            marginBottom: isSmallScreen ? "16px" : "0",
          }}
        />
        <Box sx={{ mx: isSmallScreen ? 0 : 5, mb: isSmallScreen ? 0 : 3 }}>
          <Typography
            variant="h5"
            sx={{ mt: 2, fontWeight: "bold", fontSize: "24px" }}
          >
            Happy Family
          </Typography>
          <Rating value={5} readOnly sx={{ mt: 1 }} />
          <Typography variant="body1" sx={{ mt: 1, fontSize: "32px" }}>
            What a great trip with my family and I should try again next time
            soon ...
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              maxWidth: "600px",
              justifyContent: isSmallScreen ? "center" : "start",
              mt: 2,
            }}
          >
            <IconButton aria-label="previous review">
              <ArrowBackIosIcon />
            </IconButton>
            <IconButton aria-label="next review">
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Reviews;
