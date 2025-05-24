import { createRoot } from "react-dom/client";
import "./index.css";
import { AppRoutes } from "./AppRoutes.tsx";

createRoot(document.getElementById("root")!).render(<AppRoutes />);
