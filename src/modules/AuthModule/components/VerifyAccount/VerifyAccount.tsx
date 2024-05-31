/* eslint-disable @typescript-eslint/no-explicit-any */
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import {Alert,Box,Button,CircularProgress,Container,FilledInput,
//   FormControl,Grid,IconButton,InputAdornment,Link,TextField,Typography
// } from "@mui/material";
// import { useState } from "react";
// import { Form, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import imgRegister from "../../../../assets/images/Register.png";
// import styleRegister from "../Register/Register.module.css";
// import { axiosInstance } from "../../../../axiosConfig/axiosInstance";
// import {useFormik} from 'formik';
// import * as Yup from 'yup';

// export default function Register() {
//    interface FormDataRegister {
//     userName: string;
//     email: string;
//     country: string;
//     phoneNumber: string;
//     password: string;
//     confirmPassword: string;
//     role: string;
//     profileImage: FileList;
//   }
  
//   const navigate = useNavigate();
//   const [loadingBtn, setLoadingBtn] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const validationSchema=Yup.object({
//     userName:Yup.string().max(15,"name should be less that 15").required("name is Required"),
//     email:Yup.string().email('Invalid email address').required('email is Required'),
//     password:Yup.string().matches(/^[A-z][a-z0-9]{5,8}$/,"Password should start with capital").required('Password is Required'),
//     confirmPassword:Yup.string().oneOf([Yup.ref("password")],"confirmPassword should match Password").required('Password is Required'),
//     phoneNumber:Yup.string().matches(/^01[0125][0-9]{8}$/,"Phone is invaild").required('Phone is Required'),
  
//   })

//   const register  = async (values: { userName: string; email: string; password: string; confirmPassword: string; country: string; phoneNumber: string; }, 
//     data: FormDataRegister) => {
//     setLoadingBtn(true);
// console.log(values);

//     try {
//       const formData = new FormData();

//       formData.append("userName", data.userName);
//       formData.append("email", data.email);
//       formData.append("country", data.country);
//       formData.append("phoneNumber", data.phoneNumber);
//       formData.append("password", data.password);
//       formData.append("confirmPassword", data.confirmPassword);
//       formData.append("role", "user");
//       if (data.profileImage && data.profileImage[0]) {
//         formData.append("profileImage", data.profileImage[0]);
//       }

//       const response = await axiosInstance.post(
//         "/admin/users",
//         formData
//       );
//           console.log(response);
//       toast.success("User created successfully");
//       navigate("/login");
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoadingBtn(false);
//     }
//   };

//   const formik=useFormik({
//     initialValues: {
//       userName:"",
//       email:"",
//       password:"",
//       confirmPassword:"",
//       country:"",
//       phoneNumber:"",
//   },
//   onSubmit:(values) => register(values:FormDataRegister),
//   validationSchema:validationSchema,
//   })

  

  
//   return (
//     <Container sx={{ my: 5 }}>
//       <Grid container spacing={3}>
//       <Grid item xs={12} md={6}>
//           <Typography
//             className={`${styleRegister.ConStay}`}
//             variant="h5"
//             component="h5"
//           >
//             <Box component="span" color="primary.main">
//               Stay
//             </Box>
//             cation.
//           </Typography>

//           <Typography sx={{ mt: 2 }} variant="h6" component="h6">
//             Sign up
//           </Typography>
//           <Typography variant="body1" gutterBottom>
//             If you already have an account register <br />
//             You can{" "}
//             <Link href="login" className="text-decoration-none">
//               {" "}
//               <Box
//         className={`${styleRegister.wordLogin}  `}
//                 component="span"
//                 color="#EB5148"
                
//               >
//                 Login here !
//               </Box>
//             </Link>
//           </Typography>
//           <Form onSubmit={formik.handleSubmit}>

//             {/* User Name */}
//           <FormControl sx={{ width: 1, mt: 1 }} variant="standard">
//               <label htmlFor="name">User Name</label>
//               <TextField
//                 hiddenLabel
//                 id="name"
//                 name="name"
//                 variant="filled"
//                 type="text"
//                 placeholder="Enter Your Name"
//                 value={formik.values.userName} 
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                             />
//                 {formik.errors.userName&&formik.touched.userName&&(
//                 <Alert sx={{ mt: 1 }} severity="error">
//                 {formik.errors.userName}
//                 </Alert>
//                )}

//             </FormControl>
//                  {/* PhoneNumber&country */}
//               <Grid container spacing={2}>
//                   {/* PhoneNumber */}
//               <Grid item xs={12} md={6}>
//                 <FormControl
//                   fullWidth
//                   sx={{ mt: 1 }}
//                   className={`${styleRegister.dBlock}`}
//                   variant="standard"
//                 >
//                   <label htmlFor="Phone">Phone Number</label>
//                   <TextField
//                     className={`${styleRegister.textField} `}
//                     hiddenLabel
//                     id="Phone"
//                     name="Phone"
//                     placeholder="Enter Your Phone Number"
//                     variant="filled"
//                     type="tel"
//                     value={formik.values.phoneNumber} 
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
                  
//                   />
//                 {formik.errors.phoneNumber&&formik.touched.phoneNumber&&(
//                 <Alert sx={{ mt: 1 }} severity="error">
//                 {formik.errors.phoneNumber}
//                 </Alert>
//                )}

//                 </FormControl>
//               </Grid>
//               {/* country */}
//               <Grid item xs={12} md={6}>
//                 <FormControl
//                   fullWidth
//                   sx={{ mt: 1 }}
//                   className={`${styleRegister.dBlock}`}
//                   variant="standard"
//                 >
//                   <label htmlFor="country">Country</label>
//                   <TextField
//                     className={`${styleRegister.textField} `}
//                     hiddenLabel
//                     id="country"
//                     name="country"
//                     placeholder="Enter Your Country"
//                     variant="filled"
//                     type="text"
//                     value={formik.values.country} 
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                   />
//               {formik.errors.country&&formik.touched.country&&(
//                 <Alert sx={{ mt: 1 }} severity="error">
//                 {formik.errors.country}
//                 </Alert>
//                 )}
//                 </FormControl>
//               </Grid>
//             </Grid>

//              {/* Email */}
//       <FormControl sx={{ width: 1, mt: 1 }} variant="standard">
//               <label htmlFor="Email">Email Address</label>
//               <TextField
//                 hiddenLabel
//                 id="Email"
//                 placeholder="Enter Your Email Address"
//                 variant="filled"
//                 type="email"
//                 value={formik.values.email} 
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
              
//               />
//               {formik.errors.email&&formik.touched.email&&(
//                 <Alert sx={{ mt: 1 }} severity="error">
//                 {formik.errors.email}
//                 </Alert>
//                 )}

//             </FormControl>
//             {/* password */}
//           <FormControl sx={{ width: 1, mt: 1 }} variant="standard">
//               <label htmlFor="Password">Password</label>
//               <FilledInput
//                 id="Password"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter Your Password "
//                 value={formik.values.password} 
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 endAdornment={
//                   <InputAdornment position="end">
//                     <IconButton
//                       aria-label="toggle password visibility"
//                       onClick={() => setShowPassword(!showPassword)}
//                       onMouseDown={(e) => e.preventDefault()}
//                       edge="end"
//                     >
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 }
//               />
//                 {formik.errors.password&&formik.touched.password&&(
//                 <Alert sx={{ mt: 1 }} severity="error">
//                 {formik.errors.password}
//                 </Alert>
//                )}
//             </FormControl>
//             {/* ConfirmPassword */}
//             <FormControl sx={{ width: 1, mt: 1, mb: 3 }} variant="standard">
//               <label htmlFor="ConfirmPassword">Confirm Password</label>
//               <FilledInput
//                 id="ConfirmPassword"
//                 type={showConfirmPassword ? "text" : "password"}
//                 placeholder="Enter Your Confirm Password "
//                 value={formik.values.confirmPassword} 
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}

//                 endAdornment={
//                   <InputAdornment position="end">
//                     <IconButton
//                       aria-label="toggle Confirm visibility"
//                       onClick={() =>
//                         setShowConfirmPassword(!showConfirmPassword)
//                       }
//                       onMouseDown={(e) => e.preventDefault()}
//                       edge="end"
//                     >
//                       {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 }
//               />
//               {formik.errors.confirmPassword&&formik.touched.confirmPassword&&(
//                 <Alert sx={{ mt: 1 }} severity="error">
//                 {formik.errors.confirmPassword}
//                 </Alert>
//                 )}
//                 </FormControl>
//             {/* Button */}
//             <Button
//               sx={{ width: 1 }}
//               variant="contained"
//               type="submit"
//               disabled={loadingBtn}
//             >
//               {loadingBtn ? <CircularProgress color="inherit" /> : "Sign up"}
//             </Button>
//               </Form>

// </Grid>

//       <Grid item xs={12} md={6}>
//           <img className={`${styleRegister.imgRe}`} src={imgRegister} alt="" />
//         </Grid>
//       </Grid>
//     </Container>
//   );

// }

// code 2

// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import {Alert,Box,Button,CircularProgress,Container,FilledInput,
//   FormControl,Grid,IconButton,InputAdornment,Link,TextField,Typography
// } from "@mui/material";
// import { useState } from "react";
// import { Form, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import imgRegister from "../../../../assets/images/Register.png";
// import styleRegister from "../Register/Register.module.css";
// import { axiosInstance } from "../../../../axiosConfig/axiosInstance";
// import {useFormik} from 'formik';
// import * as Yup from 'yup';

// export default function Register() {
//    interface FormDataRegister {
//     userName: string;
//     email: string;
//     country: string;
//     phoneNumber: string;
//     password: string;
//     confirmPassword: string;
//     role: string;
//     profileImage: FileList;
//   }
  
//   const navigate = useNavigate();
//   const [loadingBtn, setLoadingBtn] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const validationSchema=Yup.object({
//     userName:Yup.string().max(15,"name should be less that 15").required("name is Required"),
//     email:Yup.string().email('Invalid email address').required('email is Required'),
//     password:Yup.string().matches(/^[A-z][a-z0-9]{5,8}$/,"Password should start with capital").required('Password is Required'),
//     confirmPassword:Yup.string().oneOf([Yup.ref("password")],"confirmPassword should match Password").required('Password is Required'),
//     phoneNumber:Yup.string().matches(/^01[0125][0-9]{8}$/,"Phone is invaild").required('Phone is Required'),
  
//   })
//     function AppendToFormData(data: any) {
//   const formData = new FormData();
//   formData.append("userName", data.userName);
//   formData.append("email", data.email);
//   formData.append("country", data.country);
//   formData.append("phoneNumber", data.phoneNumber);
//   formData.append("password", data.password);
//   formData.append("confirmPassword", data.confirmPassword);
//   formData.append("role", "user");
//   if (data.profileImage && data.profileImage[0]) {
//     formData.append("profileImage", data.profileImage[0]);
//   }
//     }
//   const onSubmit  = async (values:any)=>{
    // const SubmitData = AppendToFormData(data);

//     setLoadingBtn(true);
// console.log(values);

//     try {

//       const response = await axiosInstance.post(
//         "/admin/users",
//             values
        // SubmitData
//       );
//           console.log(response);
//       toast.success("User created successfully");
//       navigate("/login");
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoadingBtn(false);
//     }
//   };
// const initialValues= {
//     userName:"",
//     email:"",
//     password:"",
//     confirmPassword:"",
//     country:"",
//     phoneNumber:"",
   
// }

//   const formik=useFormik({
//     initialValues,
//       onSubmit,
//   validationSchema:validationSchema,
//   })

  

  
//   return (
//     <Container sx={{ my: 5 }}>
//       <Grid container spacing={3}>
//       <Grid item xs={12} md={6}>
//           <Typography
//             className={`${styleRegister.ConStay}`}
//             variant="h5"
//             component="h5"
//           >
//             <Box component="span" color="primary.main">
//               Stay
//             </Box>
//             cation.
//           </Typography>

//           <Typography sx={{ mt: 2 }} variant="h6" component="h6">
//             Sign up
//           </Typography>
//           <Typography variant="body1" gutterBottom>
//             If you already have an account register <br />
//             You can{" "}
//             <Link href="login" className="text-decoration-none">
//               {" "}
//               <Box
//         className={`${styleRegister.wordLogin}  `}
//                 component="span"
//                 color="#EB5148"
                
//               >
//                 Login here !
//               </Box>
//             </Link>
//           </Typography>
//           <Form onSubmit={formik.handleSubmit}>

//             {/* User Name */}
//           <FormControl sx={{ width: 1, mt: 1 }} variant="standard">
//               <label htmlFor="name">User Name</label>
//               <TextField
//                 hiddenLabel
//                 id="name"
//                 name="userName"
//                 variant="filled"
//                 type="text"
//                 placeholder="Enter Your Name"
//                 value={formik.values.userName} 
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                             />
//                 {formik.errors.userName&&formik.touched.userName&&(
//                 <Alert sx={{ mt: 1 }} severity="error">
//                 {formik.errors.userName}
//                 </Alert>
//                )}

//             </FormControl>
//                  {/* PhoneNumber&country */}
//               <Grid container spacing={2}>
//                   {/* PhoneNumber */}
//               <Grid item xs={12} md={6}>
//                 <FormControl
//                   fullWidth
//                   sx={{ mt: 1 }}
//                   className={`${styleRegister.dBlock}`}
//                   variant="standard"
//                 >
//                   <label htmlFor="Phone">Phone Number</label>
//                   <TextField
//                     className={`${styleRegister.textField} `}
//                     hiddenLabel
//                     id="Phone"
//                     name="phoneNumber"
//                     placeholder="Enter Your Phone Number"
//                     variant="filled"
//                     type="tel"
//                     value={formik.values.phoneNumber} 
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
                  
//                   />
//                 {formik.errors.phoneNumber&&formik.touched.phoneNumber&&(
//                 <Alert sx={{ mt: 1 }} severity="error">
//                 {formik.errors.phoneNumber}
//                 </Alert>
//                )}

//                 </FormControl>
//               </Grid>
//               {/* country */}
//               <Grid item xs={12} md={6}>
//                 <FormControl
//                   fullWidth
//                   sx={{ mt: 1 }}
//                   className={`${styleRegister.dBlock}`}
//                   variant="standard"
//                 >
//                   <label htmlFor="country">Country</label>
//                   <TextField
//                     className={`${styleRegister.textField} `}
//                     hiddenLabel
//                     id="country"
//                     name="country"
//                     placeholder="Enter Your Country"
//                     variant="filled"
//                     type="text"
//                     value={formik.values.country} 
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                   />
//               {formik.errors.country&&formik.touched.country&&(
//                 <Alert sx={{ mt: 1 }} severity="error">
//                 {formik.errors.country}
//                 </Alert>
//                 )}
//                 </FormControl>
//               </Grid>
//             </Grid>

//              {/* Email */}
//       <FormControl sx={{ width: 1, mt: 1 }} variant="standard">
//               <label htmlFor="Email">Email Address</label>
//               <TextField
//                 hiddenLabel
//                 id="Email"
//                 name="email"
//                 placeholder="Enter Your Email Address"
//                 variant="filled"
//                 type="email"
//                 value={formik.values.email} 
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
              
//               />
//               {formik.errors.email&&formik.touched.email&&(
//                 <Alert sx={{ mt: 1 }} severity="error">
//                 {formik.errors.email}
//                 </Alert>
//                 )}

//             </FormControl>
//             {/* password */}
//           <FormControl sx={{ width: 1, mt: 1 }} variant="standard">
//               <label htmlFor="Password">Password</label>
//               <FilledInput
//                 id="Password"
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter Your Password "
//                 value={formik.values.password} 
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 endAdornment={
//                   <InputAdornment position="end">
//                     <IconButton
//                       aria-label="toggle password visibility"
//                       onClick={() => setShowPassword(!showPassword)}
//                       onMouseDown={(e) => e.preventDefault()}
//                       edge="end"
//                     >
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 }
//               />
//                 {formik.errors.password&&formik.touched.password&&(
//                 <Alert sx={{ mt: 1 }} severity="error">
//                 {formik.errors.password}
//                 </Alert>
//                )}
//             </FormControl>
//             {/* ConfirmPassword */}
//             <FormControl sx={{ width: 1, mt: 1, mb: 3 }} variant="standard">
//               <label htmlFor="ConfirmPassword">Confirm Password</label>
//               <FilledInput
//                 id="ConfirmPassword"
//                 name="confirmPassword"
//                 type={showConfirmPassword ? "text" : "password"}
//                 placeholder="Enter Your Confirm Password "
//                 value={formik.values.confirmPassword} 
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}

//                 endAdornment={
//                   <InputAdornment position="end">
//                     <IconButton
//                       aria-label="toggle Confirm visibility"
//                       onClick={() =>
//                         setShowConfirmPassword(!showConfirmPassword)
//                       }
//                       onMouseDown={(e) => e.preventDefault()}
//                       edge="end"
//                     >
//                       {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 }
//               />
//               {formik.errors.confirmPassword&&formik.touched.confirmPassword&&(
//                 <Alert sx={{ mt: 1 }} severity="error">
//                 {formik.errors.confirmPassword}
//                 </Alert>
//                 )}
//                 </FormControl>
//             {/* Button */}
//             <Button
//               sx={{ width: 1 }}
//               variant="contained"
//               type="submit"
//               disabled={loadingBtn}
//             >
//               {loadingBtn ? <CircularProgress color="inherit" /> : "Sign up"}
//             </Button>
//               </Form>

// </Grid>

//       <Grid item xs={12} md={6}>
//           <img className={`${styleRegister.imgRe}`} src={imgRegister} alt="" />
//         </Grid>
//       </Grid>
//     </Container>
//   );

// }