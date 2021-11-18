import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import img1 from "Assets/img1.jpg";
import img2 from "Assets/img2.jpg";
import img3 from "Assets/img3.jpg";
import img4 from "Assets/img4.jpg";

const useStyles = makeStyles((theme: Theme) => ({
  thumbnail: {
    width: "240px",
    height: "240px",
    objectFit: "cover",
    borderRadius: "2px",
    margin: "10px",
  },
  dropzone: {
    padding: "20px",
    borderRadius: "2px",
    border: `2px dashed ${theme.palette.primary.main}`,
    backgroundColor: `${theme.palette.background.paper}`,
    color: "#bdbdbd",
    outline: "none",
    width: "240px",
    height: "240px",
    margin: "10px",
  },
}));

const ImageTemplate = () => {
  const classes = useStyles();

  return <div className={classes.dropzone} />;
};

export const PhotoView = () => {
  const classes = useStyles();
  const maxCount = 9;
  const photos = [img1, img2, img3, img4];
  const emptyRows = [];

  const photoRows = photos.map((photo) => {
    return <img src={photo} alt="" className={classes.thumbnail} />;
  });

  for (let i = 0; i < maxCount - photoRows.length; i++) {
    emptyRows.push(<ImageTemplate key={i} />);
  }

  const rows = [...photoRows, ...emptyRows];
  return (
    <DashboardLayout title="Photo Gallery - Japan" maxWidth="md">
      <Grid container justify="center">
        {rows}
      </Grid>
    </DashboardLayout>
  );
};
