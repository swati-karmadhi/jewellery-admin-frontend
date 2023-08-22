import React from "react";
import { Box } from "@mui/material";
import { Breadcrumb, Container } from "../../components";

const Customer = () => {
	return (
		<Container>
			<Box className="breadcrumb">
				<Breadcrumb routeSegments={[{ name: "Customer" }]} />
			</Box>
		</Container>
	);
};

export default Customer;
