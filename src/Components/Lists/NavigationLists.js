import React from "react";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import SettingsEthernetIcon from "@material-ui/icons/SettingsEthernet";

import { ListItemLink } from "Components/Lists/ListItemLink";
import categoryIconImg from "Images/category.png";
import subCatIcon from "Images/sub-category.svg";

const useStyles = makeStyles((theme) => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
  },
  iconImg: {
    width: "25px",
    height: "auto",
    backgroundColor: "transparent !important",
  },
}));

export const ReferenceListItems = () => {
  return (
    <ListItemLink
      to="/"
      text="Tech References"
      icon={<SettingsEthernetIcon />}
      title="Technical References"
    />
  );
};

export const ManagementListItems = () => {
  const classes = useStyles();

  return (
    <>
      <ListItem className={classes.categoryHeader}>
        <ListItemText primary="Management" />
      </ListItem>
      <ListItemLink
        to="/categoryList"
        text="Category"
        imageIcon={categoryIconImg}
        title="Category"
      />
      <ListItemLink
        to="/subCategoryList"
        text="Sub Category"
        imageIcon={subCatIcon}
        title="Sub Category"
      />
      <ListItemLink
        to="/topicList"
        text="Topic"
        icon={<DescriptionOutlinedIcon />}
        title="Topics"
      />
    </>
  );
};
