import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, TextareaAutosize } from "@mui/material";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import styled from "@emotion/styled";
import { API, HELPER } from "../../../../services";
import { apiEndPoint } from "../../../../constants/routesList";

// inital data
const initialValues = {
	id: "",
	labName: "",
	details: "",
};

// form field validation schema
const validationSchema = Yup.object().shape({
	labName: Yup.string().required("Lab name is required!"),
});

const StyledTextarea = styled(TextareaAutosize)(
	({ theme }) => `
    width: 100%;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 5px 5px 0 5px;
    // color: ${theme.palette.mode === "dark" ? "#afb8c1" : "#24292f"};
    // background: ${theme.palette.mode === "dark" ? "#24292f" : "#fff"};
    border: 1px solid #0000003b;
  
    &:hover {
      border-color: #34314c;
    }
  
    &:focus {
      border-color: '#1976D2';
      box-shadow: 0 0 0 2px #1976D2;
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
);

const LabMasterDetails = ({ open, togglePopup, labData }) => {
	const handleFormSubmit = async (values) => {
		if (values.id === "") {
			API.post(apiEndPoint.lab, values)
				.then(() => {
					HELPER.toaster.success("Record created");
					togglePopup();
				})
				.catch((e) => HELPER.toaster.error(e));
		} else {
			API.put(`${apiEndPoint.lab}/${values.id}`, values)
				.then(() => {
					HELPER.toaster.success("Record saved");
					togglePopup();
				})
				.catch((e) => {
					HELPER.toaster.error(e.errors.message);
				});
		}
	};

	const formikProps = useFormik({
		onSubmit: handleFormSubmit,
		initialValues,
		validationSchema,
	});

	useEffect(() => {
		if (open === true && labData !== null) {
			Object.keys(labData).forEach((key) => {
				formikProps.setFieldValue(key, labData[key]);
			});
		} else {
			formikProps.resetForm();
		}
	}, [open]);

	return (
		<Dialog open={open} onClose={togglePopup} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">{formikProps.values.id === "" ? "Add" : "Edit"} Lab</DialogTitle>
			<DialogContent>
				<form onSubmit={formikProps.handleSubmit}>
					<TextField
						fullWidth={true}
						size="small"
						type="text"
						name="labName"
						label="Lab Name"
						variant="outlined"
						onBlur={formikProps.handleBlur}
						value={formikProps.values.labName}
						onChange={formikProps.handleChange}
						helperText={formikProps.touched.labName && formikProps.errors.labName}
						error={Boolean(formikProps.errors.labName && formikProps.touched.labName)}
						sx={{ mb: 3, mt: 1 }}
					/>

					<StyledTextarea
						size="small"
						name="details"
						type="text"
                        maxLength={255}
						minRows={3}
						maxRows={3}
						placeholder="Details"
						value={formikProps.values.details}
						onChange={formikProps.handleChange}
						sx={{ mb: 1.5 }}
					/>
					<DialogActions>
						<Button variant="outlined" color="secondary" onClick={togglePopup}>
							Cancel
						</Button>

						<Button type="submit" color="primary">
							Save
						</Button>
					</DialogActions>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default LabMasterDetails;
