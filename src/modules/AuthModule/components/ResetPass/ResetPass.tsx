import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link href="https://mui.com/">Your Website</Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const ResetPass = () => {

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowConfirmassword = () => setShowConfirmPassword((show) => !show);


  function handleMouseDownPassword(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
  }
  function handleMouseDownConfirmPassword(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  const backgroundStyle = {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: { xs: "none", sm: "flex" },
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  };

  return (
    <>
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6} square>
          <h1 className="p-5 text-xl font-serif font-bold">
            <span className="text-[blue]">Stay</span>cation.
          </h1>
          <Box
            className="px-[0.5em] md:px-[0.5em] lg:px-[5em]"
            sx={{
              my: 3,
              mx: 8,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Reset Password
            </Typography>
            <p className="mt-4">If you already have an account register <br /> You can <span className="text-[red]">Login here !</span></p>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <InputLabel htmlFor="outlined-adornment-email" className="my-1">
                email
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email"
                fullWidth
                type="text"
                label="email"
                placeholder="Please Type Here"
                className="bg-[#F5F6F8] mb-3"
                name="email"
              />
  
              <InputLabel htmlFor="outlined-adornment-email" className="my-1">
                OTP
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email"
                fullWidth
                type="text"
                label="OTP"
                placeholder="Please Type Here"
                className="bg-[#F5F6F8] mb-3"
                name="OTP"
              />

              <InputLabel
                htmlFor="outlined-adornment-password "
                className="my-1"
              >
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                fullWidth
                name="password"
                placeholder="Please Type Here"
                className="bg-[#F5F6F8] mb-3"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />

              <InputLabel
                htmlFor="outlined-adornment-password "
                className="my-1"
              >
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                fullWidth
                name="Confirm Password"
                placeholder="Please Type Here"
                className="bg-[#F5F6F8]"
                type={showConfirmPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmassword}
                      onMouseDown={handleMouseDownConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 5, mb: 2 }}
              >
               Reset
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          sx={backgroundStyle}
          className="bg-[url('./assets/images/ForgetPass.jpg')] rounded"
        >
          <Box
            sx={{
              width: "100%",
              textAlign: "left",
              padding: 10,
              color: "white",
            }}
          >
            <h1 className="font-bold line-clamp-6 md:text-2xl lg:text-4xl">
              Reset Password
            </h1>
            <h1 className="text-lg my-2">Homes as unique as you.</h1>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    </>
  )
}

export default ResetPass