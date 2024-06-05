import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Alert, IconButton, InputAdornment, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import loginImage from "../../../../assets/images/login.png";
import { axiosInstance } from "../../../../axiosConfig/axiosInstance";
import { AuthContext } from "../../../../context/AuthContext";
import { FormDataLogin } from "../../../../interfaces/Auth";
import {
  emailValidation,
  passwordValidation,
} from "../../../../validations/validations";

// TODO remove, this demo shouldn't need to reset the theme.

export default function LoginTest() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const { saveLoginData } = React.useContext(AuthContext);
  function handleMouseDownPassword(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
  }
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataLogin>();
  const onSubmit: SubmitHandler<FormDataLogin> = async (data) => {
    // setLoadingBtn(true);
    try {
      let response = await axiosInstance.post("/admin/users/login", data);
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
    console.log(data);
  };
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        component={Paper}
        sx={{ boxShadow: "none" }}
        elevation={6}
        square
      >
        <Typography component="h1" sx={{margin:3 ,fontWeight:'bold'}}>
          <Typography component="span"sx={{color:'blue'}}>
            Stay
          </Typography>
          cation.
        </Typography>
        <Box
          sx={{
            my: 8,
            mx: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ fontWeight: "bold",marginBottom:3 }}>
            Sign in
          </Typography>
          <Typography component='h1' sx={{marginBottom:1}}>If you don’t have an account register</Typography>
          <Typography component="h1" sx={{marginBottom:2}}>
            You can
            <Link to="/register" style={{ marginLeft: "0.5em", color: "blue" }}>
              Register here !
            </Link>
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <label htmlFor="email">Email</label>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              sx={{ marginBottom: 4, background: "#F5F6F8" }}
              {...register("email", emailValidation)}
            />
            {errors.email && (
              <Alert sx={{ mb: 2 }} severity="error">
                {errors.email.message?.toString()}
              </Alert>
            )}
            <label htmlFor="password">Password</label>
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              sx={{ background: "#F5F6F8" }}
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              {...register("password", passwordValidation)}
              InputProps={{
                endAdornment: (
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
                ),
              }}
            />
            {errors.password && (
              <Alert sx={{ mt: 1 }} severity="error">
                {errors.password.message?.toString()}
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 1 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs sx={{textAlign:'end',color:'blue'}}>
                <Link to="/forget-pass">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
      <CssBaseline />
      <Grid container item xs={12} sm={6} md={6} sx={{ minHeight: "100vh" }}>
        <img
          src={loginImage}
          style={{ height: "100vh", width: "100%", padding: 13 }}
        />
      </Grid>
    </Grid>
  );
}
