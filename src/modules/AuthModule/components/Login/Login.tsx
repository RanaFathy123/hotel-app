import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as React from "react";
import { axiosInstanceWithHeaders } from "../../../../axiosConfig/axiosInstance";
import * as Yup from "yup";

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

const defaultTheme = createTheme();

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = async (values: any) => {
    try {
      let response = await axiosInstanceWithHeaders.post(`https://upskilling-egypt.com:3000/api/v0/admin/users/login`, values);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const Myform = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
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
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6} square>
          <h1 className="p-5 text-xl font-serif font-bold">
            <span className="text-[#152C5B]">Stay</span>cation.
          </h1>
          <Box
            className="px-[0.5em] md:px-[0.5em] lg:px-[5em]"
            sx={{
              my: 8,
              mx: 8,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={Myform.handleSubmit}>
              <TextField
                label="email"
                variant="outlined"
                color="primary"
                type="text"
                name="email"
                placeholder="John Doe"
                sx={{ mb: 3 }}
                fullWidth
                value={Myform.values.email}
                onChange={Myform.handleChange}
                onBlur={Myform.handleBlur}
                error={Myform.touched.email && Boolean(Myform.errors.email)}
                helperText={Myform.touched.email && Myform.errors.email}
                InputProps={{
        endAdornment: (
          <IconButton onClick={togglePasswordVisibility} edge="end">
            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        ),
      }}
              />
              <TextField
                label="password"
                variant="outlined"
                color="primary"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Your Password"
                fullWidth
                sx={{ mb: 3 }}
                value={Myform.values.password}
                onChange={Myform.handleChange}
                onBlur={Myform.handleBlur}
                error={Myform.touched.password && Boolean(Myform.errors.password)}
                helperText={Myform.touched.password && Myform.errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button variant="contained" color="primary" type="submit" fullWidth size="medium" disabled={!Myform.isValid}>
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          sx={backgroundStyle}
          className="bg-[url('./assets/images/login.png')] rounded"
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
              Sign in to Roamhome
            </h1>
            <h1 className="text-lg my-2">Homes as unique as you.</h1>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
