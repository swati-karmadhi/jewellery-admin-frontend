import React, { useEffect, useState } from "react";
import { Box, Icon, IconButton, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Breadcrumb, Container, StyledAddButton, StyledTable } from "../../../../components";
import { apiEndPoint, pageRoutes } from "../../../../constants/routesList";
import { API, HELPER } from "../../../../services";
import ShapeMasterDetails from "./ShapeMasterDetails";
import * as CONFIG from "../../../../constants/config";

const ShapeMaster = () => {
	const [tableData, setTableData] = useState([]);
	const [open, setOpen] = useState(false);
	const [selectedShapeData, setSelectedShapeData] = useState(null);
	const url = apiEndPoint.shape;

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
			setSelectedShapeData(null);
		}
		setOpen(!open);
	};

	const handleEdit = (lab) => {
		setSelectedShapeData(lab);
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
						{ name: "Masters", path: pageRoutes.master.diamond.shape },
						{ name: "Diamonds", path: pageRoutes.master.diamond.shape },
						{ name: "Shape" },
					]}
				/>
			</Box>
			<Box width="100%" overflow="auto">
				<StyledTable>
					<TableHead>
						<TableRow>
							<TableCell align="center" width="50px">Rank</TableCell>
							<TableCell align="left" width="30%">
								Shape
							</TableCell>
							<TableCell align="left">Details</TableCell>
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
								<TableCell align="center">{row.rankk}</TableCell>
								<TableCell align="left">{row.shape}</TableCell>
								<TableCell align="left">{row.description}</TableCell>
								<TableCell align="center">
									<Box
										component="img"
										sx={{
											height: 50,
											width: 50,
											maxHeight: { xs: 25, md: 50 },
											maxWidth: { xs: 25, md: 50 },
										}}
										src={CONFIG.API_BASE_URL_IMG + row.imgUrl}
									/>
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
			</Box>
			<StyledAddButton color="secondary" aria-label="Add" className="button" onClick={togglePopup}>
				<Icon>add</Icon>
			</StyledAddButton>
			<ShapeMasterDetails open={open} togglePopup={togglePopup} shapeData={selectedShapeData} />
		</Container>
	);
};

export default ShapeMaster;
