import React from "react";
import { Box } from "@mui/material";
import { Breadcrumb, Container } from "../../components";

const Jewellery = () => {
	return (
		<Container>
			<Box className="breadcrumb">
				<Breadcrumb routeSegments={[{ name: "Jewellery" }]} />
			</Box>
		</Container>
	);
};

export default Jewellery;
