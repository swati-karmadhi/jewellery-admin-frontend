import React, { useEffect, useState } from "react";
import { Box, Icon, IconButton, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Breadcrumb, Container, StyledAddButton, StyledTable } from "../../../../components";
import { apiEndPoint, pageRoutes } from "../../../../constants/routesList";
import { API, HELPER } from "../../../../services";
import DetailsGroupMasterDetails from "./DetailsGroupMasterDetails";

const DetailsGroupMaster = () => {
	const [tableData, setTableData] = useState([]);
	const [open, setOpen] = useState(false);
	const [selectedGroupData, setSelectedGroupData] = useState(null);
    const url = apiEndPoint.productDetailsGroup

    const getTableData = () => {
		API.get(url).then((response) => {
			setTableData(response);
		});
	};

	useEffect(() => {
		getTableData();
	}, []);

	const togglePopup = () => {
		if (open) {
			getTableData();
			setSelectedGroupData(null);
		}
		setOpen(!open);
	};

	const handleEdit = (lab) => {
		setSelectedGroupData(lab);
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
			<Box className="breadcrumb">
				<Breadcrumb
					routeSegments={[
						{ name: "Masters", path: pageRoutes.master.jewellery.detailsGroup },
						{ name: "Jewellery", path: pageRoutes.master.jewellery.detailsGroup },
						{ name: "Details Group" },
					]}
				/>
			</Box>
            <Box width="100%" overflow="auto">
				<StyledTable>
					<TableHead>
						<TableRow>
							<TableCell align="left">
								Details Group
							</TableCell>
							<TableCell align="center" width="100px">
								Action
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{tableData.map((row, index) => (
							<TableRow key={index}>
								<TableCell align="left">{row.groupName}</TableCell>
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
			</Box>
			<StyledAddButton color="secondary" aria-label="Add" className="button" onClick={togglePopup}>
				<Icon>add</Icon>
			</StyledAddButton>
			<DetailsGroupMasterDetails open={open} togglePopup={togglePopup} groupData={selectedGroupData} />
		</Container>
	);
};

export default DetailsGroupMaster;
