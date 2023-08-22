import React from "react";
import { Box } from "@mui/material";
import { Breadcrumb, Container } from "../../../../components";
import { pageRoutes } from "../../../../constants/routesList";

const PermissionsMaster = () => {
	return (
		<Container>
			<Box className="breadcrumb">
				<Breadcrumb
					routeSegments={[
						{ name: "Masters", path: pageRoutes.master.user.permissions },
						{ name: "User", path: pageRoutes.master.user.permissions },
						{ name: "Permissions" },
					]}
				/>
			</Box>
		</Container>
	);
};

export default PermissionsMaster;
