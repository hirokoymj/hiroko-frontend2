import React from "react";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import LibraryBooksOutlinedIcon from "@material-ui/icons/LibraryBooksOutlined";
import AccountTreeOutlinedIcon from "@material-ui/icons/AccountTreeOutlined";
import ViewAgendaOutlinedIcon from "@material-ui/icons/ViewAgendaOutlined";
import WbSunnyOutlinedIcon from "@material-ui/icons/WbSunnyOutlined";
import PictureAsPdfOutlinedIcon from "@material-ui/icons/PictureAsPdfOutlined";
import PhotoCameraOutlinedIcon from "@material-ui/icons/PhotoCameraOutlined";
import Link from "@material-ui/core/Link";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { makeStyles } from "@material-ui/core/styles";

import { ListItemLink } from "Components/Lists/ListItemLink";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: "rgba(0, 0, 0, 0.8)",
    minWidth: "40px",
  },
  linkText: {
    color: "#000",
    fontSize: "1rem",
  },
}));

export const TechNavItems = ({ setDrawerClosed }) => {
  return (
    <>
      <ListItemLink
        to="/tech"
        text="Tech References"
        icon={<LibraryBooksOutlinedIcon />}
        onClick={setDrawerClosed && setDrawerClosed}
      />
      <ListItemLink
        to="/categoryList"
        text="Category"
        icon={<ViewAgendaOutlinedIcon />}
        onClick={setDrawerClosed && setDrawerClosed}
      />
      <ListItemLink
        to="/subCategoryList"
        text="Sub Category"
        icon={<AccountTreeOutlinedIcon />}
        onClick={setDrawerClosed && setDrawerClosed}
      />
      <ListItemLink
        to="/topicList"
        text="Topic"
        icon={<DescriptionOutlinedIcon />}
        onClick={setDrawerClosed && setDrawerClosed}
      />
    </>
  );
};

export const WeatherListItems = ({ setDrawerClosed }) => {
  return (
    <ListItemLink
      to="/forecast"
      text="Weather Forecast"
      icon={<WbSunnyOutlinedIcon />}
      onClick={setDrawerClosed && setDrawerClosed}
    />
  );
};

export const ResumeListItems = ({ setDrawerClosed }) => {
  const classes = useStyles();

  return (
    <>
      <ListItem button>
        <ListItemIcon classes={{ root: classes.icon }}>
          <PictureAsPdfOutlinedIcon />
        </ListItemIcon>
        <Link
          href="https://www.hirokoymj.com/Resume_HirokoYamaji_JP.pdf"
          target="_blank"
          rel="noopener"
          className={classes.linkText}>
          職務経歴書
        </Link>
      </ListItem>
      <ListItem button>
        <ListItemIcon classes={{ root: classes.icon }}>
          <PictureAsPdfOutlinedIcon />
        </ListItemIcon>
        <Link
          href="https://www.hirokoymj.com/Resume_HirokoYamaji_EN.pdf"
          target="_blank"
          rel="noopener"
          className={classes.linkText}>
          Resume
        </Link>
      </ListItem>
    </>
  );
};

export const PhotoListItems = ({ setDrawerClosed }) => {
  return (
    <ListItemLink
      to="/photo"
      text="Photos in Japan"
      icon={<PhotoCameraOutlinedIcon />}
      onClick={setDrawerClosed && setDrawerClosed}
    />
  );
};
