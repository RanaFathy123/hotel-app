import { List} from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';

export default function Footer() {
  return <>
   <hr/>
        <Grid
          container
          sx={{justifyContent:"space-between",alignItems:"center",
           paddingLeft:"5%"


          }}
        >
          <Grid  item xs={12} sm={6} md={3}>
            <Typography
              variant="h5"
              component="p"
              sx={{
                fontWeight: "bold",
                color: "text.primary",
                fontSize: "1.9rem",
              }}
              gutterBottom
            >
              <>
                <span style={{ color: "#007BFF" }}>Stay</span>
                <span style={{ color: "black" }}>cation</span>
              </>
            </Typography>

            <List sx={{  color: "text.secondary" }}>
              <p>We kaboom your beauty holiday
              instantly and memorable.</p>
            </List>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h5"
              component="p"
              sx={{
                fontWeight: "bold",
                color: "#152C99",
                fontSize: "1.5rem",
                marginBottom:"0%"
              }}
            >
          For Beginners
          
            </Typography>
            <List sx={{ color: "text.secondary",fontSize:20}}>
            <h6>New Account</h6>
            <h6>Start Booking a Room</h6>
            <h6>Use Payments</h6>

            </List>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h5"
              component="p"
              sx={{
                fontWeight: "bold",
                color: "#152C99",
                fontSize: "1.5rem",
                marginBottom:"0%"
              }}
              gutterBottom
            >
          
            Explore Us
          
            </Typography>

            <List sx={{  color: "text.secondary" ,fontSize:20}}>
            <h6> Our Careers</h6>
            <h6>Privacy</h6>
            <h6>Terms & Conditions</h6>

            </List>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h5"
              component="p"
              sx={{
                fontWeight: "bold",
                color: "#152C99",
                fontSize: "1.5rem",
                marginBottom:"0%"
              }}
              gutterBottom
            >
             Connect Us
            </Typography>

            <List sx={{ color: "text.secondary",fontSize:20 }}>
            <h6> support@staycation.id</h6>
            <h6>021 - 2208 - 1996</h6>
            <h6> Staycation, Kemang, Jakarta</h6>

            </List>
          </Grid>
        </Grid>
  
  
  </>
}
