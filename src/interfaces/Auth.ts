
import { LoginData } from "../types/Auth";

export interface AuthContextType {
    loginData: LoginData | null;
    saveLoginData: () => void;
    resetLoginData:()=>void  
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
