/* eslint-disable @typescript-eslint/no-explicit-any */
import { Padding, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Field, Form, Formik } from "formik";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstance } from "../../../../axiosConfig/axiosInstance";
import { AuthContext } from "../../../../context/AuthContext";
import { FormValuesLogin } from "../../../../interfaces/Auth";
import { LoginValidationSchema } from "../../../../validations/validations";

const defaultTheme = createTheme();


const initalValues: FormValuesLogin = {
  email: "",
  password: "",
};
const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const { saveLoginData } = React.useContext(AuthContext);

  const handleClickShowPassword = () => setShowPassword((show) => !show);



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
          <h1 className="px-4 py-3 text-xl font-serif font-bold">
            <span className="text-[#152C5B]">Stay</span>cation.
          </h1>
          <Box
            sx={{
              my: 8,
              mx: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              textAlign: "left",
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{
                marginBottom: "0.5em",
                fontWeight: "bold",
                fontSize: "30px",
              }}
            >
              Sign in
            </Typography>
            <h1>If you don’t have an account register</h1>
            <h1 className="mb-3">
              You can
              <Link className="text-blue-800 mx-2" to="/register">
                Register here !
              </Link>
            </h1>
            <Formik
              initialValues={initalValues}
              validationSchema={LoginValidationSchema}
              onSubmit={async (values, formikHelpers) => {
                formikHelpers.resetForm();
                formikHelpers.setSubmitting(true);
                setLoading(true);
                try {
                  let response = await axiosInstance.post(
                    "/admin/users/login",
                    values
                  );
                  const token = response.data.data.token;
                  localStorage.setItem("token", token);
                  saveLoginData();
                  toast.success(response.data.message || "Login Success");
                  navigate("/dashboard");
                } catch (error: any) {
                  console.log(error);
                  toast.error(error.response?.data?.message || "Login Fail");
                  setLoading(false);
                }
              }}
            >
              {({ errors, isValid, touched, dirty, isSubmitting }) => (
                <Form>
                  <InputLabel
                    htmlFor="outlined-adornment-email"
                    className="my-2 lg:w-[5rem] xl:w-[10rem]  md:w-[10rem] 2xl:w-[40rem] "
                  >
                    <h1 className="text-[#152C5B] mb-1">Email Address</h1>
                  </InputLabel>
                  <Field
                    name="email"
                    as={OutlinedInput}
                    fullWidth
                    type="text"
                    label="email"
                    placeholder="Please Type Here"
                    className="bg-[#F5F6F8] mb-7 px-3"
                    error={Boolean(errors.email) && Boolean(touched.email)}
                  />
                  {errors.email && touched.email ? (
                    <Alert severity="error" className="mb-4">
                      {errors.email}
                    </Alert>
                  ) : null}
                  <InputLabel
                    htmlFor="outlined-adornment-password "
                    className="my-2 lg:w-[5rem] xl:w-[35rem]  md:w-[10rem] 2xl:w-[40rem]"
                  >
                    <h1 className="text-[#152C5B] mb-1">Password</h1>
                  </InputLabel>
                  <Field
                    name="password"
                    as={OutlinedInput}
                    placeholder="Please Type Here"
                    className="bg-[#F5F6F8] mb-10"
                    variant="outlined"
                    color="primary"
                    fullWidth
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
                    error={
                      Boolean(errors.password) && Boolean(touched.password)
                    }
                  />
                  {errors.password && touched.password ? (
                    <Alert severity="error" className="mb-4">
                      {errors.password}
                    </Alert>
                  ) : null}
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className="mt-[2em]"
                    size="large"
                    disabled={isSubmitting || !isValid || !dirty}
                  >
                    {loading ? <CircularProgress disableShrink /> : "Login"}
                  </Button>
                  <Grid container>
                    <Grid item xs className="text-end text-blue-700 py-4">
                      <Link to="/forget-pass" className="mt-5">
                        Forgot password?
                      </Link>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Box>
        </Grid>
        <Grid container
          item
          xs={12}
          sm={6}
          md={6}
          sx={backgroundStyle}
          className="bg-[url('./assets/images/login.png')] rounded "
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
            <h1 className="text-lg my-2 ">Homes as unique as you.</h1>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;

