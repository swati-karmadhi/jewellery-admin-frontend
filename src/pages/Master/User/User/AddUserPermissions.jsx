import React, { useEffect, useState } from "react";
import { apiEndPoint } from "../../../../constants/routesList";
import { API } from "../../../../services";
import {
	Box,
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	Icon,
	IconButton,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Tooltip,
} from "@mui/material";
import { Android12Switch, SimpleCard, StyledTable } from "../../../../components";

const AddUserPermissions = ({ open, togglePopup, userId, refreshTable }) => {
	const [userPermissions, setUserPermissions] = useState({});
	const url = apiEndPoint.userPermission;

	const getTableData = () => {
		API.get(`${url}/${userId}/not`).then((response) => {
			const _userPermissions = {};
			for (const group of Object.keys(response)) {
				_userPermissions[group] = response[group].map((permissions) => {
					return {
						permissionMasterId: permissions.id,
						permissionName: permissions.permissionName,
						view: true,
						create: false,
						edit: false,
						delete: false,
					};
				});
			}
			setUserPermissions(_userPermissions);
		});
	};

	useEffect(() => {
		if (userId && open === true) {
			getTableData();
		}
		if (open === false) {
			setUserPermissions({});
		}
	}, [open]);

	const toggleGroupPermissions = (group, value) => {
		const _userPermissions = { ...userPermissions };
		for (const permissions of _userPermissions[group]) {
			permissions.view = !permissions.view;
			permissions.create = !permissions.create;
			permissions.edit = !permissions.edit;
			permissions.delete = !permissions.delete;
		}
		setUserPermissions(_userPermissions);
	};

	const toggleAllPermissions = (group, permissionMasterId, value) => {
		const _userPermissions = { ...userPermissions };
		const permissionIndex = _userPermissions[group].findIndex((row) => row.permissionMasterId === permissionMasterId);
		if (permissionIndex >= 0) {
			_userPermissions[group][permissionIndex].view = value;
			_userPermissions[group][permissionIndex].create = value;
			_userPermissions[group][permissionIndex].edit = value;
			_userPermissions[group][permissionIndex].delete = value;
			setUserPermissions(_userPermissions);
		}
	};

	const togglePermission = (group, permissionMasterId, operation, value) => {
		const _userPermissions = { ...userPermissions };
		const permissionIndex = _userPermissions[group].findIndex((row) => row.permissionMasterId === permissionMasterId);
		if (permissionIndex >= 0) {
			_userPermissions[group][permissionIndex][operation] = value;
			setUserPermissions(_userPermissions);
		}
	};

	return (
		<Dialog open={open} onClose={togglePopup} aria-labelledby="form-dialog-title" maxWidth="lg">
			<DialogTitle id="form-dialog-title">Add Permissions</DialogTitle>
			<DialogContent sx={{ mt: 1 }}>
				{Object.keys(userPermissions).map((group, i) => (
					<SimpleCard key={i} title={group} sx={{ mb: 2 }}>
						<StyledTable>
							<TableHead>
								<TableRow>
									<TableCell align="left" width="50px">
										<Tooltip title="Add/Remove All">
											<IconButton onClick={(e) => toggleGroupPermissions(group, e.target.checked)}>
												<Icon color="error">add</Icon>
											</IconButton>
										</Tooltip>
									</TableCell>
									<TableCell align="left" width="30%">
										Permission
									</TableCell>
									<TableCell align="center">View</TableCell>
									<TableCell align="center">Create</TableCell>
									<TableCell align="center">Edit</TableCell>
									<TableCell align="center">Delete</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{userPermissions[group].map((row, index) => (
									<TableRow key={index}>
										<TableCell align="center">
											<Checkbox
												color="secondary"
												checked={row.create === true && row.edit === true && row.delete === true}
												onChange={(e) => toggleAllPermissions(group, row.permissionMasterId, e.target.checked)}
											/>
										</TableCell>
										<TableCell align="left">{row.permissionName}</TableCell>
										<TableCell align="center">
											<Android12Switch disabled name="view" checked={row.view} />
										</TableCell>
										<TableCell align="center">
											<Android12Switch
												name="create"
												checked={row.create}
												color="success"
												onChange={(e) => togglePermission(group, row.permissionMasterId, e.target.name, e.target.checked)}
											/>
										</TableCell>
										<TableCell align="center">
											<Android12Switch
												name="edit"
												checked={row.edit}
												color="warning"
												onChange={(e) => togglePermission(group, row.permissionMasterId, e.target.name, e.target.checked)}
											/>
										</TableCell>
										<TableCell align="center">
											<Android12Switch
												name="delete"
												checked={row.delete}
												color="error"
												onChange={(e) => togglePermission(group, row.permissionMasterId, e.target.name, e.target.checked)}
											/>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</StyledTable>
					</SimpleCard>
				))}
			</DialogContent>
			<DialogActions>
				<Box>
					<Button variant="outlined" color="secondary" onClick={togglePopup}>
						Cancel
					</Button>
					<Button type="submit" color="primary">
						Save
					</Button>
				</Box>
			</DialogActions>
		</Dialog>
	);
};

export default AddUserPermissions;
