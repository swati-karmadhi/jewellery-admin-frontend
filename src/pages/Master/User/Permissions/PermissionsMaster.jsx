import React, { useEffect, useState } from "react";
import { Box, Icon, IconButton, TableBody, TableCell, TableHead, TablePagination, TableRow, Tooltip } from "@mui/material";
import { Breadcrumb, Container, StyledAddButton, StyledTable } from "../../../../components";
import { apiEndPoint, pageRoutes } from "../../../../constants/routesList";
import { API, HELPER } from "../../../../services";
import * as CONFIG from "../../../../constants/config";

const PermissionsMaster = () => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(8);
	const [tableDataCount, setTableDataCount] = useState(0);
	const [tableData, setTableData] = useState([]);
	const [open, setOpen] = useState(false);
	const url = apiEndPoint.permission;

	const handleChangePage = (_, newPage) => {
		setPage(newPage);
		getTableData(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
		getTableData(0, +event.target.value);
	};

	const getTableData = (pg = page, rpp = rowsPerPage) => {
		API.get(url, { page: pg, rowsPerPage: rpp }).then((response) => {
			setTableDataCount(response.count);
			setTableData(response.rows);
		});
	};

	useEffect(() => {
		getTableData();
	}, []);

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
			<Box width="100%" overflow="auto">
				<StyledTable>
					<TableHead>
						<TableRow>
							<TableCell align="left" width="30%">
								Permission
							</TableCell>
							<TableCell align="left">Group</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{tableData.map((row, index) => (
							<TableRow key={index}>
								<TableCell align="left">{row.permissionName}</TableCell>
								<TableCell align="left">{row.permissionGroup}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</StyledTable>
				<TablePagination
					sx={{ px: 2 }}
					page={page}
					component="div"
					rowsPerPage={rowsPerPage}
					count={tableDataCount}
					onPageChange={handleChangePage}
					rowsPerPageOptions={[5, 8, 10]}
					onRowsPerPageChange={handleChangeRowsPerPage}
					nextIconButtonProps={{ "aria-label": "Next Page" }}
					backIconButtonProps={{ "aria-label": "Previous Page" }}
				/>
			</Box>
		</Container>
	);
};

export default PermissionsMaster;
