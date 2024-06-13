/* eslint-disable @typescript-eslint/no-explicit-any */
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  CircularProgress,
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
import { Link } from "react-router-dom";
import loginImage from "../../../../assets/images/login.png";
import useLogin from "../../../../hooks/useLogin";
import {
  emailValidation,
  // passwordValidation,
} from "../../../../validations/validations";

const Login = () => {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    loading,
    showPassword,
    handleMouseDownPassword,
    handleClickShowPassword,
  } = useLogin();

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
        <Typography component="h1" sx={{ margin: 3, fontWeight: "bold" }}>
          <Typography component="span" sx={{ color: "blue" }}>
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
          <Typography
            component="h1"
            variant="h5"
            sx={{ fontWeight: "bold", marginBottom: 3 }}
          >
            Sign in
          </Typography>
          <Typography component="h1" sx={{ marginBottom: 1 }}>
            If you don’t have an account register
          </Typography>
          <Typography component="h1" sx={{ marginBottom: 2 }}>
            You can
            <Link
              to="/register"
              style={{
                marginLeft: "0.5em",
                color: "blue",
                textDecoration: "none",
              }}
            >
              Register here !
            </Link>
          </Typography>
          <Box
            component="form"
            noValidate
            width="100%"
            sx={{ mt: 1 }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputLabel
              htmlFor="outlined-adornment-email"
              sx={{ marginBottom: 2 }}
            >
              Email Address
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-email"
              fullWidth
              type="text"
              label="email"
              placeholder="Please Type Here"
              sx={{ background: "#F5F6F8", marginBottom: 2 }}
              {...register("email", emailValidation)}
            />
            {errors.email && (
              <Alert sx={{ mb: 2 }} severity="error">
                {errors.email.message?.toString()}
              </Alert>
            )}
            <InputLabel
              htmlFor="outlined-adornment-password"
              sx={{ marginBottom: 2 }}
            >
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              fullWidth
              placeholder="Please Type Here"
              sx={{ background: "#F5F6F8", marginBottom: 2 }}
              {...register("password")}
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 1 }}
              disabled={isSubmitting}
            >
              {loading ? <CircularProgress disableShrink /> : "Login"}
            </Button>
            <Grid container>
              <Grid item xs sx={{ textAlign: "end", color: "blue" }}>
                <Link to="/forget-password" style={{ textDecoration: "none" }}>
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
};

export default Login;
