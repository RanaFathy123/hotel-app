import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import '@fortawesome/fontawesome-free';
import "./index.css";
import 'react-toastify/dist/ReactToastify.css';
import AuthContextProvider from "./context/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>

);
