import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  CircularProgress,
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
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import resetpassimg from "../../../../assets/images/ResetPass.png";
import { axiosInstance } from "../../../../axiosConfig/axiosInstance";
import { FormDataResetPass } from "../../../../interfaces/Auth";
import {
  emailValidation,
  passwordValidation,
} from "./../../../../validations/validations";


// TODO remove, this demo shouldn't need to reset the theme.

const ResetPass = () => {
  const [loadingBtn, setLoadingBtn] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowConfirmassword = () =>
    setShowConfirmPassword((show) => !show);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormDataResetPass>();

  function handleMouseDownPassword(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
  }
  function handleMouseDownConfirmPassword(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    event.preventDefault();
  }

  const onSubmit: SubmitHandler<FormDataResetPass> = async (data) => {
    setLoadingBtn(true);
    try {
      const response = await axiosInstance.post(
        "/admin/users/reset-password",
        data
      );
      toast.success(response.data.message || "Password changed successfully");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response.data.message || "error");
    }
    console.log(data);
  };

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          sx={{ boxShadow: "none" }}
          component={Paper}
          elevation={6}
          square
        >
          <Typography component="h1" sx={{ margin: 3, fontWeight: "bold" }}>
            <Typography component="span" sx={{ color: "blue" }}>
              Stay
            </Typography>
            cation.
          </Typography>
          <Box
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
            <p className="mt-4">
              If you already have an account register <br /> You can{" "}
              <Link
                to="/login"
                style={{ marginLeft: "2px", textDecoration: "none" }}
              >
                Login here !
              </Link>
            </p>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 1 }}
            >
              <InputLabel htmlFor="outlined-adornment-email" sx={{ mb: 1 }}>
                Email
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email"
                fullWidth
                type="text"
                label="email"
                placeholder="Please Type Here"
                sx={{background:'#F5F6F8',mb:1}}
                {...register("email", emailValidation)}
              />
              {errors.email && (
                <Alert sx={{ mt: 1 }} severity="error">
                  {errors.email.message?.toString()}
                </Alert>
              )}

              <InputLabel htmlFor="outlined-adornment-otp" sx={{ mb: 1 }}>
                OTP
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-otp"
                fullWidth
                type="text"
                label="OTP"
                placeholder="Please Type Here"
                sx={{background:'#F5F6F8',mb:1}}
                {...register("seed", {
                  required: "Invalid OTP",
                })}
              />
              {errors.seed && (
                <Alert sx={{ mt: 1 }} severity="error">
                  {errors.seed.message?.toString()}
                </Alert>
              )}

              <InputLabel htmlFor="outlined-adornment-password " sx={{ mb: 1 }}>
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                fullWidth
                placeholder="Please Type Here"
                sx={{background:'#F5F6F8',mb:1}}
                {...register("password", passwordValidation)}
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
              {errors.password && (
                <Alert sx={{ mt: 1 }} severity="error">
                  {errors.password.message?.toString()}
                </Alert>
              )}
              <InputLabel
                htmlFor="outlined-adornment-confirm-password "
                sx={{ mb: 1 }}
              >
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-confirm-password "
                fullWidth
                placeholder="Please Type Here"
                sx={{background:'#F5F6F8',mb:1}}
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "confirmPassword is required",
              
                })}
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
              {errors.confirmPassword && (
                <Alert sx={{ mt: 1 }} severity="error">
                  {errors.confirmPassword.message?.toString()}
                </Alert>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 5, mb: 2 }}
                disabled={isSubmitting}
              >
                {loadingBtn ? <CircularProgress disableShrink /> : "Reset"}
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid container item xs={12} sm={6} md={6} sx={{ minHeight: "100vh" }}>
          <img
            src={resetpassimg}
            style={{ height: "100vh" , width: "100%", padding: 13 }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ResetPass;
