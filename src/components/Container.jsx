import styled from "@emotion/styled";

export default styled("div")(({ theme }) => ({
	margin: "30px",
	[theme.breakpoints.down("sm")]: { margin: "16px" },
	"& .breadcrumb": {
		marginBottom: "30px",
		[theme.breakpoints.down("sm")]: { marginBottom: "16px" },
	},
}));