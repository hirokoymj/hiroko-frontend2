import React, { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Field, reduxForm, formValues } from "redux-form";
import Button from "@material-ui/core/Button";
import PublishIcon from "@material-ui/icons/Publish";
import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import { compose } from "recompose";

const useStyles = makeStyles((theme) => ({
  uploadImageContainer: {
    border: "2px dashed #4caf50",
    textAlign: "center",
    padding: "20px",
  },
  addIcon: {
    fontSize: 40,
    color: theme.palette.secondary.main,
  },
}));

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

const ImageDropzone = ({ getRootProps, getInputProps }) => {
  const classes = useStyles();

  return (
    <section
      className="container"
      style={{ border: "1px dashed grey", marginBottom: "25px" }}>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        upload photo
      </div>
    </section>
  );
};

export const ImageUpload = (props) => {
  const classes = useStyles();
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    // maxFiles: 1,
    // multiple: false,
    onDrop: async (acceptedFiles) => {
      const { onChange } = props.input;
      const files = props.input.value;
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      const allFiles = files.concat(newFiles);
      onChange(allFiles);
    },
  });

  return (
    <div>
      <ImageDropzone
        getRootProps={getRootProps}
        getInputProps={getInputProps}
      />
      <ImageDropzone
        getRootProps={getRootProps}
        getInputProps={getInputProps}
      />
    </div>
  );
};

// export const ClaimsReimbursmentDetailsTip = compose(
//   reduxForm({ form: "CLAIMS_REIMBURSEMENT", destroyOnUnmount: false }),
//   formValues("rentalId")
// )(({ rentalId }) => {

export const TestView = compose(
  reduxForm({
    form: "Photo_Form",
    initialValues: {
      photos: [],
    },
  }),
  formValues("photos")
)(({ handleSubmit, submitting, photos }) => {
  console.log("TestView");
  console.log(photos);
  return (
    <>
      <Field name="photos" component={ImageUpload} />
    </>
  );
});
