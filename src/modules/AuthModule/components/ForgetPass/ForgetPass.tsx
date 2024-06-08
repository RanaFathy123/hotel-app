import {
  Alert,
  TextField
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
import image from '../../../../assets/images/ForgetPass.jpg';
import { axiosInstance } from "../../../../axiosConfig/axiosInstance";
import { FormValuesForgetPass } from "../../../../interfaces/Auth";
import { emailValidation } from "./../../../../validations/validations";


const ForgetPass = () => {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesForgetPass>();

  const onSubmit: SubmitHandler<FormValuesForgetPass> = async (data) => {
    try {
      const response = await axiosInstance.post("admin/users/forgot-password", data);
      toast.success(response.data.message ||"check your email");
      navigate("/reset-pass");
    } catch (error : any) {
      toast.error(error.response.data.message);
    } 
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
            Forgot password
          </Typography>
          <Typography component='h1' sx={{marginBottom:1}}>If you don’t have an account register</Typography>
          <Typography component="h1" sx={{marginBottom:2}}>
            You can
            <Link to="/register" style={{ marginLeft: "0.5em", color: "red" }}>
              Login here !
            </Link>
          </Typography>
          <Box
            component="form"
            noValidate
            width='100%'
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
              <Alert  sx={{ mb: 2 , width: '600px' }} severity="error">
                {errors.email.message?.toString()}
              </Alert>
            )}
             <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 1 }}
            >
              Send mail
            </Button>
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

export default ForgetPass