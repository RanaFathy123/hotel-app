/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import {
//   Alert,
//   Button,
//   Checkbox,
//   CircularProgress,
//   Container,
//   FormControl,
//   Grid,
//   InputLabel,
//   ListItemText,
//   MenuItem,
//   Select,
//   Stack,
//   TextField
// } from "@mui/material";
// import { Form, useLocation, useNavigate } from "react-router-dom";
// import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";
// import { useContext, useEffect, useState } from "react";
// import { contextfacilit } from "../../../../context/RoomFacilityContext";

// interface FormData {
//   roomNumber: string;
//   price: string;
//   capacity: string;
//   discount: string;
//   imgs: FileList;
//   facilities: string[];
// }

// export default function RoomsData() {
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const { ListFacility, getFacility } = useContext(contextFacility);

//   // upload img
//   const [fileInputContent, setFileInputContent] = useState(
//     "Drag & Drop or Choose a Item Image to Upload",
//   );
//   const handleInputContent = () => {
//     setFileInputContent("File Uploaded Successfully");
//   };
// const location=useLocation();
// console.log(location);
// const status = location.state?.type==='edit'
// const RoomData=location.state?.RoomData;
// // const[facilitiesId,setFacilitiesId]=useState([])

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors },
//   } = useForm<FormData>();

//   const goBack = () => {
//     navigate(-1);
//   };

//   const appendToFormData = (data: FormData) => {
//     const formData = new FormData();
//     formData.append("roomNumber", data?.roomNumber);
//     formData.append("price", data?.price);
//     formData.append("capacity", data?.capacity);
//     formData.append("discount", data?.discount);
//     formData.append("imgs",data?.imgs[0]);
//     if (Array.isArray(data.facilities)) {
//       data.facilities.forEach((facility) => {
//         formData.append("facilities[]", facility);
//       });
//     }
//     return formData;
//   };
 
//   const onSubmit = async (data: FormData) => {
//     setIsLoading(true);
//     if (
//       data.discount &&
//       data.price &&
//       parseInt(data.discount) > parseInt(data.price)
//     ) {
//       setValue("discount", "", { shouldValidate: true });
//       setValue("discount", data.discount, { shouldValidate: true });
//       toast.error("Discount cannot be greater than the price.");
//       setIsLoading(false);
//       return;
//     }

//     if (
//       data.discount !== undefined &&
//       (parseInt(data.discount) < 0 || parseInt(data.discount) > 100)
//     ) {
//       toast.error("Discount must be between 0 and 100.");
//       setIsLoading(false);
//       return;
//     }

//     const RoomFormData = appendToFormData(data);
//     const token = localStorage.getItem("token");
//     if (!token) {
//       throw new Error("User is not authenticated");
//     }
//     setIsLoading(true);
//     try {
//       const response = await axios(
//         {
//           method:status?'put':'post',
//           url:status?`https://upskilling-egypt.com:3000/api/v0/admin/rooms/${RoomData.id}`:
//           `https://upskilling-egypt.com:3000/api/v0/admin/rooms`,
//           data:RoomFormData,
//         headers:{ Authorization: ` ${localStorage.getItem("token")}`,
//         },
    
//         }
//       );
//       console.log(response);
//       toast.success(`You Added a New Room`);
//       navigate("/dashboard/rooms");
//     } catch (error: any) {
//       if (error.response) {
//         toast.error(error.response.data.message);
//       } else {
//         console.log(error);
//         toast.error("You Can't Add New Room");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   useEffect(() => {
//     getFacility()
//   }, [])
//   return <>
 
//       <Container >
//       <Grid item xs={12} md={6} >

//         <Form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)} >
//           <FormControl sx={{ mt: 5, display: "block" }} variant="standard">
//             <TextField
//               sx={{ width: 1, mb: 3 }}
//               hiddenLabel
//               id="roomNumber"
//               variant="filled"
//               type="text"
//               placeholder="Room Number"
//               {...register("roomNumber", {
//                 required: "Room Number is required",
//               })}
//             />
//             {errors.roomNumber && (
//               <Alert sx={{mb:2 }} severity="error">
//                 {errors.roomNumber.message}
//               </Alert>
//             )}

//             <Grid container spacing={3}>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   sx={{ width: 1, mb: 3 }}
//                   hiddenLabel
//                   id="price"
//                   variant="filled"
//                   type="number"
//                   placeholder="Price"
//                   {...register("price", {
//                     required: "Price is required",
//                   })}
//                 />
//                 {errors.price && (
//                   <Alert sx={{ mb: 2 }} severity="error">
//                     {errors.price.message}
//                   </Alert>
//                 )}
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <TextField
//                   sx={{ width: 1, mb: 3 }}
//                   hiddenLabel
//                   id="capacity"
//                   variant="filled"
//                   type="number"
//                   placeholder="Capacity"
//                   {...register("capacity", {
//                     required: "Capacity is required",
//                   })}
//                 />
//                 {errors.capacity && (
//                   <Alert sx={{ mb: 2 }} severity="error">
//                     {errors.capacity.message}
//                   </Alert>
//                 )}
//               </Grid>
//             </Grid>

//             <Grid container spacing={3}>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   sx={{ width: 1, mb: 3 }}
//                   hiddenLabel
//                   id="discount"
//                   variant="filled"
//                   type="number"
//                   placeholder="Discount"
//                   {...register("discount", {
//                     required: "Discount is required",
//                   })}
//                 />
//                 {errors.discount && (
//                   <Alert sx={{ mb: 2 }} severity="error">
//                     {errors.discount.message}
//                   </Alert>
//                 )}
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <FormControl  fullWidth>
//                   <InputLabel id="facilities-label">Facilities</InputLabel>
//                   <Select
//                     labelId="facilities-label"
//                     id="facilities"
//                     label="facilities"
//                     multiple
//                     value={watch("facilities") || []}
//                     onChange={(e:any) =>
//                       setValue("facilities", e.target.value, {
//                         shouldValidate: true,
//                       })
//                     }
//                     sx={{ width: "100%" }}
//                     renderValue={(selected) => (
//                       <div>
//                         {selected.map((value:any) => (
//                           <span key={value} style={{ marginRight: "8px" }}>
//                             {ListFacility.find(
//                               (facility) => facility._id === value
//                             )?.name || ""}
//                           </span>
//                         ))}
//                       </div>
//                     )}
//                     // {...register("facilities", {
//                     //   required: "facilities is required",
//                     // })}
//                   >
//                     {ListFacility.map((facility) => (
//                       <MenuItem key={facility._id} value={facility._id}>
//                         <Checkbox
//                           checked={watch("facilities")?.includes(facility._id)}
//                         />
//                         <ListItemText primary={facility.name} />
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//                 {errors.facilities && (
//                 <Alert sx={{ mb: 2,mt:3 }} severity="error">
//                   {errors.facilities.message?.toString()}
//                 </Alert>
//               )}

//               </Grid>
//             </Grid>
//       {/* Upload Img */}
// <FormControl sx={{ mb: 2  }} fullWidth>
//               <Grid sx={{mt:1,position:"relative",
//               display:"flex",alignItems:"center",
//               borderBlockColor:"rgba(50, 82, 223, 0.8)",
//               borderLeftColor:"rgba(50, 82, 223, 0.8)",
//               borderRightColor:"rgba(50, 82, 223, 0.8)",
//               borderWidth:"2px",borderStyle:"dashed",
//               padding:"25px",borderRadius:"5px",
//               backgroundColor:"rgba(50, 82, 223, 0.1)",
//               paddingLeft:"38%"
//               }}>
//                 <label  htmlFor="uploadFile">
//                   <Grid sx={{ display:"flex",width:1,flexDirection:"column",justifyContent:"center" ,alignItems:"center"    }}>
//                     <DriveFolderUploadIcon />
//                     <Grid sx={{m:2,fontWeight:"bold"}} >{fileInputContent}</Grid>
//                   </Grid>
//                  <Grid 
//                  sx={{
//                   display:"block",
//                   position:"absolute",
//                   opacity:0,
//                   pointerEvents:"none",
//                  }}
//                  >
//                   <input
//                     type="file"
//                     accept=".jpg,.png"
//                     id="uploadFile"
//                     {...register("imgs", {
//                       required: "imgs is Required",
//                     })}
//                     onChange={handleInputContent}                    
//                     />
//                     </Grid>
//                 </label>
//               </Grid>
//               {errors.imgs && (
//                 <Alert sx={{ mb: 2,mt:1 }} severity="error">
//                   {errors.imgs.message?.toString()}
//                 </Alert>
//               )}
//             </FormControl>
//             <Grid container justifyContent="flex-end" mt={5}>
//               <Grid item xs={12} md={3}>
//                 <Stack direction="row" spacing={2} alignItems="center">
//                   <Button variant="outlined" onClick={goBack} sx={{color:" rgba(32, 63, 199, 1)",borderColor:" rgba(32, 63, 199, 1)",paddingX:"30px"}}>
//                     Cancel
//                   </Button>
//                   <Button type="submit" variant="contained" sx={{bgcolor:" rgba(32, 63, 199, 1)",paddingX:"20px"}}>
//                     {isLoading ? <CircularProgress size={25} color="inherit" /> : "Save"}
//                   </Button>
//                 </Stack>
//               </Grid>
//             </Grid>
//           </FormControl>
//         </Form>
//         </Grid>
//       </Container>
//     </>  
// }



/* eslint-disable @typescript-eslint/no-explicit-any */
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { contextFacility } from "../../../../context/RoomFacilityContext";
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

interface FormData {
  roomNumber: string;
  price: string;
  capacity: string;
  discount: string;
  imgs: FileList;
  facilities: string[];
}

export default function RoomsData() {
  const { ListFacility, getFacility } = useContext(contextFacility);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // upload img
  const [fileInputContent, setFileInputContent] = useState(
    "Drag & Drop or Choose a Item Image to Upload",
  );
  const handleInputContent = () => {
    setFileInputContent("File Uploaded Successfully");
  };
const location=useLocation();
console.log(location);
const status = location.state?.type==='edit'
const RoomData=location.state?.RoomData;
const {
  register,
  handleSubmit,
  setValue,
  watch,
  formState: { errors },
} = useForm<FormData>();


  const goBack = () => {
    navigate(-1);
  };

  const appendToFormData = (data: FormData) => {
    const formData = new FormData();
    formData.append("roomNumber", data?.roomNumber);
    formData.append("price", data?.price);
    formData.append("capacity", data?.capacity);
    formData.append("discount", data?.discount);
    formData.append("imgs",data?.imgs[0]);
    if (Array.isArray(data.facilities)) {
      data.facilities.forEach((facility) => {
        formData.append("facilities[]", facility);
      });
    }
    return formData;
  };

    

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    if (
      data.discount &&
      data.price &&
      parseInt(data.discount) > parseInt(data.price)
    ) {
      setValue("discount", "", { shouldValidate: true });
      setValue("discount", data.discount, { shouldValidate: true });
      toast.error("Discount cannot be greater than the price.");
      setIsLoading(false);
      return;
    }

    if (
      data.discount !== undefined &&
      (parseInt(data.discount) < 0 || parseInt(data.discount) > 100)
    ) {
      toast.error("Discount must be between 0 and 100.");
      setIsLoading(false);
      return;
    }

    const RoomFormData = appendToFormData(data);
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User is not authenticated");
    }
    setIsLoading(true);
    try {
      const response = await axios(
        {
          method:status?'put':'post',
          url:status?`https://upskilling-egypt.com:3000/api/v0/admin/rooms/${RoomData.id}`:
          `https://upskilling-egypt.com:3000/api/v0/admin/rooms`,
          data:RoomFormData,
        headers:{ Authorization: ` ${localStorage.getItem("token")}`,
        },
    
        }
      );
      console.log(response);
      toast.success(`You Added a New Room`);
      navigate("/dashboard/rooms");
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
        toast.error("You Can't Add New Room");
      }
    } finally {
      setIsLoading(false);
    }
};

  useEffect(() => {
    getFacility()
  
  
  }, [])
  

  return (
    <>
      <Container>
        <Form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
          <FormControl sx={{ mt: 4, display: "block" }} variant="standard">
            <TextField
              sx={{ width: 1, mb: 4 }}
              hiddenLabel
              id="roomNumber"
              variant="filled"
              type="text"
              placeholder="Room Number"
              {...register("roomNumber", {
                required: "Room Number is required",
              })}
            />
            {errors.roomNumber && (
              <Alert sx={{ mt: 1 }} severity="error">
                {errors.roomNumber.message}
              </Alert>
            )}

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  sx={{ width: 1, mb: 4 }}
                  hiddenLabel
                  id="price"
                  variant="filled"
                  type="number"
                  placeholder="Price"
                  {...register("price", {
                    required: "Price is required",
                  })}
                />
                {errors.price && (
                  <Alert sx={{ mt: 1 }} severity="error">
                    {errors.price.message}
                  </Alert>
                )}
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  sx={{ width: 1, mb: 4 }}
                  hiddenLabel
                  id="capacity"
                  variant="filled"
                  type="number"
                  placeholder="Capacity"
                  {...register("capacity", {
                    required: "Capacity is required",
                  })}
                />
                {errors.capacity && (
                  <Alert sx={{ mt: 1 }} severity="error">
                    {errors.capacity.message}
                  </Alert>
                )}
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  sx={{ width: 1, mb: 4 }}
                  hiddenLabel
                  id="discount"
                  variant="filled"
                  type="number"
                  placeholder="Discount"
                  {...register("discount", {
                    required: "Discount is required",
                  })}
                />
                {errors.discount && (
                  <Alert sx={{ mt: 1 }} severity="error">
                    {errors.discount.message}
                  </Alert>
                )}
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl  fullWidth>
                  <InputLabel id="facilities-label">Facilities</InputLabel>
                  <Select
                    labelId="facilities-label"
                    id="facilities"
                    label="facilities"
                    multiple
                    value={watch("facilities") || []}
                    onChange={(e:any) =>
                      setValue("facilities", e.target.value, {
                        shouldValidate: true,
                      })
                    }
                    sx={{ width: "100%" }}
                    renderValue={(selected) => (
                      <div>
                        {selected.map((value) => (
                          <span key={value} style={{ marginRight: "8px" }}>
                            {ListFacility.find(
                              (facility:any) => facility._id === value
                            )?.name || ""}
                          </span>
                        ))}
                      </div>
                    )}
                  >
                    {ListFacility.map((facilit:any) => (
                      <MenuItem key={facilit._id} value={facilit._id}>
                        <Checkbox
                          checked={watch("facilities")?.includes(facilit._id)}
                        />
                        <ListItemText primary={facilit.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {errors.facilities && (
                  <Alert sx={{ mt: 1 }} severity="error">
                    {errors.facilities.message}
                  </Alert>
                )}
              </Grid>
            </Grid>
{/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

{/* Upload Img */}
 <FormControl sx={{ mb: 2  }} fullWidth>
              <Grid sx={{mt:1,position:"relative",
              display:"flex",alignItems:"center",
              borderBlockColor:"rgba(50, 82, 223, 0.8)",
              borderLeftColor:"rgba(50, 82, 223, 0.8)",
              borderRightColor:"rgba(50, 82, 223, 0.8)",
              borderWidth:"2px",borderStyle:"dashed",
              padding:"25px",borderRadius:"5px",
              backgroundColor:"rgba(50, 82, 223, 0.1)",
              paddingLeft:"38%"
              }}>
                <label  htmlFor="uploadFile">
                  <Grid sx={{ display:"flex",width:1,flexDirection:"column",justifyContent:"center" ,alignItems:"center"    }}>
                    <DriveFolderUploadIcon />
                    <Grid sx={{m:2,fontWeight:"bold"}} >{fileInputContent}</Grid>
                  </Grid>
                 <Grid 
                 sx={{
                  display:"block",
                  position:"absolute",
                  opacity:0,
                  pointerEvents:"none",
                 }}
                 >
                  <input
                    type="file"
                    accept=".jpg,.png"
                    id="uploadFile"
                    {...register("imgs", {
                      required: "imgs is Required",
                    })}
                    onChange={handleInputContent}                    
                    />
                    </Grid>
                </label>
              </Grid>
              {errors.imgs && (
                <Alert sx={{ mb: 2,mt:1 }} severity="error">
                  {errors.imgs.message?.toString()}
                </Alert>
              )}
            </FormControl>
            <Grid container justifyContent="flex-end" mt={5}>
              <Grid item xs={12} md={3}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Button variant="outlined" onClick={goBack} sx={{color:" rgba(32, 63, 199, 1)",borderColor:" rgba(32, 63, 199, 1)",paddingX:"30px"}}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained" sx={{bgcolor:" rgba(32, 63, 199, 1)",paddingX:"20px"}}>
                    {isLoading ? <CircularProgress size={25} color="inherit" /> : "Save"}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </FormControl>
        </Form>
      </Container>
    </>
  );
}
