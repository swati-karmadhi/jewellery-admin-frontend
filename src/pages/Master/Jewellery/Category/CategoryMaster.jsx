import React, { useEffect, useState } from "react";
import {
  Box,
  Icon,
  IconButton,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";
import {
  Breadcrumb,
  Container,
  StyledAddButton,
  StyledTable,
} from "../../../../components";
import { apiEndPoint, pageRoutes } from "../../../../constants/routesList";
import { API, HELPER } from "../../../../services";
import * as CONFIG from "../../../../constants/config";
import AddCategoryModal from "./AddCategory";

const CategoryMaster = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [tableDataCount, setTableDataCount] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCategoryData, setSelectedCategoryData] = useState(null);
  const url = apiEndPoint.category;

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

  const togglePopup = () => {
    if (open) {
      getTableData();
      setSelectedCategoryData(null);
    }
    setOpen(!open);
  };

  const handleEdit = (data) => {
    setSelectedCategoryData(data);
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

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Masters", path: pageRoutes.master.jewellery.category },
            { name: "Jewellery", path: pageRoutes.master.jewellery.category },
            { name: "Category" },
          ]}
        />
      </Box>
      <Box width="100%" overflow="auto">
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell align="left" width="30%">
                Name
              </TableCell>
              <TableCell align="left">Details</TableCell>
              <TableCell align="center" width="100px">
                Image
              </TableCell>
              <TableCell align="center" width="100px">
                Logo
              </TableCell>
              <TableCell align="center" width="100px">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={index}>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.details}</TableCell>
                <TableCell align="center">
                  {row.imgUrl && row.imgUrl !== null && (
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
                  )}
                </TableCell>
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
        <StyledAddButton
          color="secondary"
          aria-label="Add"
          className="button"
          onClick={togglePopup}
        >
          <Icon>add</Icon>
        </StyledAddButton>
      </Tooltip>
      <AddCategoryModal
        open={open}
        togglePopup={togglePopup}
        // labData={selectedLabData}
      />
    </Container>
  );
};

export default CategoryMaster;
