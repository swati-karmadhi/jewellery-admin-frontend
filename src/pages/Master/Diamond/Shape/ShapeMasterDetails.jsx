import styled from "@emotion/styled";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Icon, IconButton, TextField, TextareaAutosize } from "@mui/material";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { API, HELPER } from "../../../../services";
import { apiEndPoint } from "../../../../constants/routesList";
import { useFormik } from "formik";
import { NumericFormat } from "react-number-format";
import * as CONFIG from "../../../../constants/config";

// inital data
const initialValues = {
	id: "",
	shape: "",
	description: "",
	image: "",
	rankk: 0,
};

const header = {
	headers: {
		"Content-Type": "multipart/form-data",
	},
};

// form field validation schema
const validationSchema = Yup.object().shape({
	shape: Yup.string().required("Shape name is required!"),
	rankk: Yup.number().min(1, "Rank must be greater than 1").required("Rank is required!"),
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

const ShapeMasterDetails = ({ open, togglePopup, shapeData }) => {
	const url = apiEndPoint.shape;

	const handleFormSubmit = async (values) => {
		const fd = new FormData();

		for (const field in values) {
			fd.append(field, values[field]);
		}

		for (const data of fd.entries()) {
			console.log(data);
		}

		if (values.id === "") {
			API.post(url, fd, header)
				.then(() => {
					HELPER.toaster.success("Record created");
					togglePopup();
				})
				.catch((e) => HELPER.toaster.error(e));
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
		if (open === true && shapeData !== null) {
			Object.keys(shapeData).forEach((key) => {
				formikProps.setFieldValue(key, shapeData[key]);
			});
		} else {
			formikProps.resetForm();
		}
	}, [open]);

	return (
		<Dialog open={open} onClose={togglePopup} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">{formikProps.values.id === "" ? "Add" : "Edit"} Shape</DialogTitle>
			<DialogContent>
				<form onSubmit={formikProps.handleSubmit}>
					<TextField
						fullWidth={true}
						size="small"
						type="text"
						name="shape"
						label="Shape"
						variant="outlined"
						onBlur={formikProps.handleBlur}
						value={formikProps.values.shape}
						onChange={formikProps.handleChange}
						helperText={formikProps.touched.shape && formikProps.errors.shape}
						error={Boolean(formikProps.errors.shape && formikProps.touched.shape)}
						sx={{ mb: 2, mt: 1 }}
					/>
					<NumericFormat
						fullWidth={true}
						name="rankk"
						label="Rank"
						customInput={TextField}
						displayType="input"
						type="text"
						thousandSeparator={false}
						allowNegative={false}
						decimalScale={0}
						onBlur={formikProps.handleBlur}
						value={formikProps.values.rankk}
						onChange={formikProps.handleChange}
						helperText={formikProps.touched.rankk && formikProps.errors.rankk}
						error={Boolean(formikProps.errors.rankk && formikProps.touched.rankk)}
						sx={{ mb: 2 }}
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
					<DialogActions sx={{ justifyContent: "space-between", pl: 0 }}>
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
											// alt={<Icon>photo_camera</Icon>}
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
			</DialogContent>
		</Dialog>
	);
};

export default ShapeMasterDetails;
