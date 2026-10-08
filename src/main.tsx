import { createRoot } from "react-dom/client";
import { installBrowserValidation } from "@workspace/api-client-react/form-security";
import App from "./App";
import "./index.css";
installBrowserValidation();

createRoot(document.getElementById("root")!).render(<App />);
