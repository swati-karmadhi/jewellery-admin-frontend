import React, { useEffect, useState } from "react";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	Icon,
	IconButton,
	Radio,
	RadioGroup,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
	TextField,
	Tooltip,
} from "@mui/material";
import { Breadcrumb, Container, StyledAddButton, StyledTable } from "../../../../components";
import { apiEndPoint, pageRoutes } from "../../../../constants/routesList";
import { API, HELPER } from "../../../../services";
import * as CONFIG from "../../../../constants/config";
import { useNavigate } from "react-router-dom";
import UserMasterDetails from "./UserMasterDetails";
import styled from "@emotion/styled";
import { green, red } from "@mui/material/colors";

const GreenRadio = styled(Radio)(() => ({
	color: green[400],
	"&$checked": { color: green[600] },
}));

const RedRadio = styled(Radio)(() => ({
	color: red[400],
	"&$checked": { color: red[600] },
}));

const initialData = {
	searchTxt: "",
	isActive: "",
};

const UserMaster = () => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(8);
	const [searchParam, setSearchParam] = useState({ ...initialData });
	const [tableDataCount, setTableDataCount] = useState(0);
	const [tableData, setTableData] = useState([]);
	const [open, setOpen] = useState(false);
	const [openSearch, setOpenSearch] = useState(false);
	const [selectedUserData, setSelectedUserData] = useState(null);
	const navigate = useNavigate();
	const url = apiEndPoint.user;

	const handleChangePage = (_, newPage) => {
		setPage(newPage);
		getTableData(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
		getTableData(0, +event.target.value);
	};

	const getTableData = (pg = page, rpp = rowsPerPage, sp= searchParam) => {
		API.get(url, { page: pg, rowsPerPage: rpp, ...sp }).then((response) => {
			setTableDataCount(response.count);
			setTableData(response.rows);
		});
	};

	useEffect(() => {
		getTableData();
	}, []);

	const search = () => {
		setPage(0);
		setRowsPerPage(8);
		getTableData(0, 8);
		togglePopupSearch();
	};

	const togglePopup = () => {
		if (open) {
			getTableData();
			setSelectedUserData(null);
		}
		setOpen(!open);
	};

	const togglePopupSearch = () => {
		setOpenSearch(!openSearch);
	};

	const handleToggle = (id) => {
		API.put(`${apiEndPoint.user}/${id}/toggle`)
			.then((response) => {
				HELPER.toaster.success(response.message);
				getTableData();
			})
			.catch((e) => HELPER.toaster.error("Error " + e));
	};

	const handleEdit = (data) => {
		setSelectedUserData(data);
		togglePopup();
	};

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

    const resetSearchForm = ()=>{
        setSearchParam({...initialData})
		getTableData(page, rowsPerPage, {...initialData});
		togglePopupSearch();
    }

	return (
		<Container>
			<Box className="breadcrumb" sx={{ display: "flex", justifyContent: "space-between" }}>
				<Breadcrumb routeSegments={[{ name: "Masters", path: pageRoutes.master.user.user }, { name: "User" }]} />
				<Tooltip title="Filter">
					<IconButton color="inherit" className="button" aria-label="Filter" onClick={togglePopupSearch}>
						<Icon>filter_list</Icon>
					</IconButton>
				</Tooltip>
			</Box>
			<Box width="100%" overflow="auto">
				<StyledTable>
					<TableHead>
						<TableRow>
							<TableCell align="left" width="30%">
								Name
							</TableCell>
							<TableCell align="left">Email</TableCell>
							<TableCell align="left" width="50px">
								Active
							</TableCell>
							<TableCell align="center" width="100px">
								Image
							</TableCell>
							<TableCell align="center" width="150px">
								Action
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{tableData.map((row, index) => (
							<TableRow key={index}>
								<TableCell align="left">
									{row.firstName} {row.lastName}
								</TableCell>
								<TableCell align="left" style={{ textTransform: "none" }}>
									{row.email}
								</TableCell>
								<TableCell align="left">
									<IconButton onClick={() => handleToggle(row.id)}>
										<Icon color={row.isActive === true ? "success" : "error"} style={{ fontWeight: 700 }}>
											power_settings_new
										</Icon>
									</IconButton>
								</TableCell>
								<TableCell align="center">
									{row.image && row.image !== null && (
										<Box
											component="img"
											sx={{
												height: 50,
												width: 50,
												maxHeight: { xs: 25, md: 50 },
												maxWidth: { xs: 25, md: 50 },
											}}
											src={CONFIG.API_BASE_URL_IMG + row.image}
										/>
									)}
								</TableCell>
								<TableCell align="center">
									<IconButton onClick={(e) => navigate(`${pageRoutes.master.user.userPermissions.split(":")[0]}${row.id}`)}>
										<Icon color="warning">fingerprint</Icon>
									</IconButton>
									<IconButton onClick={(e) => handleEdit(row)}>
										<Icon color="primary">edit</Icon>
									</IconButton>
									<IconButton onClick={(e) => handleDelete(row.id)}>
										<Icon color="error">close</Icon>
									</IconButton>
								</TableCell>
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
			<Tooltip title="Create" placement="top">
				<StyledAddButton color="secondary" aria-label="Add" className="button" onClick={togglePopup}>
					<Icon>add</Icon>
				</StyledAddButton>
			</Tooltip>
			<Dialog open={openSearch} onClose={togglePopupSearch} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Search Filter</DialogTitle>
				<DialogContent>
					<TextField
						fullWidth={true}
						size="small"
						type="text"
						name="searchTxt"
						label="Search Text"
						variant="outlined"
						value={searchParam.searchTxt}
						onChange={(e) => setSearchParam((data) => ({ ...data, searchTxt: e.target.value }))}
						sx={{ mb: 2, mt: 1 }}
					/>
					<RadioGroup
						row
						aria-label="position"
						name="isActive"
						value={searchParam.isActive}
						onChange={(e) => setSearchParam((data) => ({ ...data, isActive: e.target.value }))}
					>
						<FormControlLabel value="" label="All" labelPlacement="start" control={<Radio color="default" />} />
						<FormControlLabel value="1" label="Active" labelPlacement="start" control={<Radio color="success" />} />
						<FormControlLabel value="0" label="Inactive" labelPlacement="start" control={<Radio color="error" />} />
					</RadioGroup>
				</DialogContent>
				<DialogActions sx={{ px: 3, pb: 2 }}>
					<Button variant="outlined" color="secondary" onClick={resetSearchForm}>
						Reset
					</Button>
					<Button type="submit" color="primary" onClick={search}>
						Search
					</Button>
				</DialogActions>
			</Dialog>
			<UserMasterDetails open={open} togglePopup={togglePopup} userData={selectedUserData} />
		</Container>
	);
};

export default UserMaster;
