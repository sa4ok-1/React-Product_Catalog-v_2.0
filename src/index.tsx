import { createRoot } from "react-dom/client";
import { Root } from "./Root";
import "normalize.css";
import "./i18n/i18";

const container = document.getElementById("root") as HTMLElement;

createRoot(container).render(
  <>
    <Root />
  </>
);
