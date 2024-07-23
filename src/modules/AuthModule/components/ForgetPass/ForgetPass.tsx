import {
  Alert,
  CircularProgress,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ForgetImage from "../../../../assets/images/ForgetPass.png";
import { axiosInstance } from "../../../../axiosConfig/axiosInstance";
import { FormValuesForgetPass } from "../../../../interfaces/interface";
import { emailValidation } from "./../../../../validations/validations";
import { useState } from "react";

const ForgetPass = () => {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValuesForgetPass>();

  const onSubmit: SubmitHandler<FormValuesForgetPass> = async (data) => {
    setLoadingBtn(true);
    try {
      const response = await axiosInstance.post(
        "admin/users/forgot-password",
        data
      );
      toast.success(response.data.message || "check your email");
      navigate("/reset-password");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
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
            }}
          >
            <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
              Forgot password
            </Typography>
            <Typography component="h1" sx={{ mb: 3 }}>
              If you already have an account register <br /> You can
              <Link
                to="/login"
                style={{ marginLeft: "2px", textDecoration: "none" }}
              >
                Login here !
              </Link>
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
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
                sx={{ background: "#F5F6F8", marginBottom: 2 }}
                {...register("email", emailValidation)}
              />
              {errors.email && (
                <Alert sx={{ mt: 1 }} severity="error">
                  {errors.email.message?.toString()}
                </Alert>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 5, mb: 2 }}
                disabled={isSubmitting}
              >
                {loadingBtn ? <CircularProgress disableShrink /> : "Send mail"}
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid container item xs={12} sm={6} md={6} sx={{ minHeight: "100vh" }}>
          <img
            src={ForgetImage}
            style={{ height: "100vh", width: "100%", padding: 13 }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ForgetPass;
