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
import CloseIcon from "@material-ui/icons/Close";
import { SentimentSatisfiedAltRounded } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  addIcon: {
    fontSize: 40,
    color: "#bdbdbd",
  },
  dropZone: {
    textAlign: "center",
    padding: "20px",
    borderWidth: "2px",
    borderRadius: "2px",
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
  },
  thumbsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
  },
}));

export const ImageDropzone = ({
  file,
  input: { value = [], onChange, onBlur },
}) => {
  const classes = useStyles();
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    maxFiles: 1,
    multiple: false,
    noDragEventsBubbling: false,
    onDrop: async (acceptedFiles) => {
      const newFile = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      onChange(newFile);
    },
  });
  const onDelete = () => {
    onChange("");
  };

  useEffect(() => {
    if (file) {
      onChange(value);
    }
  }, [value]);

  return (
    <section>
      <div
        {...getRootProps({
          className: "dropzone",
        })}
        className={classes.dropZone}>
        <input {...getInputProps()} />
        {value ? (
          value.map((file) => (
            <div key={file.name}>
              <img
                src={file.preview}
                style={{
                  width: "200px",
                  maxWidth: "400px",
                }}
                alt=""
              />
              <CloseIcon style={{ fontSize: "40" }} onClick={onDelete} />
            </div>
          ))
        ) : (
          <AddIcon className={classes.addIcon} />
        )}
      </div>
    </section>
  );
};

export const TestView = reduxForm({
  form: "Photo_Form",
  initialValues: {
    photo1: [
      {
        path: "img2.jpeg",
        preview:
          "blob:http://localhost:3000/fcbf48ef-934f-4ad4-ba94-fdbda87201e5",
        name: "img2.jpeg",
      },
    ],
  },
})(({ handleSubmit, submitting }) => {
  const onSubmit = (values) => {
    console.log(values);
  };

  const file = [
    {
      path: "img2.jpeg",
      preview:
        "blob:http://localhost:3000/fcbf48ef-934f-4ad4-ba94-fdbda87201e5",
      name: "img2.jpeg",
    },
  ];

  return (
    <>
      <Field name="photo1" component={ImageDropzone} />
      <hr />
      <Field name="photo2" component={ImageDropzone} />
      <hr />
      <Field name="photo3" component={ImageDropzone} />
      <button type="submit" onClick={handleSubmit(onSubmit)}>
        Save
      </button>
    </>
  );
});
