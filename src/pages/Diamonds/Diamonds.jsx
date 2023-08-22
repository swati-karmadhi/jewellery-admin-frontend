import React from "react";
import { Box } from "@mui/material";
import { Breadcrumb, Container } from "../../components";

const Diamonds = () => {
	return (
		<Container>
			<Box className="breadcrumb">
				<Breadcrumb routeSegments={[{ name: "Diamonds" }]} />
			</Box>
		</Container>
	);
};

export default Diamonds;
