import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
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
import image from '../../../../assets/images/ForgetPass.jpg';
import { axiosInstance } from "../../../../axiosConfig/axiosInstance";
import { FormDataResetPass } from "../../../../interfaces/Auth";
import {
  emailValidation,
  passwordValidation,
} from "./../../../../validations/validations";


// TODO remove, this demo shouldn't need to reset the theme.

const ResetPass = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowConfirmassword = () =>
    setShowConfirmPassword((show) => !show);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataResetPass>();

  function handleMouseDownPassword(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
  }
  function handleMouseDownConfirmPassword(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
  }

  const onSubmit: SubmitHandler<FormDataResetPass> = async (data) => {
    // setLoadingBtn(true);
    try {
      const response = await axiosInstance.post("/admin/users/reset-password", data);
      toast.success(response.data.message ||"Password changed successfully");
      navigate("/login");
    } catch (error : any) {
      toast.error(error.response.data.message || "error");
    } 
    console.log(data);
    
  };

  return (
    <>
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
            Reset Password
          </Typography>
          <Typography component='h1' sx={{marginBottom:1}}>If you don’t have an account register</Typography>
          <Typography component="h1" sx={{marginBottom:2}}>
            You can
            <Link to="/register" style={{ marginLeft: "0.5em", color: "blue" }}>
              Login here !
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
              placeholder="Please type here ..."
              sx={{ marginBottom: 2, background: "#F5F6F8" }}
              {...register("email", emailValidation)}
            />
            {errors.email && (
              <Alert sx={{ mb: 2 }} severity="error">
                {errors.email.message?.toString()}
              </Alert>
            )}

            <label htmlFor="OTP">OTP</label>
            <TextField
              margin="normal"
              required
              fullWidth
              id="OTP"
              placeholder="Please type here ..."
              sx={{ marginBottom: 2, background: "#F5F6F8" }}
              {...register("seed", {
                required: "Invalid OTP",
              })}
            />
            {errors.seed && (
              <Alert sx={{ mb: 2 , widows: '100%'}} severity="error">
                {errors.seed.message?.toString()}
              </Alert>
            )}

            <label htmlFor="Password">Password</label>
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              placeholder="Please type here ..."
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
            <label htmlFor="confirmPassword">Confirm Password</label>
            <TextField
              margin="normal"
              required
              fullWidth
              id="confirmPassword"
              placeholder="Please type here ..."
              sx={{ background: "#F5F6F8" }}
              autoComplete="current-password"
              type={showConfirmPassword ? "text" : "password"}
              {...register("password", passwordValidation)}
              InputProps={{
                endAdornment: (
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
          src={image}
          style={{ height: "100vh", width: "100%", padding: 13 }}
        />
      </Grid>
    </Grid>
    </>
  )
}

export default ResetPass