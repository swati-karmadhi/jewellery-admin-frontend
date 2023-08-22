import React from "react";
import { Box } from "@mui/material";
import { Breadcrumb, Container } from "../../../../components";
import { pageRoutes } from "../../../../constants/routesList";

const DetailsMaster = () => {
	return (
		<Container>
			<Box className="breadcrumb">
				<Breadcrumb
					routeSegments={[
						{ name: "Masters", path: pageRoutes.master.jewellery.details },
						{ name: "Jewellery", path: pageRoutes.master.jewellery.details },
						{ name: "Details" },
					]}
				/>
			</Box>
		</Container>
	);
};

export default DetailsMaster;
