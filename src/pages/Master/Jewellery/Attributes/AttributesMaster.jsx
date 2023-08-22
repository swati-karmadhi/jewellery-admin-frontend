import React from "react";
import { Box } from "@mui/material";
import { Breadcrumb, Container } from "../../../../components";
import { pageRoutes } from "../../../../constants/routesList";

const AttributesMaster = () => {
	return (
		<Container>
			<Box className="breadcrumb">
				<Breadcrumb
					routeSegments={[
						{ name: "Masters", path: pageRoutes.master.jewellery.attributes },
						{ name: "Jewellery", path: pageRoutes.master.jewellery.attributes },
						{ name: "Attributes" },
					]}
				/>
			</Box>
		</Container>
	);
};

export default AttributesMaster;
