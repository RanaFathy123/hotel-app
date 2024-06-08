import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Alert,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  ThemeProvider,
  colors,
  createTheme
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { axiosInstanceWithHeaders } from "../../../../axiosConfig/axiosInstance";
import { FormChangePass } from "../../../../interfaces/interface";
import {
  newpasswordValidation,
  oldpasswordValidation,
} from "../../../../validations/validations";
import { toast } from "react-toastify";

const defaultTheme = createTheme();


const ChangePass = () => {
  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormChangePass>();

  const validatePasswordMatch = (value: unknown) => {
    const password = watch("newPassword");
    return value === password || "Confirm Password doesn't match Password";
  };

 

  const onSubmit: SubmitHandler<FormChangePass> = async (values) => {
    try {
      let response = await axiosInstanceWithHeaders.post(
        'admin/users/change-password',
        values
      );
      toast.success(response.data.message || 'PassWord Changed Succefully')
    navigate('/login')
    } catch (error: any) { 
      console.log( error?.response?.data?.success);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              borderRadius: 8,
              p: 3,
              maxWidth:500
            }}
          >
            <Typography
              fontSize={30}
              sx={{
                textAlign: "center",
                padding: 5,
                fontWeight: "bold",
                fontFamily: "sans-serif",
              }}
            >
              <span className="text-[#152C5B]">Stay</span>cation.
            </Typography>
            <Typography id="transition-modal-title" sx={{ fontSize: "1.2rem" }}>
              Change Your Password
            </Typography>
            <Typography variant="body2" color={colors.grey[500]}>Enter your details below</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ mt: 2 }}>
                <TextField
                sx={{marginY:1}}
                  fullWidth
                  id="oldPassword"
                  label="Old Password"
                  type={showOldPassword ? "text" : "password"}
                  {...register("oldPassword", oldpasswordValidation)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowOldPassword(!showOldPassword)}
                          onMouseDown={(e) => e.preventDefault()}
                          edge="end"
                        >
                          {showOldPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {errors.oldPassword ? (
                  <Alert
                    severity="error"
                    sx={{
                     marginY:1,
                      width: {
                        xs: "250px", 
                        sm: "450px", 
                      },
                    }}
                  
                  >
                    {errors.oldPassword.message}
                  </Alert>
                ) : (
                  ""
                )}

                <TextField
                  fullWidth
                  id="newPassword"
                  sx={{marginY:1}}

                  label="New Password"
                  {...register("newPassword", newpasswordValidation)}
                  type={showNewPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          onMouseDown={(e) => e.preventDefault()}
                          edge="end"
                        >
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {errors.newPassword && (
                  <Alert
                    severity="error"
                    sx={{
                      marginY:1 ,
                      width: {
                        xs: "250px", 
                        sm: "450px", 
                      },}}
                  >
                    {errors.newPassword.message}
                  </Alert>
                )}
                <TextField
                  fullWidth
                  sx={{marginY:1}}
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    validate: validatePasswordMatch,
                  })}
                
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          onMouseDown={(e) => e.preventDefault()}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {errors.confirmPassword && (
                  <Alert
                    sx={{
                      marginY: 1,
                      width: {
                        xs: "250px", 
                        sm: "450px", 
                      },
                    }}
                    severity="error"
                  >
                    {errors.confirmPassword.message}
                  </Alert>
                )}
              </Box>
              <div className="text-center">
                <Button
                  variant="contained"
                  sx={{
                    width: "11em",
                    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
                    marginTop:2
                  }}
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </div>
            </form>
          </Box>
        </Grid>
      </Grid>
     
    </ThemeProvider>
  );
};

export default ChangePass;