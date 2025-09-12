import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import HomePage from "./pages/home/index.jsx";
import "./styles/tailwind.css";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<HomePage />
	</StrictMode>,
);
