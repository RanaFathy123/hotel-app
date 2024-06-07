import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import imgRegister from "../../../../assets/images/Register.png";
import { FormDataRegister } from "../../../../interfaces/Auth";
import { axiosInstance } from "../../../../axiosConfig/axiosInstance";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FilledInput,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import {
  emailValidation,
  passwordValidation,
} from "./../../../../validations/validations";
export default function Register() {
  const navigate = useNavigate();
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // upload img
  const [fileInputContent, setFileInputContent] = useState(
    "Drag & Drop or Choose a Item Image to Upload"
  );
  const handleInputContent = () => {
    setFileInputContent("File Uploaded Successfully");
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormDataRegister>();

  const validatePasswordMatch = (value: unknown) => {
    const password = watch("password");
    return value === password || "Confirm Password doesn't match Password";
  };

  const onSubmit: SubmitHandler<FormDataRegister> = async (data) => {
    setLoadingBtn(true);

    try {
      const formData = new FormData();

      formData.append("userName", data.userName);
      formData.append("email", data.email);
      formData.append("country", data.country);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("password", data.password);
      formData.append("confirmPassword", data.confirmPassword);
      formData.append("role", "user");
      if (data.profileImage && data.profileImage[0]) {
        formData.append("profileImage", data.profileImage[0]);
      }
      const response = await axiosInstance.post("/admin/users", formData);
      console.log(response);
      toast.success("User created successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("User Faild");
    } finally {
      setLoadingBtn(false);
    }
  };

  return (
    <>
      <Grid>
        <Typography variant="h5" component="h1" sx={{ mx: 5, mt: 4 }}>
          <Box component="span" color="primary.main">
            Stay
          </Box>
          cation.
        </Typography>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={5} sx={{ marginLeft: "5%", marginRight: "3%" }}>
          <Typography sx={{ mt: 5, mb: 3 }} variant="h4" component="h4">
            Sign up
          </Typography>
          <Typography variant="body1" gutterBottom>
            If you already have an account register <br />
            You can{" "}
            <Link
              to="/login"
              style={{
                marginLeft: "0.5em",
                color: "red",
                textDecoration: "none",
              }}
            >
              Login here !
            </Link>
          </Typography>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* User Name*/}
            <FormControl
              sx={{ width: 1, mt: 2, mb: 1, border: "none" }}
              variant="standard"
            >
              <label htmlFor="name">User Name</label>
              <TextField
                hiddenLabel
                id="name"
                variant="filled"
                type="text"
                placeholder="Enter Your Name"
                {...register("userName", {
                  required: "userName is required",
                })}
              />
              {errors.userName && (
                <Alert sx={{ mt: 1 }} severity="error">
                  {errors.userName.message?.toString()}
                </Alert>
              )}
            </FormControl>
            {/* Phone Number& Country */}
            <Grid container spacing={2}>
              {/* Phone Number */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={{ mt: 1, mb: 1 }} variant="standard">
                  <label htmlFor="Phone">Phone Number</label>
                  <TextField
                    hiddenLabel
                    id="Phone"
                    placeholder="Enter Your Phone Number"
                    variant="filled"
                    type="tel"
                    {...register("phoneNumber", {
                      required: "phoneNumber is required",
                      pattern: {
                        value: /^01\d{9}$/,
                        message:
                          "Phone number must start with 01 and be 11 digits in total",
                      },
                    })}
                  />
                  {errors.phoneNumber && (
                    <Alert sx={{ mt: 1 }} severity="error">
                      {errors.phoneNumber.message?.toString()}
                    </Alert>
                  )}
                </FormControl>
              </Grid>
              {/* Country */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={{ mt: 1, mb: 1 }} variant="standard">
                  <label htmlFor="country">Country</label>
                  <TextField
                    hiddenLabel
                    id="country"
                    placeholder="Enter Your Phone Number"
                    variant="filled"
                    type="text"
                    {...register("country", {
                      required: "country is required",
                    })}
                  />
                  {errors.country && (
                    <Alert sx={{ mt: 1 }} severity="error">
                      {errors.country.message?.toString()}
                    </Alert>
                  )}
                </FormControl>
              </Grid>
            </Grid>

            {/* Email */}
            <FormControl sx={{ width: 1, mt: 1, mb: 1 }} variant="standard">
              <label htmlFor="Email">Email Address</label>
              <TextField
                hiddenLabel
                id="Email"
                placeholder="Enter Your Email Address"
                variant="filled"
                type="email"
                {...register("email", emailValidation)}
              />
              {errors.email && (
                <Alert sx={{ mt: 1 }} severity="error">
                  {errors.email.message?.toString()}
                </Alert>
              )}
            </FormControl>
            {/* password */}

            <FormControl sx={{ width: 1, mt: 1, mb: 1 }} variant="standard">
              <label htmlFor="Password">Password</label>
              <FilledInput
                id="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Your Password "
                {...register("password", passwordValidation)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.password && (
                <Alert sx={{ mt: 1 }} severity="error">
                  {errors.password.message?.toString()}
                </Alert>
              )}
            </FormControl>
            {/* ConfirmPassword */}
            <FormControl sx={{ width: 1, mt: 1, mb: 3 }} variant="standard">
              <label htmlFor="ConfirmPassword">Confirm Password</label>
              <FilledInput
                id="ConfirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Enter Your Confirm Password "
                {...register("confirmPassword", {
                  required: "confirmPassword is required",
                  validate: validatePasswordMatch,
                })}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle Confirm visibility"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.confirmPassword && (
                <Alert sx={{ mt: 1 }} severity="error">
                  {errors.confirmPassword.message?.toString()}
                </Alert>
              )}
            </FormControl>
            {/* Upload Img */}
            <FormControl sx={{ mb: 2 }} fullWidth>
              <Grid
                sx={{
                  mt: 1,
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  WebkitAlignItems: "center",
                  minWidth: "322px",
                  maxWidth: "1300px",
                  height: "90px",
                  borderBlockColor: "rgba(50, 82, 223, 0.8)",
                  borderLeftColor: "rgba(50, 82, 223, 0.8)",
                  borderRightColor: "rgba(50, 82, 223, 0.8)",
                  borderWidth: "2px",
                  borderStyle: "dashed",
                  padding: "8px 16px 8px 8px",
                  borderRadius: "5px",
                  backgroundColor: "rgba(50, 82, 223, 0.1)",
                  WebkitFlex: 0,
                  flexGrow: 0,
                  paddingLeft: "120px",
                }}
              >
                <label htmlFor="uploadFile">
                  <Grid
                    sx={{
                      display: "flex",
                      width: 1,
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <DriveFolderUploadIcon />
                    <Grid sx={{ m: 2, fontWeight: "bold" }}>
                      {fileInputContent}
                    </Grid>
                  </Grid>
                  <Grid
                    sx={{
                      display: "block",
                      position: "absolute",
                      opacity: 0,
                      pointerEvents: "none",
                    }}
                  >
                    <input
                      type="file"
                      accept=".jpg,.png"
                      id="uploadFile"
                      {...register("profileImage", {
                        required: "profileImage is Required",
                      })}
                      onChange={handleInputContent}
                    />
                  </Grid>
                </label>
              </Grid>
              {errors.profileImage && (
                <Alert sx={{ mt: 1 }} severity="error">
                  {errors.profileImage.message?.toString()}
                </Alert>
              )}
            </FormControl>
            {/* Button */}
            <Button
              sx={{ width: 1, backgroundColor: " rgba(50, 82, 223, 1)" }}
              variant="contained"
              type="submit"
              disabled={loadingBtn}
            >
              {loadingBtn ? <CircularProgress color="inherit" /> : "Sign up"}
            </Button>
          </Form>
        </Grid>
        <Grid item xs={12} md={6}>
          <img
            src={imgRegister}
            alt=""
            style={{ width: "100%", height: "100%" }}
          />
        </Grid>
      </Grid>
    </>
  );
}
