import { LoginData } from "../types/Auth";

export interface AuthContextType {
  loginData: LoginData | null;
  saveLoginData: () => void;
  resetLoginData: () => void;
}

export interface FormDataRegister {
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  role: string;
  profileImage: FileList;
}

export interface FormValuesLogin {
  password: string;
  email: string;
}

export interface FormDataResetPass {
  email: string;
  seed: string;
  password: string;
  confirmPassword: string;
}

export interface FormValuesForgetPass {
  email: string;
}
export interface FormChangePass {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;

