import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstance } from "../../../../axiosConfig/axiosInstance";
import { FormDataResetPass } from "../../../../interfaces/Auth";
import {
  emailValidation,
  passwordValidation,
} from "./../../../../validations/validations";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

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
    watch,
    formState: { errors },
  } = useForm<FormDataResetPass>();

  const validatePasswordMatch = (value: unknown) => {
    const password = watch("password");
    return value === password || "Confirm Password doesn't match Password";
  };

  function handleMouseDownPassword(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
  }
  function handleMouseDownConfirmPassword(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    event.preventDefault();
  }

  const backgroundStyle = {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: { xs: "none", sm: "flex" },
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  };

  const onSubmit: SubmitHandler<FormDataResetPass> = async (data) => {
    // setLoadingBtn(true);
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
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            component={Paper}
            elevation={6}
            square
          >
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
              <p className="mt-4">
                If you already have an account register <br /> You can{" "}
                <span className="text-[red]">
                  <Link to="/login">Login here !</Link>
                </span>
              </p>
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
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
                  {...register("email", emailValidation)}
                />
                {errors.email && (
                  <Alert sx={{ mt: 1 }} severity="error">
                    {errors.email.message?.toString()}
                  </Alert>
                )}

                <InputLabel htmlFor="outlined-adornment-otp" className="my-1">
                  OTP
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-otp"
                  fullWidth
                  type="text"
                  label="OTP"
                  placeholder="Please Type Here"
                  className="bg-[#F5F6F8] mb-3"
                  {...register("seed", {
                    required: "Invalid OTP",
                  })}
                />
                {errors.seed && (
                  <Alert sx={{ mt: 1 }} severity="error">
                    {errors.seed.message?.toString()}
                  </Alert>
                )}

                <InputLabel
                  htmlFor="outlined-adornment-password "
                  className="my-1"
                >
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  fullWidth
                  placeholder="Please Type Here"
                  className="bg-[#F5F6F8] mb-3"
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
                  className="my-1"
                >
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-confirm-password "
                  fullWidth
                  placeholder="Please Type Here"
                  className="bg-[#F5F6F8]"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "confirmPassword is required",
                    validate: validatePasswordMatch,
                  })}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmassword}
                        onMouseDown={handleMouseDownConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
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
  );
};

export default ResetPass;
