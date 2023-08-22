import styled from "@emotion/styled";
import { Fab } from "@mui/material";

export default styled(Fab)(() => ({
	position: "fixed",
	right: "30px",
	bottom: "80px",
	zIndex: 99,
	transition: "all 0.15s ease",
	"&.open": {
		right: "10px",
	},
}));