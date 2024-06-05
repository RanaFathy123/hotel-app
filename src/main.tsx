import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import AuthContextProvider from "./context/AuthContext.tsx";
import { ThemeProvider } from "styled-components";
import { createTheme } from "@mui/material";
const defaultTheme = createTheme();


ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={defaultTheme}>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </ThemeProvider>
);
