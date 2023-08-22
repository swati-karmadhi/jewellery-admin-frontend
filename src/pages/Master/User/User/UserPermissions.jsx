import React from "react";
import { Box } from "@mui/material";
import { Breadcrumb, Container } from "../../../../components";
import { pageRoutes } from "../../../../constants/routesList";

const UserPermissionsMaster = () => {
	return (
		<Container>
			<Box className="breadcrumb">
				<Breadcrumb
					routeSegments={[
						{ name: "Masters", path: pageRoutes.master.user.user },
						{ name: "User", path: pageRoutes.master.user.user },
						{ name: "User Permissions" },
					]}
				/>
			</Box>
		</Container>
	);
};

export default UserPermissionsMaster;
