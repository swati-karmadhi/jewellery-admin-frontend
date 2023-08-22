import React from "react";
import { Box } from "@mui/material";
import { Breadcrumb, Container } from "../../../../components";
import { pageRoutes } from "../../../../constants/routesList";

const CategoryMaster = () => {
	return (
		<Container>
			<Box className="breadcrumb">
				<Breadcrumb
					routeSegments={[
						{ name: "Masters", path: pageRoutes.master.jewellery.category },
						{ name: "Jewellery", path: pageRoutes.master.jewellery.category },
						{ name: "Category" },
					]}
				/>
			</Box>
		</Container>
	);
};

export default CategoryMaster;
