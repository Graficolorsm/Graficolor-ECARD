import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ECard } from "./components/ecard/ECard";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ECard />
  </StrictMode>,
);
