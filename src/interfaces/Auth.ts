import { LoginData } from "../types/Auth";

export interface AuthContextType {
    loginData: LoginData | null;
    saveLoginData: () => void;
    resetLoginData:()=>void  
  }