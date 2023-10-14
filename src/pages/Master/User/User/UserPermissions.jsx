import React, { useEffect, useState } from "react";
import { Box, Icon, IconButton, TableBody, TableCell, TableHead, TableRow, Tooltip } from "@mui/material";
import { Android12Switch, Breadcrumb, Container, SimpleCard, StyledAddButton, StyledTable } from "../../../../components";
import { apiEndPoint, pageRoutes } from "../../../../constants/routesList";
import { useParams } from "react-router-dom";
import { API, HELPER } from "../../../../services";
import AddUserPermissions from "./AddUserPermissions";

const UserPermissionsMaster = () => {
	const params = useParams();
	const [userPermissions, setUserPermissions] = useState({});
	const [open, setOpen] = useState(false);
	const url = apiEndPoint.userPermission;

	const getTableData = () => {
		API.get(`${url}/${params.id}`).then((response) => setUserPermissions(response));
	};

	useEffect(() => {
		if (params.id) {
			getTableData();
		}
	}, [params]);

	const handleDelete = (id) => {
		HELPER.sweetAlert.delete().then(() => {
			API.destroy(`${url}/${id}`)
				.then(() => {
					HELPER.toaster.success("Record Deleted");
					getTableData();
				})
				.catch((e) => HELPER.toaster.error("Error " + e));
		});
	};

	const togglePopup = () => {
		// if (open) {
		// 	getTableData();
		// }
		setOpen(!open);
	};

	const handleToggle = (id, name, value) => {
		API.put(`${url}/${id}/toggle`, { [name]: value })
			.then((response) => {
				HELPER.toaster.success(response.message);
				getTableData();
			})
			.catch((e) => HELPER.toaster.error("Error " + e));
	};

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
			{Object.keys(userPermissions).map((group, i) => (
				<SimpleCard key={i} title={group} sx={{ mb: 2 }}>
					<StyledTable>
						<TableHead>
							<TableRow>
								<TableCell align="left" width="30%">
									Permission
								</TableCell>
								<TableCell align="center">View</TableCell>
								<TableCell align="center">Create</TableCell>
								<TableCell align="center">Edit</TableCell>
								<TableCell align="center">Delete</TableCell>
								<TableCell align="center" width="75px">
									Action
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{userPermissions[group].map((row, index) => (
								<TableRow key={index}>
									<TableCell align="left">{row.permissionName}</TableCell>
									<TableCell align="center">
										<Android12Switch disabled name="view" checked={row.view}/>
									</TableCell>
									<TableCell align="center">
										<Android12Switch
											name="create"
											checked={row.create}
											color="success"
											onChange={(e) => handleToggle(row.id, e.target.name, e.target.checked)}
										/>
									</TableCell>
									<TableCell align="center">
										<Android12Switch
											name="edit"
											checked={row.edit}
											color="warning"
											onChange={(e) => handleToggle(row.id, e.target.name, e.target.checked)}
										/>
									</TableCell>
									<TableCell align="center">
										<Android12Switch
											name="delete"
											checked={row.delete}
											color="error"
											onChange={(e) => handleToggle(row.id, e.target.name, e.target.checked)}
										/>
									</TableCell>
									<TableCell align="center">
										<IconButton onClick={(e) => handleDelete(row.id)}>
											<Icon color="error">close</Icon>
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</StyledTable>
				</SimpleCard>
			))}
			<Tooltip title="Create" placement="top">
				<StyledAddButton color="secondary" aria-label="Add" className="button" onClick={togglePopup}>
					<Icon>add</Icon>
				</StyledAddButton>
			</Tooltip>
            <AddUserPermissions open={open} togglePopup={togglePopup} userId={params.id} refreshTable={getTableData} />
		</Container>
	);
};

export default UserPermissionsMaster;
