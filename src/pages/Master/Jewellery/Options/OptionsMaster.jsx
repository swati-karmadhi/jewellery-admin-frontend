import React from "react";
import { Box } from "@mui/material";
import { Breadcrumb, Container } from "../../../../components";
import { pageRoutes } from "../../../../constants/routesList";

const OptionMaster = () => {
	return (
		<Container>
			<Box className="breadcrumb">
				<Breadcrumb
					routeSegments={[
						{ name: "Masters", path: pageRoutes.master.jewellery.options },
						{ name: "Jewellery", path: pageRoutes.master.jewellery.options },
						{ name: "Option" },
					]}
				/>
			</Box>
		</Container>
	);
};

export default OptionMaster;
