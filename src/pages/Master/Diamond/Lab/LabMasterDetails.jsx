import React, { useEffect, useState, useCallback } from "react";
import { Box, Button } from "@mui/material";
import { API, HELPER } from "../../../../services";
import ThemeDialog from "../../../../components/UI/Dialog/ThemeDialog";
import Validators from "./../../../../components/validations/Validator";
import Textinput from "../../../../components/UI/TextInput";
import Textarea from "../../../../components/UI/Pagination/Textarea";
import { apiConfig } from "../../../../config";

const initialValues = {
  id: "",
  labName: "",
  details: "",
};

const LabMasterDetails = ({ open, togglePopup, userData }) => {
  const [formState, setFormState] = useState({ ...initialValues });

  const rules = {
    labName: "required",
  };

  const handleSubmit = (data) => {
    const fd = new FormData();
    for (const field in data) {
      fd.append(field, data[field]);
    }
    const apiUrl =
      data.id === "" ? apiConfig.lab : `${apiConfig.lab}/${data.id}`;

    API[data.id === "" ? "post" : "put"](apiUrl, fd)
      .then(() => {
        HELPER.toaster.success(
          data.id === "" ? "Record created" : "Record saved"
        );
        togglePopup();
      })
      .catch((e) => HELPER.toaster.error(e.errors.message));
  };

  const onChange = ({ target: { value, name } }) => {
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onChangeTextarea = useCallback(
    (e) => {
      setFormState((prevProps) => {
        return {
          ...prevProps,
          [e.target.name]: e.target.value,
        };
      });
    },
    [formState]
  );

  useEffect(() => {
    if (open === true && userData !== null) {
      userData.profile = HELPER.getImageUrl(userData.image);
      setFormState(userData);
    } else {
      setFormState({ ...initialValues });
    }
  }, [open]);

  return (
    <Validators formData={formState} rules={rules}>
      {({ onSubmit, errors }) => (
        <ThemeDialog
          title={`${formState?.id === "" ? "Add" : "Edit"} Lab`}
          isOpen={open}
          onClose={togglePopup}
          actionBtns={
            <Box>
              <Button
                variant="outlined"
                color="secondary"
                onClick={togglePopup}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                onClick={() => onSubmit(handleSubmit)}
              >
                Save
              </Button>
            </Box>
          }
        >
          <Textinput
            size="small"
            type="text"
            name="labName"
            label="Lab Name"
            value={formState.labName}
            onChange={onChange}
            error={errors?.labName}
            sx={{ mb: 2, mt: 1, width: "49%" }}
          />
          <Textarea
            size="small"
            name="details"
            type="text"
            maxLength={255}
            minRows={3}
            maxRows={3}
            placeholder="Details"
            value={formState.details}
            onChange={onChangeTextarea}
            sx={{ mb: 1.5 }}
          />
        </ThemeDialog>
      )}
    </Validators>
  );
};

export default LabMasterDetails;
