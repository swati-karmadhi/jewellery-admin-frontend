import React from "react";
import { Box } from "@mui/material";
import { Breadcrumb, Container } from "../../../../components";
import { pageRoutes } from "../../../../constants/routesList";

const ShapeMaster = () => {
	return (
		<Container>
			<Box className="breadcrumb">
				<Breadcrumb
					routeSegments={[
						{ name: "Masters", path: pageRoutes.master.diamond.shape },
						{ name: "Diamonds", path: pageRoutes.master.diamond.shape },
						{ name: "Shape" },
					]}
				/>
			</Box>
		</Container>
	);
};

export default ShapeMaster;
