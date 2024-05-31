import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import '@fortawesome/fontawesome-free';
import "./index.css";
import 'react-toastify/dist/ReactToastify.css';
import AuthContextProvider from "./context/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(

  <AuthContextProvider>
    <App />
  </AuthContextProvider>

);
