import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";

export default function PrivateRoute({ children }: any) {
  const { loginData } = useContext(AuthContext);
  console.log(loginData);

  if (localStorage.getItem("token") && loginData?.role == "admin") {
    return <Navigate to="/dashboard" />;
  } else if (localStorage.getItem("token") && loginData?.role == "user") {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}
