import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../axiosConfig/axiosInstance";
import { AuthContext } from "../context/AuthContext";
import { FormDataLogin } from "../interfaces/Auth";
import { toast } from "react-toastify";

const useLogin = () => {
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  const { saveLoginData } = React.useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormDataLogin>();
  const onSubmit: SubmitHandler<FormDataLogin> = async (data) => {
    setLoading(true);
    try {
      let response = await axiosInstance.post("/admin/users/login", data);
      const token = response.data.data.token;
      localStorage.setItem("token", token);
      saveLoginData();
      toast.success(response.data.message || "Login Success");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.response.data.message || "Login Fail");
      setLoading(false);
    }
  };

  function handleMouseDownPassword(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
  }
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    loading,
    showPassword,
    handleMouseDownPassword,
    handleClickShowPassword,
  };
};

export default useLogin;
