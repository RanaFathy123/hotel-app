import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import {
  Alert,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstanceWithHeaders } from "../../../../axiosConfig/axiosInstance";

interface FormData {
  roomNumber: string;
  price: string;
  capacity: string;
  discount: string;
  imgs: FileList;
  facilities: string;
}

export default function RoomsData() {
  const [ListFacility, setListFacility] = useState([]);
  const [facilityvalue, setFacilityValue] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fileInputContent, setFileInputContent] = useState(
    "Drag & Drop or Choose a Item Image to Upload"
  );
  const navigate = useNavigate();
  const location = useLocation();
  const item = location?.state?.item;
  const type = location?.state?.type;
  console.log(facilityvalue);

  const handleInputContent = () => {
    setFileInputContent("Files Uploaded Successfully");
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
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
    const images = data?.imgs;
    if (images && images.length > 0) {
      for (const image of images) {
        formData.append("imgs", image);
      }
    }
    const facilities = facilityvalue;
    for (const facility of facilities) {
      formData.append("facilities[]", facility);
    }
    return formData;
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    toast.warning("Please Wait It Will Takes Time");
    const RoomFormData = appendToFormData(data);
    try {
      const response = await axiosInstanceWithHeaders({
        method: type === "edit" ? "put" : "post",
        url: type === "edit" ? `/admin/rooms/${item._id}` : `/admin/rooms`,
        data: RoomFormData,
      });
      console.log(response);
      type === "edit"
        ? toast.success(response.data.message || `You Updated a Room`)
        : toast.success(response.data.message || `You Added a New Room`);
      navigate("/dashboard/rooms-list");
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
  const getFacility = async () => {
    try {
      const response = await axiosInstanceWithHeaders.get(
        "/admin/room-facilities?pageSize=10&pageNumber=1"
      );
      setListFacility(response?.data?.data?.facilities);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getFacility();
    if (type && item) {
      setValue("roomNumber", item.roomNumber);
      setValue("price", item.price);
      setValue("capacity", item.capacity);
      setValue("discount", item.discount);
      const facilityId = item.facilities.map((facility: any) => {
        return facility._id;
      });

      setFacilityValue(facilityId);
    }
  }, []);
  console.log(facilityvalue);

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
                <FormControl fullWidth>
                  <InputLabel id="facilities-label">Facilities</InputLabel>
                  <Select
                    value={facilityvalue}
                    labelId="facilities-label"
                    multiple
                    id="facilities"
                    label="facilities"
                    {...register("facilities")}
                    sx={{ width: "100%" }}
                    onChange={(e: any) => setFacilityValue(e.target.value)}
                  >
                    {ListFacility.map((facility: any) => (
                      <MenuItem key={facility._id} value={facility._id}>
                        <ListItemText primary={facility.name} />
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
            <FormControl sx={{ mb: 2 }} fullWidth>
              <Grid
                sx={{
                  mt: 1,
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  borderBlockColor: "rgba(50, 82, 223, 0.8)",
                  borderLeftColor: "rgba(50, 82, 223, 0.8)",
                  borderRightColor: "rgba(50, 82, 223, 0.8)",
                  borderWidth: "2px",
                  borderStyle: "dashed",
                  padding: "25px",
                  borderRadius: "5px",
                  backgroundColor: "rgba(50, 82, 223, 0.1)",
                  paddingLeft: "38%",
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
                      multiple
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
                <Alert sx={{ mb: 2, mt: 1 }} severity="error">
                  {errors.imgs.message?.toString()}
                </Alert>
              )}
            </FormControl>
            <Grid container justifyContent="flex-end" mt={5}>
              <Grid item xs={12} md={3}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Button
                    variant="outlined"
                    onClick={goBack}
                    sx={{
                      color: " rgba(32, 63, 199, 1)",
                      borderColor: " rgba(32, 63, 199, 1)",
                      paddingX: "30px",
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    sx={{ bgcolor: " rgba(32, 63, 199, 1)", paddingX: "20px" }}
                  >
                    {isLoading ? (
                      <CircularProgress size={25} color="inherit" />
                    ) : (
                      "Save"
                    )}
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
