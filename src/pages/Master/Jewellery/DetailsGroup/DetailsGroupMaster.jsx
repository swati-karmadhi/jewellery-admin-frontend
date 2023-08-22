import React from "react";
import { Box } from "@mui/material";
import { Breadcrumb, Container } from "../../../../components";
import { pageRoutes } from "../../../../constants/routesList";

const DetailsGroupMaster = () => {
	return (
		<Container>
			<Box className="breadcrumb">
				<Breadcrumb
					routeSegments={[
						{ name: "Masters", path: pageRoutes.master.jewellery.detailsGroup },
						{ name: "Jewellery", path: pageRoutes.master.jewellery.detailsGroup },
						{ name: "Details Group" },
					]}
				/>
			</Box>
		</Container>
	);
};

export default DetailsGroupMaster;
