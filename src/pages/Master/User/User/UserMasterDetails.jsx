import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Icon, IconButton, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { API, HELPER } from "../../../../services";
import { apiEndPoint } from "../../../../constants/routesList";
import { useFormik } from "formik";
import { StyledTextarea } from "../../../../components";
import Select from "react-select";

// inital data
const initialValues = {
	id: "",
	firstName: "",
	lastName: "",
	email: "",
	profile: "",
};

const header = {
	headers: {
		"Content-Type": "multipart/form-data",
	},
};

// form field validation schema
const validationSchema = Yup.object().shape({
	firstName: Yup.string().required("First name is required!"),
	lastName: Yup.string().required("Last name is required!"),
	email: Yup.string().email().required("Email is required!"),
	profile: Yup.mixed()
		.test({
			message: "Please provide a supported file type [png, jpg, jpeg]",
			test: (file, context) => {
				let isValid = true;
				if (file) {
					isValid = ["png", "jpg", "jpeg"].includes(file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2));
					if (!isValid) context?.createError();
				}
				return isValid;
			},
		})
		.test("FILE_SIZE", "Max file size 1MB", (value) => !value || (value && value.size <= 1048576)),
});

const UserMasterDetails = ({ open, togglePopup, userData }) => {
	const url = apiEndPoint.user;

	const handleFormSubmit = async (values) => {
		const fd = new FormData();

		for (const field in values) {
			fd.append(field, values[field]);
		}
		if (values.id === "") {
			API.post(url, fd, header)
				.then(() => {
					HELPER.toaster.success("Record created");
					togglePopup();
				})
				.catch((e) => HELPER.toaster.error(e.errors.message));
		} else {
			API.put(`${url}/${values.id}`, fd, header)
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
		if (open === true && userData !== null) {
			Object.keys(userData).forEach((key) => {
				formikProps.setFieldValue(key, userData[key]);
			});
		} else {
			formikProps.resetForm();
		}
	}, [open]);
	
	return (
		<Dialog open={open} onClose={togglePopup} aria-labelledby="form-dialog-title" maxWidth="xs">
			<DialogTitle id="form-dialog-title">{formikProps.values.id === "" ? "Add" : "Edit"} User</DialogTitle>
			<form id="inputDetails" onSubmit={formikProps.handleSubmit}>
				<DialogContent>
					<TextField
						size="small"
						type="text"
						name="firstName"
						label="First Name"
						variant="outlined"
						onBlur={formikProps.handleBlur}
						value={formikProps.values.firstName}
						onChange={formikProps.handleChange}
						helperText={formikProps.touched.firstName && formikProps.errors.firstName}
						error={Boolean(formikProps.errors.firstName && formikProps.touched.firstName)}
						sx={{ mb: 2, mt: 1, width: "49%" }}
					/>
					<TextField
						size="small"
						type="text"
						name="lastName"
						label="Last Name"
						variant="outlined"
						onBlur={formikProps.handleBlur}
						value={formikProps.values.lastName}
						onChange={formikProps.handleChange}
						helperText={formikProps.touched.lastName && formikProps.errors.lastName}
						error={Boolean(formikProps.errors.lastName && formikProps.touched.lastName)}
						sx={{ mb: 2, mt: 1, ml: 0.5, width: "49.5%" }}
					/>
					<TextField
						fullWidth={true}
						size="small"
						type="email"
						name="email"
						label="Email"
						variant="outlined"
						onBlur={formikProps.handleBlur}
						value={formikProps.values.email}
						onChange={formikProps.handleChange}
						helperText={formikProps.touched.email && formikProps.errors.email}
						error={Boolean(formikProps.errors.email && formikProps.touched.email)}
						sx={{ mb: 2, mt: 1 }}
						InputProps={{
							startAdornment: <InputAdornment position="start">@</InputAdornment>,
						}}
					/>
				</DialogContent>
				<DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 2 }}>
					<Box sx={{ display: "flex", alignContent: "center", flexWrap: "unset" }}>
						<TextField
							id="icon-button-file"
							fullWidth={true}
							size="small"
							type="file"
							name="profile"
							inputProps={{ accept: "image/*" }}
							sx={{ mt: 1, mb: 2, display: "none" }}
							onChange={(e) => {
								formikProps.setFieldValue("profile", e.currentTarget.files[0]);
							}}
							onBlur={formikProps.handleBlur}
							helperText={formikProps.touched.profile && formikProps.errors.profile}
							error={Boolean(formikProps.errors.profile && formikProps.touched.profile)}
						/>
						<label htmlFor="icon-button-file">
							<IconButton
								color="primary"
								id="profile"
								component="span"
								className="button"
								onBlur={formikProps.handleBlur}
								aria-label="Upload picture"
								disableRipple={true}
							>
								{formikProps.values.profile && formikProps.values.profile !== null ? (
									<Box
										id="image"
										component="img"
										sx={{
											height: 50,
											width: 50,
											maxHeight: { xs: 25, md: 50 },
											maxWidth: { xs: 25, md: 50 },
											...(Boolean(formikProps.errors.profile && formikProps.touched.profile) && {
												border: "2px solid #FF3D57",
											}),
										}}
										src={URL.createObjectURL(formikProps.values.profile)}
										onError={(e) => {
											e.target.src = "/assets/camera.svg";
										}}
									/>
								) : (
									<Icon>photo_camera</Icon>
								)}
							</IconButton>
						</label>
						{Boolean(formikProps.errors.profile && formikProps.touched.profile) && (
							<p style={{ color: "#FF3D57", fontSize: "12px" }}>{formikProps.touched.profile && formikProps.errors.profile}</p>
						)}
					</Box>
					<Box>
						<Button variant="outlined" color="secondary" onClick={togglePopup}>
							Cancel
						</Button>
						<Button type="submit" color="primary">
							Save
						</Button>
					</Box>
				</DialogActions>
			</form>
		</Dialog>
	);
};

export default UserMasterDetails;
