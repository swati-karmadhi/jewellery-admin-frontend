import React, { useEffect } from "react";
import * as Yup from "yup";
import { API, HELPER } from "../../../../services";
import { apiEndPoint } from "../../../../constants/routesList";
import { useFormik } from "formik";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

// initial data
const initialValues = {
	id: "",
	groupName: "",
};

// form field validation schema
const validationSchema = Yup.object().shape({
	groupName: Yup.string().required("Group name is required!"),
});

const DetailsGroupMasterDetails = ({ open, togglePopup, groupData }) => {
	const url = apiEndPoint.detailsGroup;
	const handleFormSubmit = async (values) => {
		if (values.id === "") {
			API.post(url, values)
				.then(() => {
					HELPER.toaster.success("Record created");
					togglePopup();
				})
				.catch((e) => HELPER.toaster.error(e.errors.message));
		} else {
			API.put(`${url}/${values.id}`, values)
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
		if (open === true && groupData !== null) {
			Object.keys(groupData).forEach((key) => {
				formikProps.setFieldValue(key, groupData[key]);
			});
		} else {
			formikProps.resetForm();
		}
	}, [open]);

	return (
		<Dialog open={open} onClose={togglePopup} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">{formikProps.values.id === "" ? "Add" : "Edit"} Details Group</DialogTitle>
			<DialogContent>
				<form onSubmit={formikProps.handleSubmit}>
					<TextField
						fullWidth={true}
						size="small"
						type="text"
						name="groupName"
						label="Group Name"
						variant="outlined"
						onBlur={formikProps.handleBlur}
						value={formikProps.values.groupName}
						onChange={formikProps.handleChange}
						helperText={formikProps.touched.groupName && formikProps.errors.groupName}
						error={Boolean(formikProps.errors.groupName && formikProps.touched.groupName)}
						sx={{ mb: 3, mt: 1 }}
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

export default DetailsGroupMasterDetails;
