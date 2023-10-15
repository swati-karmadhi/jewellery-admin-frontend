import React from 'react'

export default function ImgUploadBoxInput({error}) {
  return (
    <>
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
            <Textinput
                size="small"
                type="file"
                onChange={onChange}
                id="icon-button-file"
                fullWidth={true}
                name="profile"
                inputProps={{ accept: "image/*" }}
                sx={{ mt: 1, mb: 2, display: "none" }}
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
                    {formState.profile && formState.profile !== null ? (
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
                            src={URL.createObjectURL(formState.profile)}
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
    </>
  )
}
