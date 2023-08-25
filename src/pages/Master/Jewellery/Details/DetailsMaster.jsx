import React, { useEffect, useState } from "react";
import {
	Autocomplete,
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Icon,
	IconButton,
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
import styled from "@emotion/styled";
import DetailsMasterDetails from "./DetailsMasterDetails";
import * as CONFIG from "../../../../constants/config";

const AutoComplete = styled(Autocomplete)(() => ({
	width: 300,
	marginBottom: 1,
}));

const DetailsMaster = () => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(8);
	const [selectedGroup, setSelectedGroup] = useState(null);
	const [tableDataCount, setTableDataCount] = useState(0);
	const [tableData, setTableData] = useState([]);
	const [productGroup, setProductGroup] = useState([]);
	const [open, setOpen] = useState(false);
	const [openSearch, setOpenSearch] = useState(false);
	const [selectedDetailData, setSelectedDetailData] = useState(null);
	const url = apiEndPoint.productDetails;

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
		API.get(url, { page: pg, rowsPerPage: rpp, detailsGroupId: selectedGroup?.value }).then((response) => {
			setTableDataCount(response.count);
			setTableData(response.rows);
			setOpenSearch(false);
		});
	};

	const getProductGroup = () => {
		API.get(apiEndPoint.productDetailsGroup).then((response) => {
			setProductGroup(HELPER.prepateSelectDropdown(response, "groupName", "id"));
		});
	};

	// useEffect(() => {
	// 	getTableData();
	// }, [page, rowsPerPage]);

	useEffect(() => {
        getTableData();
		getProductGroup();
	}, []);

	const search = () => {
		setPage(0);
		setRowsPerPage(8);
		getTableData(0, 8);
	};

	const togglePopup = () => {
		if (open) {
			getTableData();
			setSelectedDetailData(null);
		}
		setOpen(!open);
	};

	const togglePopupSearch = () => {
		setOpenSearch(!openSearch);
	};

	const handleEdit = (lab) => {
		setSelectedDetailData(lab);
		togglePopup();
	};

	const handleDelete = (labId) => {
		HELPER.sweetAlert.delete().then(() => {
			API.destroy(`${url}/${labId}`)
				.then(() => {
					HELPER.toaster.success("Record Deleted");
					getTableData();
				})
				.catch((e) => HELPER.toaster.error("Error " + e));
		});
	};

	return (
		<Container>
			<Box className="breadcrumb" sx={{ display: "flex", justifyContent: "space-between" }}>
				<Breadcrumb
					routeSegments={[
						{ name: "Masters", path: pageRoutes.master.jewellery.details },
						{ name: "Jewellery", path: pageRoutes.master.jewellery.details },
						{ name: "Details" },
					]}
				/>
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
								Details
							</TableCell>
							<TableCell align="left" width="30%">
								Details Group
							</TableCell>
							<TableCell align="left">Description</TableCell>
							<TableCell align="center" width="100px">
								Image
							</TableCell>
							<TableCell align="center" width="100px">
								Action
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{tableData.map((row, index) => (
							<TableRow key={index}>
								<TableCell align="left">{row.detailName}</TableCell>
								<TableCell align="left">{row.groupName}</TableCell>
								<TableCell align="left">{row.description}</TableCell>
								<TableCell align="center">
									{row.logoUrl && row.logoUrl !== null && (
										<Box
											component="img"
											sx={{
												height: 50,
												width: 50,
												maxHeight: { xs: 25, md: 50 },
												maxWidth: { xs: 25, md: 50 },
											}}
											src={CONFIG.API_BASE_URL_IMG + row.logoUrl}
										/>
									)}
								</TableCell>
								<TableCell align="center">
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
				<DialogContent sx={{ pb: 1 }}>
					<AutoComplete
						sx={{ mt: 1 }}
						options={productGroup}
						getOptionLabel={(option) => option.label}
						autoComplete={true}
						value={selectedGroup}
						renderInput={(params) => <TextField {...params} label="Product Details Group" variant="outlined" fullWidth />}
						onChange={(e, value) => setSelectedGroup(value || null)}
					/>
				</DialogContent>
				<DialogActions sx={{ px: 3, pb: 2 }}>
					<Button variant="outlined" color="secondary" onClick={togglePopupSearch}>
						Cancel
					</Button>
					<Button type="submit" color="primary" onClick={search}>
						Search
					</Button>
				</DialogActions>
			</Dialog>
			<DetailsMasterDetails open={open} togglePopup={togglePopup} detailsData={selectedDetailData} />
		</Container>
	);
};

export default DetailsMaster;
