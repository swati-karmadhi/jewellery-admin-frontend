import React, { useEffect, useState } from "react";
import { Breadcrumb, Container, StyledAddButton } from "../../../../components";
import { Box, Icon, IconButton, styled, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { API, HELPER } from "../../../../services";
import { apiEndPoint, pageRoutes } from "../../../../constants/routesList";
import LabMasterDetails from "./LabMasterDetails";

const StyledTable = styled(Table)(() => ({
	whiteSpace: "pre",
	"& thead": {
		"& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
	},
	"& tbody": {
		"& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
	},
}));

const LabMaster = () => {
	const [tableData, setTableData] = useState([]);
	const [open, setOpen] = useState(false);
	const [selectedLabData, setSelectedLabData] = useState(null);

	const getTableData = () => {
		API.get(apiEndPoint.lab).then((response) => {
			setTableData(response);
		});
	};

	useEffect(() => {
		getTableData();
	}, []);

	const togglePopup = () => {
		if (open) {
			getTableData();
			setSelectedLabData(null);
		}
		setOpen(!open);
	};

	const handleEdit = (lab) => {
		setSelectedLabData(lab);
		togglePopup();
	};

	const handleDelete = (labId) => {
		HELPER.sweetAlert.delete().then(() => {
			API.destroy(`${apiEndPoint.lab}/${labId}`)
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
						{ name: "Masters", path: pageRoutes.master.diamond.lab },
						{ name: "Diamonds", path: pageRoutes.master.diamond.lab },
						{ name: "Lab" },
					]}
				/>
			</Box>
			<Box width="100%" overflow="auto">
				<StyledTable>
					<TableHead>
						<TableRow>
							<TableCell align="left" width="30%">
								Lab
							</TableCell>
							<TableCell align="left">Details</TableCell>
							<TableCell align="center" width="100px">
								Action
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{tableData.map((row, index) => (
							<TableRow key={index}>
								<TableCell align="left">{row.labName}</TableCell>
								<TableCell align="left">{row.details}</TableCell>
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
			<LabMasterDetails open={open} togglePopup={togglePopup} labData={selectedLabData} />
		</Container>
	);
};

export default LabMaster;
