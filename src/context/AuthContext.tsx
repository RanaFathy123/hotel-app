/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { AuthContextType } from "../interfaces/interface";

export const AuthContext = createContext<AuthContextType>({
  loginData: {
    userId: "" || 0,
    userName: "",
    userEmail: "",
    userGroup: "",
  },
  saveLoginData: () => {},
  resetLoginData: () => {},
});
//  Context function
export default function AuthContextProvider(props: PropsWithChildren) {
  const [loginData, setLoginData] = useState(null);
  const saveLoginData = () => {
    let encodedData: any = localStorage.getItem("token");
    let decocodedData: any = jwtDecode(encodedData);
    setLoginData(decocodedData);
  };
  const requestHeaders =
  {
   Authorization: ` ${localStorage.getItem("token")}`,
   
 };
  const resetLoginData = () => {
    setLoginData(null);
  };

  // call saveLogin data
  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveLoginData();
    }
  }, []);
  const value = {requestHeaders, saveLoginData, loginData, resetLoginData};
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
