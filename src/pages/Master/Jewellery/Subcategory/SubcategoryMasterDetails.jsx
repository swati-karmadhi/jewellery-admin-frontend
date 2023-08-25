import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Icon, IconButton, TextField } from "@mui/material";
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
	categoryId: "",
	name: "",
	details: "",
	image: "",
	logoImage: "",
};

const header = {
	headers: {
		"Content-Type": "multipart/form-data",
	},
};

// form field validation schema
const validationSchema = Yup.object().shape({
	categoryId: Yup.string().required("Category is required!"),
	name: Yup.string().required("Details name is required!"),
	image: Yup.mixed()
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
	logoImage: Yup.mixed()
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

const SubcategoryMasterDetails = ({ open, togglePopup, detailsData }) => {
	const url = apiEndPoint.subcategory;
	const [category, setCategory] = useState([]);

	const getProductGroup = () => {
		API.get(apiEndPoint.productDetailsGroup).then((response) => {
			setCategory(HELPER.prepateSelectDropdown(response, "groupName", "id"));
		});
	};

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
		getProductGroup();
	}, []);

	useEffect(() => {
		if (open === true && detailsData !== null) {
			Object.keys(detailsData).forEach((key) => {
				formikProps.setFieldValue(key, detailsData[key]);
			});
		} else {
			formikProps.resetForm();
		}
	}, [open]);

	return (
        <Dialog open={open} onClose={togglePopup} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">{formikProps.values.id === "" ? "Add" : "Edit"} product details</DialogTitle>
			<form id="inputDetails" onSubmit={formikProps.handleSubmit}>
				<DialogContent sx={{ pb: 1 }}>
					<Select
						id="detailsGroupId"
						name="detailsGroupId"
						placeholder="Details Group"
						isClearable
						backspaceRemovesValue
						form="inputDetails"
						required={true}
						options={category}
						value={category.find((e) => e.value === formikProps.values.detailsGroupId)}
						onChange={(e) => {
							formikProps.setFieldValue("detailsGroupId", e?.value || "");
						}}
						onBlur={formikProps.handleBlur}
						styles={{
							container: (styles) => ({
								...styles,
								marginTop: "5px",
								marginBottom: "8px",
							}),
							control: (styles, state) => ({
								...styles,
								...(state.isFocused !== true && {
									"&:hover": {
										border: "1px solid #24292f",
									},
								}),
								...(Boolean(formikProps.errors.detailsGroupId && formikProps.touched.detailsGroupId) && {
									border: state.isFocused ? "2px solid #FF3D57" : "1px solid #FF3D57",
									boxShadow: "#FF3D57",
									"&:hover": {
										border: "1px solid #FF3D57",
									},
								}),
							}),
						}}
					/>
					{Boolean(formikProps.errors.detailsGroupId && formikProps.touched.detailsGroupId) && (
						<p htmlFor="detailsGroupId" style={{ color: "#FF3D57", fontSize: "12px", margin: "4px 14px 0px" }}>
							{formikProps.errors.detailsGroupId}
						</p>
					)}

					<TextField
						fullWidth={true}
						size="small"
						type="text"
						name="detailName"
						label="Detail Name"
						variant="outlined"
						onBlur={formikProps.handleBlur}
						value={formikProps.values.detailName}
						onChange={formikProps.handleChange}
						helperText={formikProps.touched.detailName && formikProps.errors.detailName}
						error={Boolean(formikProps.errors.detailName && formikProps.touched.detailName)}
						sx={{ mb: 2, mt: 1 }}
					/>
					<StyledTextarea
						size="small"
						name="description"
						type="text"
						maxLength={255}
						minRows={3}
						maxRows={3}
						placeholder="Description"
						value={formikProps.values.description}
						onChange={formikProps.handleChange}
					/>
				</DialogContent>
				<DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 2 }}>
					<Box sx={{ display: "flex", alignContent: "center", flexWrap: "unset" }}>
						<TextField
							id="icon-button-file"
							fullWidth={true}
							size="small"
							type="file"
							name="image"
							inputProps={{ accept: "image/*" }}
							sx={{ mt: 1, mb: 2, display: "none" }}
							onChange={(e) => {
								formikProps.setFieldValue("image", e.currentTarget.files[0]);
							}}
							onBlur={formikProps.handleBlur}
							helperText={formikProps.touched.image && formikProps.errors.image}
							error={Boolean(formikProps.errors.image && formikProps.touched.image)}
						/>
						<label htmlFor="icon-button-file">
							<IconButton
								color="primary"
								id="image"
								component="span"
								className="button"
								onBlur={formikProps.handleBlur}
								aria-label="Upload picture"
								disableRipple={true}
							>
								{formikProps.values.image && formikProps.values.image !== null ? (
									<Box
										id="image"
										component="img"
										sx={{
											height: 50,
											width: 50,
											maxHeight: { xs: 25, md: 50 },
											maxWidth: { xs: 25, md: 50 },
											...(Boolean(formikProps.errors.image && formikProps.touched.image) && {
												border: "2px solid #FF3D57",
											}),
										}}
										src={URL.createObjectURL(formikProps.values.image)}
										onError={(e) => {
											e.target.src = "/assets/camera.svg";
										}}
									/>
								) : (
									<Icon>photo_camera</Icon>
								)}
							</IconButton>
						</label>
						{Boolean(formikProps.errors.image && formikProps.touched.image) && (
							<p style={{ color: "#FF3D57", fontSize: "12px" }}>{formikProps.touched.image && formikProps.errors.image}</p>
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
    )
};

export default SubcategoryMasterDetails;
