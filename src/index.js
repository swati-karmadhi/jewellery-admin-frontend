import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material";
import App from "./App";
import { ToastContainer } from "react-toastify";
// third party style
import "perfect-scrollbar/css/perfect-scrollbar.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<StyledEngineProvider injectFirst>
		<BrowserRouter>
			<React.StrictMode>
			<ToastContainer/>
			<App />
			</React.StrictMode>
		</BrowserRouter>
	</StyledEngineProvider>
);
