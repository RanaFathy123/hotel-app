/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { AuthContextType } from "../interfaces/Auth";


export const AuthContext = createContext<AuthContextType>({
  loginData: {
    userId: "" || 0,
    userName: "",
    userEmail: "",
    userGroup: "",
  },
  saveLoginData: () => {},
  resetLoginData:()=>{}
});
//  Context function
export default function AuthContextProvider(props: PropsWithChildren) {
  const [loginData, setLoginData] = useState(null);
  const saveLoginData = () => {
    let encodedData: any = localStorage.getItem("token");
    let decocodedData: any = jwtDecode(encodedData);
    setLoginData(decocodedData);
  };
  const resetLoginData =()=>{
    setLoginData(null)
  }
  const baseUrl="https://upskilling-egypt.com:3000/api";
  
  // console.log(userRole);
  
  const requestHeaders =
   {
    Authorization: ` ${localStorage.getItem("token")}`,
    
  };

  // call saveLogin data
  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveLoginData();
    }
  }, []);
  const value = { saveLoginData, loginData,resetLoginData,
baseUrl,
requestHeaders

   };
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}