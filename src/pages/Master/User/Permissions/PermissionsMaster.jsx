import React, { useEffect,useMemo, useState } from "react";
import { Box, Icon, IconButton, TableBody, TableCell, TableHead, TablePagination, TableRow, Tooltip } from "@mui/material";
import { Breadcrumb, Container, StyledAddButton, StyledTable } from "../../../../components";
import { apiEndPoint, pageRoutes } from "../../../../constants/routesList";
import { API, HELPER } from "../../../../services";
import { appConfig } from "./../../../../config";
import _ from "lodash";

import * as CONFIG from "../../../../constants/config";
import PaginationTable, { usePaginationTable } from "../../../../components/UI/Pagination/PaginationTable";
import useDidMountEffect from "../../../../hooks/useDidMountEffect";
import { useNavigate } from "react-router";

const PermissionsMaster = () => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(8);
	const [tableDataCount, setTableDataCount] = useState(0);
	const [tableData, setTableData] = useState([]);
	const [open, setOpen] = useState(false);
	const url = apiEndPoint.permission;
	const navigate = useNavigate();

	const [openSearch, setOpenSearch] = useState(false);

	/* Pagination code */
	const COLUMNS = [
		{ title: "Permission"},
		{ title: "Group"},
	  ];
	  const { state, setState, changeState, ...otherTableActionProps } =
		usePaginationTable({
			searchTxt: "",
			isActive: "",
			order: "",
			orderby: "",
		});

	const paginate = (clear = false, isNewFilter = false) => {
		changeState("loader", true);
		let clearStates = {
			searchTxt: "",
			isActive: "",
		  ...appConfig.default_pagination_state,
		};
	
		let filter = {
		  page: state.page,
		  searchTxt: state.searchTxt,
		  isActive: state.isActive,
		  rowsPerPage: state.rowsPerPage,
		  order: state.order,
		  orderBy: state.orderby
		};
	
		let newFilterState = { ...appConfig.default_pagination_state };
	
		if (clear) {
		  filter = _.merge(filter, clearStates);
		} else if (isNewFilter) {
		  filter = _.merge(filter, newFilterState);
		}
	
		// ----------Get Blog Api------------
		API.get(apiEndPoint.permission, filter)
		  .then((res) => {
			setState({
			  ...state,
			  total_items: res.count,
			  data: res.rows,
			  ...(clear && clearStates),
			  ...(isNewFilter && newFilterState),
			  loader: false,
			});
		  })
		  .catch(() => {
			setState({
			  ...state,
			  ...(clear && clearStates),
			  ...(isNewFilter && newFilterState),
			  loader: false,
	
			});
		  }).finally(() => {
			if (openSearch == true) {
				setOpenSearch(false);
			}
		  });
	  };
	  useDidMountEffect(() => {
		paginate();
	  }, [state.page, state.rowsPerPage, state.order, state.orderby]);
	
	  const rows = useMemo(() => {
		return state.data.map((item) => {
		  return {
			item: item,
			columns: [
			  <span>
				{item.firstName} {item.lastName}
			  </span>,
			  <span>{item.email}</span>,
			  <span>
				{item.image && item.image !== null && (
				  <Box
					component="img"
					sx={{
					  height: 50,
					  width: 50,
					  maxHeight: { xs: 25, md: 50 },
					  maxWidth: { xs: 25, md: 50 },
					}}
					src={HELPER.getImageUrl(item.image)}
				  />
				)}
			  </span>,
			  <div>
				<IconButton
				  onClick={(e) =>
					navigate(
					  `${pageRoutes.master.user.userPermissions.split(":")[0]}${
						item.id
					  }`
					)
				  }
				>
				  <Icon color="warning">fingerprint</Icon>
				</IconButton>
				<IconButton >
				  <Icon color="primary">edit</Icon>
				</IconButton>
				{/* <IconButton onClick={(e) => handleDelete(item.id)}>
				  <Icon color="error">close</Icon>
				</IconButton> */}
			  </div>,
			],
		  };
		});
	  }, [state.data]);
	// const handleChangePage = (_, newPage) => {
	// 	setPage(newPage);
	// 	getTableData(newPage);
	// };

	// const handleChangeRowsPerPage = (event) => {
	// 	setRowsPerPage(+event.target.value);
	// 	setPage(0);
	// 	getTableData(0, +event.target.value);
	// };

	// const getTableData = (pg = page, rpp = rowsPerPage) => {
	// 	API.get(url, { page: pg, rowsPerPage: rpp }).then((response) => {
	// 		setTableDataCount(response.count);
	// 		setTableData(response.rows);
	// 	});
	// };

	// useEffect(() => {
	// 	getTableData();
	// }, []);

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
			{/* <Box width="100%" overflow="auto">
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
			</Box> */}
			{/* <PaginationTable
				header={COLUMNS}
				// rows={rows}
				totalItems={state.total_items}
				perPage={state.rowsPerPage}
				activePage={state.page}
				checkboxColumn={false}
				selectedRows={state.selectedRows}
				enableOrder={true}
				isLoader={state.loader}
				// emptyTableImg={<img src={error400cover} width="350px" />}
				{...otherTableActionProps}
				orderBy={state.orderby}
				order={state.order}
			>
				 */}
			{/* </PaginationTable> */}
		</Container>
	);
};

export default PermissionsMaster;
