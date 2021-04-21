import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import blue from "@material-ui/core/colors/blue";

import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import img1 from "Assets/hirokoymj-com-desktop.png";
// import img2 from "Assets/img2.png";
import img4 from "Assets/img4.png";

// import damageIcon from "Assets/images/claims-damage.png";
// import reimbursementIcon from "Assets/images/claims-reimbursement.png";
// import ticketsIcon from "Assets/images/claims-tickets.png";

const useStyles = makeStyles((theme) => ({
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
    border: `2px dashed ${blue[500]}`,
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    width: "240px",
    height: "240px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: "10px",
  },
  addIcon: {
    fontSize: "40px",
    color: blue[500],
  },
}));

const ImageTemplate = () => {
  const classes = useStyles();

  return <div className={classes.dropzone} />;
};

export const PhotoView = () => {
  const classes = useStyles();
  const maxCount = 9;
  const photos = [img1];
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
      <div style={{ display: "flex", flexWrap: "wrap" }}>{rows}</div>
    </DashboardLayout>
  );
};
