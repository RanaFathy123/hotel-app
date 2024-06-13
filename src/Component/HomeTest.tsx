/* eslint-disable no-useless-catch */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Grid from "@mui/material/Grid";
import Image1 from "../assets/images/Houses with beauty backyard2.png";
import Image2 from "../assets/images/Houses with beauty backyard1.png";
import Image3 from "../assets/images/Houses with beauty backyard3.png";
import Image4 from "../assets/images/Houses with beauty backyard4.png";
import Image5 from "../assets/images/Hotels with large living room1 (1).png";
import Image6 from "../assets/images/Hotels with large living room1 (2).png";
import Image7 from "../assets/images/Hotels with large living room1 (3).png";
import Image8 from "../assets/images/Hotels with large living room1 (4).png";
import Image9 from "../assets/images/Ads1 (1).png";
import Image10 from "../assets/images/Ads1 (2).png";
import Image11 from "../assets/images/Ads1 (3).png";
import Image12 from "../assets/images/Ads1 (4).png";
import Review from "../assets/images/Review.png";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import {Box} from "@mui/material";
import banner from "../assets/images/banner (1).png";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import logo from "../assets/images/Staycation. (1).png"

// Rata
const labels: { [index: string]: string } = {
  0.5: '',
  1: '',
  1.5: '',
  2: '',
  2.5: '',
  3: '',
  3.5: '',
  4: '',
  4.5: '',
  5: '',
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}
const navItems = ['Home', 'Explore', 'Reviews','Favorites'];


export default function HomeTest () {


  // Rata
  const [value, setValue] = React.useState<number | null>(2);
  const [hover, setHover] = React.useState(-1);



  return <>
  {/* Navbar */}
  <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <img src={logo}/>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
      </nav>
    
    </Box>



  {/* Forget Busy Work, */}
  <Grid container sx={{paddingX:"80px",marginBottom:"100px"}}>

    <Grid container component="main" sx={{justifyContent:"space-evenly"}} >
    
      <Grid  item xs={12} sm={6} md={6}  >
           <Typography component="h1" sx={{marginLeft:5,marginTop:"20%",fontWeight:"bold",color: "#152C99",fontSize:"42px" }}>
           Forget Busy Work,<br/>
           Start Next Vacation
                 </Typography>
<Typography component="h1" sx={{marginLeft:5,color: " rgba(176, 176, 176, 1)",fontSize:"18px" }}>
We provide what you need to enjoy your holiday with family.<br/> Time to make another memorable moments.  </Typography>

      </Grid>
      <Grid container item xs={12} sm={6} md={6} sx={{marginTop:"80px"}}>
        <img
          src={banner}
          style={{ width: "100%", padding: 20 }}
        />

        
      </Grid>
    </Grid>
  </Grid>
  {/* Most popular ads */}
  <Grid container sx={{paddingX:"80px"}}>
  <Typography component="h1" sx={{marginLeft:5,marginTop:5, fontWeight: "bold",color: "#152C99",fontSize:20 }}>
  Most popular ads
</Typography>
    <Grid container component="main" sx={{justifyContent:"space-evenly"}} >

      <Grid container item xs={12} sm={6} md={4} sx={{position:"relative"}}>
        <img
          src={Image1}
          style={{ width: "100%",padding: 5,height:"100%" }}
          
        />
      <Typography 
      sx={{
        position:"absolute",
        top:"2%",
        right:"20px",
        bgcolor:" rgba(255, 73, 139, 1);",
        color:"white",
        paddingX:"20px",
        paddingY:"5px",
        borderBottomLeftRadius:"10px",
        borderTopRightRadius:"10px"


      }}>$22 per night</Typography>
  <Typography
            component="h1"
            variant="h5"
            sx={{  
              marginLeft: 4,
              color: "white" ,
              fontSize:20,
              position:"absolute",
              bottom:"30px"
             }}
          >
                 Ocean Land
          </Typography>
          <Typography component="h1" sx={{
            marginLeft: 4 ,
            fontSize:15,
            color: "white",
            position:"absolute",
            bottom:"10px",
            fontWeight:"blod"

            }}>
          Gunung Batu, Indonesia
          </Typography>
        <Grid>
      
        </Grid>
      </Grid>
      <Grid container item xs={12} sm={6} md={8}>
        <Grid container item  xs={12} sm={6} md={6} sx={{position:"relative"}}>
        <img
          src={Image2}
          className="imghover"
          style={{ width: "100%",padding: 20}}
        />
    <Typography 
      sx={{
        position:"absolute",
        top:"8%",
        right:"30px",
        bgcolor:" rgba(255, 73, 139, 1);",
        color:"white",
        paddingX:"10px",
        borderBottomLeftRadius:"10px",
        borderTopRightRadius:"10px"


      }}>$22 per night</Typography>
  <Typography
            component="h1"
            variant="h5"
            sx={{  
              marginLeft: 4,
              color: "white" ,
              fontSize:20,
              position:"absolute",
              bottom:"50px"
             }}
          >
                 Ocean Land
          </Typography>
          <Typography component="h1" sx={{
            marginLeft: 4 ,
            fontSize:15,
            color: "white",
            position:"absolute",
            fontWeight:"blod",
            bottom:"30px"

            }}>
          Gunung Batu, Indonesia
          </Typography>
       
        </Grid>
        <Grid container item  xs={12} sm={6} md={6} sx={{position:"relative"}}>
        <img
          src={Image2}
          style={{ width: "100%",padding: 20}}
        />
         <Typography 
      sx={{
        position:"absolute",
        top:"8%",
        right:"30px",
        bgcolor:" rgba(255, 73, 139, 1);",
        color:"white",
        paddingX:"10px",
        borderBottomLeftRadius:"10px",
        borderTopRightRadius:"10px"


      }}>$22 per night</Typography>
  <Typography
            component="h1"
            variant="h5"
            sx={{  
              marginLeft: 4,
              color: "white" ,
              fontSize:20,
              position:"absolute",
              bottom:"50px"
             }}
          >
                 Ocean Land
          </Typography>
          <Typography component="h1" sx={{
            marginLeft: 4 ,
            fontSize:15,
            color: "white",
            position:"absolute",
           bottom:"30px",
            fontWeight:"blod"

            }}>
          Gunung Batu, Indonesia
          </Typography>
        </Grid>
        <Grid container item  xs={12} sm={6} md={6} sx={{position:"relative"}}>
        <img
          src={Image2}
          style={{ width: "100%",padding: 20}}
        />
          <Typography 
      sx={{
        position:"absolute",
        top:"8%",
        right:"30px",
        bgcolor:" rgba(255, 73, 139, 1);",
        color:"white",
        paddingX:"10px",
        borderBottomLeftRadius:"10px",
        borderTopRightRadius:"10px"


      }}>$22 per night</Typography>
  <Typography
            component="h1"
            variant="h5"
            sx={{  
              marginLeft: 4,
              color: "white" ,
              fontSize:20,
              position:"absolute",
              bottom:"50px"
             }}
          >
                 Ocean Land
          </Typography>
          <Typography component="h1" sx={{
            marginLeft: 4 ,
            fontSize:15,
            color: "white",
            position:"absolute",
           bottom:"30px",
            fontWeight:"blod"

            }}>
          Gunung Batu, Indonesia
          </Typography>
         <Grid>
       
        </Grid>
       
        </Grid>
        <Grid container item  xs={12} sm={6} md={6} sx={{position:"relative"}}>
        <img
          src={Image2}
          style={{ width: "100%",padding: 20}}
        />
          <Typography 
      sx={{
        position:"absolute",
        top:"8%",
        right:"30px",
        bgcolor:" rgba(255, 73, 139, 1);",
        color:"white",
        paddingX:"10px",
        borderBottomLeftRadius:"10px",
        borderTopRightRadius:"10px"


      }}>$22 per night</Typography>
  <Typography
            component="h1"
            variant="h5"
            sx={{  
              marginLeft: 4,
              color: "white" ,
              fontSize:20,
              position:"absolute",
              bottom:"50px"
             }}
          >
                 Ocean Land
          </Typography>
          <Typography component="h1" sx={{
            marginLeft: 4 ,
            fontSize:15,
            color: "white",
            position:"absolute",
            bottom:"30px",
            fontWeight:"blod"

            }}>
          Gunung Batu, Indonesia
          </Typography>
         <Grid>
      
        </Grid>
       
        </Grid>
      </Grid>
     
    </Grid>
  </Grid>

  {/* Houses with beauty backyard */}
  <Grid container sx={{paddingX:"80px"}}>
  <Typography component="h1" sx={{marginLeft:5,marginTop:5, fontWeight: "bold",color: "#152C99",fontSize:20 }}>
    Houses with beauty backyard
</Typography>
    <Grid container component="main" sx={{justifyContent:"space-evenly"}} >

      <Grid container item xs={12} sm={6} md={3} sx={{position:"relative"}}>
        {/* <Grid sx={{position:"relative"}}> */}
        <img
          src={Image1}
          style={{ width: "100%",padding: 20 }}
          
        />
      <Typography 
      sx={{
        position:"absolute",
        top:"8%",
        right:"25px",
        bgcolor:" rgba(255, 73, 139, 1);",
        color:"white",
        paddingX:"10px",
        borderBottomLeftRadius:"10px",
        borderTopRightRadius:"10px"


      }}>Popular Choice</Typography>

        <Grid>
        <Typography
            component="h1"
            variant="h5"
            sx={{  marginLeft: 3,color: "#152C99" ,fontSize:20 }}
          >
                    Tabby Town
          </Typography>
          <Typography component="h1" sx={{marginLeft: 3 ,fontSize:15,color: "text.secondary"}}>
          Gunung Batu, Indonesia
          </Typography>
        </Grid>
      </Grid>
      <Grid container item xs={12} sm={6} md={3}>
        <img
          src={Image2}
          style={{ width: "100%",padding: 20}}
        />
         <Grid>
        <Typography
            component="h1"
            variant="h5"
            sx={{  marginLeft: 3,color: "#152C99" ,fontSize:20 }}
          >
                  Anggana
          </Typography>
          <Typography component="h1" sx={{marginLeft: 3 ,fontSize:15,color: "text.secondary"}}>
          Bogor, Indonesia
          </Typography>
        </Grid>
      </Grid>
      <Grid container item xs={12} sm={6} md={3}>
        <img
          src={Image3}
          style={{ width: "100%", padding: 20 }}
        />
         <Grid>
        <Typography
            component="h1"
            variant="h5"
            sx={{  marginLeft: 3,color: "#152C99" ,fontSize:20 }}
          >
                    Seattle Rain
          </Typography>
          <Typography component="h1" sx={{marginLeft: 3 ,fontSize:15,color: "text.secondary"}}>
          Jakarta, Indonesia
          </Typography>
        </Grid>
      </Grid>
      <Grid container item xs={12} sm={6} md={3}>
        <img
          src={Image4}
          style={{ width: "100%", padding: 20 }}
        />
         <Grid>
        <Typography
            component="h1"
            variant="h5"
            sx={{  marginLeft: 3,color: "#152C99" ,fontSize:20 }}
          >
                    Wodden Pit
          </Typography>
          <Typography component="h1" sx={{marginLeft: 3 ,fontSize:15,color: "text.secondary"}}>
          Wonosobo, Indonesia
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
   {/* Hotels with large living room */}
   <Grid container sx={{paddingX:"80px"}}>
  <Typography component="h1" sx={{marginLeft:5,marginTop:5, fontWeight: "bold",color: "#152C99",fontSize:20 }}>
  Hotels with large living room
  </Typography>
    <Grid container component="main" sx={{justifyContent:"space-evenly"}} >

      <Grid container item xs={12} sm={6} md={3} >
        <img
          src={Image5}
          style={{ width: "100%",padding: 20 }}
          
        />
     

        <Grid>
        <Typography
            component="h1"
            variant="h5"
            sx={{  marginLeft: 3,color: "#152C99" ,fontSize:20 }}
          >
                    Green Park
          </Typography>
          <Typography component="h1" sx={{marginLeft: 3 ,fontSize:15,color: "text.secondary"}}>
          Tangerang, Indonesia
          </Typography>
        </Grid>
      </Grid>
      <Grid container item xs={12} sm={6} md={3}>
        <img
          src={Image6}
          style={{ width: "100%",padding: 20}}
        />
         <Grid>
        <Typography
            component="h1"
            variant="h5"
            sx={{  marginLeft: 3,color: "#152C99" ,fontSize:20 }}
          >
                 Podo Wae
          </Typography>
          <Typography component="h1" sx={{marginLeft: 3 ,fontSize:15,color: "text.secondary"}}>
          Madiun, Indonesia
          </Typography>
        </Grid>
      </Grid>
      <Grid container item xs={12} sm={6} md={3}>
        <img
          src={Image7}
          style={{ width: "100%", padding: 20 }}
        />
         <Grid>
        <Typography
            component="h1"
            variant="h5"
            sx={{  marginLeft: 3,color: "#152C99" ,fontSize:20 }}
          >
                    Silver Rain
          </Typography>
          <Typography component="h1" sx={{marginLeft: 3 ,fontSize:15,color: "text.secondary"}}>
          Bandung, Indonesia
          </Typography>
        </Grid>
      </Grid>
      <Grid container item xs={12} sm={6} md={3} sx={{position:"relative"}}>
        <img
          src={Image8}
          style={{ width: "100%", padding: 20 }}
        />
         <Typography 
      sx={{
        position:"absolute",
        top:"8%",
        right:"25px",
        bgcolor:" rgba(255, 73, 139, 1);",
        color:"white",
        paddingX:"10px",
        borderBottomLeftRadius:"10px",
        borderTopRightRadius:"10px"


      }}>Popular Choice</Typography>
         <Grid>
        <Typography
            component="h1"
            variant="h5"
            sx={{  marginLeft: 3,color: "#152C99" ,fontSize:20 }}
          >
                 Cashville
          </Typography>
          <Typography component="h1" sx={{marginLeft: 3 ,fontSize:15,color: "text.secondary"}}>
          Kemang, Indonesia
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  </Grid>

  {/* Ads  */}
  <Grid container sx={{paddingX:"80px",marginBottom:"100px"}}>
  <Typography component="h1" sx={{marginLeft:5,marginTop:5, fontWeight: "bold",color: "#152C99",fontSize:20 }}>
  Ads
    </Typography>
    <Grid container component="main" sx={{justifyContent:"space-evenly"}} >

      <Grid container item xs={12} sm={6} md={3} sx={{position:"relative"}}>
        <img
          src={Image9}
          style={{ width: "100%",padding: 20 }}
          
        />
              <Typography 
      sx={{
        position:"absolute",
        top:"8%",
        right:"25px",
        bgcolor:" rgba(255, 73, 139, 1);",
        color:"white",
        paddingX:"10px",
        borderBottomLeftRadius:"10px",
        borderTopRightRadius:"10px"


      }}>20% Off</Typography>

        <Grid>
        <Typography
            component="h1"
            variant="h5"
            sx={{  marginLeft: 3,color: "#152C99" ,fontSize:20 }}
          >
                   PS Wood
          </Typography>
          <Typography component="h1" sx={{marginLeft: 3 ,fontSize:15,color: "text.secondary"}}>
          Depok, Indonesia
          </Typography>
        </Grid>
      </Grid>
      <Grid container item xs={12} sm={6} md={3} sx={{position:"relative"}}>
        <img
          src={Image10}
          style={{ width: "100%",padding: 20}}
        />
                      <Typography 
      sx={{
        position:"absolute",
        top:"8%",
        right:"25px",
        bgcolor:" rgba(255, 73, 139, 1);",
        color:"white",
        paddingX:"10px",
        borderBottomLeftRadius:"10px",
        borderTopRightRadius:"10px"


      }}>20% Off</Typography>
         <Grid>
        <Typography
            component="h1"
            variant="h5"
            sx={{  marginLeft: 3,color: "#152C99" ,fontSize:20 }}
          >
                    One Five          
                    </Typography>
          <Typography component="h1" sx={{marginLeft: 3 ,fontSize:15,color: "text.secondary"}}>
          Jakarta, Indonesia
          </Typography>
        </Grid>
      </Grid>
      <Grid container item xs={12} sm={6} md={3} sx={{position:"relative"}}>
        <img
          src={Image11}
          style={{ width: "100%", padding: 20 }}
        />
         <Typography 
      sx={{
        position:"absolute",
        top:"8%",
        right:"25px",
        bgcolor:" rgba(255, 73, 139, 1);",
        color:"white",
        paddingX:"10px",
        borderBottomLeftRadius:"10px",
        borderTopRightRadius:"10px"


      }}>20% Off</Typography>
         <Grid>
        <Typography
            component="h1"
            variant="h5"
            sx={{  marginLeft: 3,color: "#152C99" ,fontSize:20 }}
          >
                   Minimal
          </Typography>
          <Typography component="h1" sx={{marginLeft: 3 ,fontSize:15,color: "text.secondary"}}>
          Bogor, Indonesia
          </Typography>
        </Grid>
      </Grid>
      <Grid container item xs={12} sm={6} md={3} >
        <img
          src={Image12}
          style={{ width: "100%", padding: 20 }}
        />
      
         <Grid>
        <Typography
            component="h1"
            variant="h5"
            sx={{  marginLeft: 3,color: "#152C99" ,fontSize:20 }}
          >
                 Stays Home
          </Typography>
          <Typography component="h1" sx={{marginLeft: 3 ,fontSize:15,color: "text.secondary"}}>
          Wonosobo, Indonesia
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
{/* Review */}
<Grid container sx={{paddingX:"80px",marginBottom:"100px"}}>

    <Grid container component="main" sx={{justifyContent:"space-evenly"}} >
      <Grid container item xs={12} sm={6} md={4} >
        <img
          src={Review}
          style={{ width: "100%", padding: 20 }}
        />

        
      </Grid>
      <Grid  item xs={12} sm={6} md={8} >
           <Typography component="h1" sx={{marginLeft:5,marginTop:"20%",color: "#152C99",fontSize:"24px" }}>
      Happy Family    
      </Typography>
{/* Rata */}
<Box
      sx={{
        width: 400,
        display: 'flex',
        alignItems: 'center',
        paddingLeft:"40px",
        marginTop:"30px",
        marginBottom:"10px"
      }}
    >
      <Rating
        name="hover-feedback"
        sx={{fontSize:"40px"}}
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(_event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(_event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>




<Typography component="h1" sx={{marginLeft:5,color: "rgba(21, 44, 91, 1)",fontSize:"32px" }}>
      What a great trip with my family and <br/>
I should try again next time soon ...
      </Typography>
<Typography component="h1" sx={{marginLeft:5,color: " rgba(176, 176, 176, 1)",fontSize:"18px" }}>
  Angga, Product Designer
  </Typography>

      </Grid>
    </Grid>
  </Grid>
  {/* Footer */}

      {/* <Container component="footer"> */}
      {/* <hr/>
        <Grid
          container
          alignItems="center"
          justifyContent="space-evenly"
          
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
                color: "text.primary",
                fontSize: "1.5rem",
              }}
            >
              <>
                <h5  style={{ color: "#152C99" }}> For Beginners</h5>
              </>
            </Typography>

            <List sx={{ color: "text.secondary"}}>
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
                color: "text.primary",
                fontSize: "1.5rem",
              }}
              gutterBottom
            >
              <>
                <h5 style={{ color: "#152C99" }}>Explore Us</h5>
              </>
            </Typography>

            <List sx={{  color: "text.secondary" }}>
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
                color: "text.primary",
                fontSize: "1.5rem",
              }}
              gutterBottom
            >
              <>
                <h5 style={{ color: "#152C99" }}>Connect Us</h5>
              </>
            </Typography>

            <List sx={{ color: "text.secondary" }}>
            <h6> support@staycation.id</h6>
            <h6>021 - 2208 - 1996</h6>
            <h6> Staycation, Kemang, Jakarta</h6>

            </List>
          </Grid>
        </Grid> */}
      {/* </Container> */}

    </>
}

