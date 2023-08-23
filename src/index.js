import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material";
import App from "./App";

// third party style
import "perfect-scrollbar/css/perfect-scrollbar.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<StyledEngineProvider injectFirst>
		<BrowserRouter>
			<React.StrictMode>
			<App />
			</React.StrictMode>
		</BrowserRouter>
	</StyledEngineProvider>
);
