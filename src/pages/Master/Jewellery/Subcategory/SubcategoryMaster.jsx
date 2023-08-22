import React from "react";
import { Box } from "@mui/material";
import { Breadcrumb, Container } from "../../../../components";
import { pageRoutes } from "../../../../constants/routesList";

const SubcategoryMaster = () => {
	return (
		<Container>
			<Box className="breadcrumb">
				<Breadcrumb
					routeSegments={[
						{ name: "Masters", path: pageRoutes.master.jewellery.subcategory },
						{ name: "Jewellery", path: pageRoutes.master.jewellery.subcategory },
						{ name: "Subcategory" },
					]}
				/>
			</Box>
		</Container>
	);
};

export default SubcategoryMaster;
