import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, TextField, ThemeProvider, createTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as React from "react";
import { toast } from "react-toastify";
import { axiosInstanceWithHeaders } from "../../../../axiosConfig/axiosInstance";
import { FormChangePass } from "../../../../interfaces/Auth";
import { useNavigate } from "react-router-dom";
import { validationSchema } from "../../../../validations/validations";


const defaultTheme = createTheme();

const ChangePass = () => {
  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const navigate = useNavigate()

  const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);
  const handleMouseDownOldPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleMouseDownNewPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleMouseDownConfirmPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 8,
    p: 4,
  };
  const initialValues: FormChangePass = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
   
  };

  async function onSubmit(values: FormChangePass) {
    try {
      let response = await axiosInstanceWithHeaders.post(
        `admin/users/change-password`,
        values
      );
      toast.success('Your Password has changed successfully' || response?.data?.message)
      navigate('/login')
    } catch (error:any) {
      toast.error("there's an eror" || error?.response?.data?.message)

    }
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  });


  return (
    <ThemeProvider theme={defaultTheme}>
          <Box sx={style}>
          <h1 className="p-5 text-4xl font-serif font-bold text-center" >
            <span className="text-[#152C5B] font-[4rem]" >Stay</span>cation.
          </h1>
            <Typography
              id="transition-modal-title"
              style={{color:'#152C5B' , fontSize:'1.4rem'}}
              
            >
              Change Your Password
            </Typography>
            <p className="text-slate-500">Enter your details below</p>
            <form onSubmit={formik.handleSubmit}>
              <Box  sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  style={{ marginBottom: "16px" }}
                  id="oldPassword"
                  name="oldPassword"
                  label="Old Password"
                  type={showOldPassword ? "text" : "password"}
                  value={formik.values.oldPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
                  helperText={
                    formik.touched.oldPassword && formik.errors.oldPassword
                  }
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={handleClickShowOldPassword}
                        onMouseDown={handleMouseDownOldPassword}
                        edge="end"
                      >
                        {showOldPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  id="newPassword"
                  name="newPassword"
                  style={{ marginBottom: "16px" }}
                  label="New Password"
                  type={showNewPassword ? "text" : "password"}
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.newPassword &&
                    Boolean(formik.errors.newPassword)
                  }
                  helperText={
                    formik.touched.newPassword && formik.errors.newPassword
                  }
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={handleClickShowNewPassword}
                        onMouseDown={handleMouseDownNewPassword}
                        edge="end"
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  id="confirmPassword"
                  name="confirmPassword"
                  style={{ marginBottom: "16px" }}
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.confirmPassword &&
                    Boolean(formik.errors.confirmPassword)
                  }
                  helperText={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    ),
                  }}
                />
              </Box>
              <div className="text-center">
                <Button
                  style={{
                    backgroundColor: "#3252DF",
                    color: "white",
                    width: "11em",
                    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
                  }}
                 disabled={formik.isSubmitting || ! formik.isValid|| ! formik.dirty}
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </form>
          </Box>
    </ThemeProvider>
  );
};

export default ChangePass;
