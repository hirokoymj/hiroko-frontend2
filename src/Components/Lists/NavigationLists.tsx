import React, { useContext } from "react";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import LibraryBooksOutlinedIcon from "@material-ui/icons/LibraryBooksOutlined";
import AccountTreeOutlinedIcon from "@material-ui/icons/AccountTreeOutlined";
import ViewAgendaOutlinedIcon from "@material-ui/icons/ViewAgendaOutlined";
import WbSunnyOutlinedIcon from "@material-ui/icons/WbSunnyOutlined";
import PictureAsPdfOutlinedIcon from "@material-ui/icons/PictureAsPdfOutlined";
import PhotoCameraOutlinedIcon from "@material-ui/icons/PhotoCameraOutlined";
import LocalHospitalOutlinedIcon from "@material-ui/icons/LocalHospitalOutlined";
import Link from "@material-ui/core/Link";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { makeStyles, Theme } from "@material-ui/core/styles";

import { ListItemLink } from "Components/Lists/ListItemLink";
import { AuthContext } from "Context/authContext";

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    color: "rgba(0, 0, 0, 0.8)",
    minWidth: "40px",
  },
  linkText: {
    color: "#000",
    fontSize: "1rem",
  },
}));

export const TechNavItems = () => {
  return (
    <>
      <ListItemLink
        to="/tech"
        text="Tech References"
        icon={<LibraryBooksOutlinedIcon />}
      />
      <ListItemLink
        to="/categoryList"
        text="Category"
        icon={<ViewAgendaOutlinedIcon />}
      />
      <ListItemLink
        to="/subCategoryList"
        text="Sub Category"
        icon={<AccountTreeOutlinedIcon />}
      />
      <ListItemLink
        to="/topicList"
        text="Topic"
        icon={<DescriptionOutlinedIcon />}
      />
    </>
  );
};

export const ResumeListItems = () => {
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

export const WeatherListItems = () => {
  return (
    <ListItemLink
      to="/forecast"
      text="Weather Forecast"
      icon={<WbSunnyOutlinedIcon />}
    />
  );
};

export const PhotoListItems = () => {
  return (
    <ListItemLink
      to="/photo"
      text="Photos in Japan"
      icon={<PhotoCameraOutlinedIcon />}
    />
  );
};

export const CovidListItem = () => {
  return (
    <>
      <ListItemLink
        to="/covid19"
        text="Covid-19"
        icon={<LocalHospitalOutlinedIcon />}
      />
    </>
  );
};

export const LoginListItem = () => {
  console.log("LoginListItem");
  const { user, logout } = useContext(AuthContext);
  console.log(user);

  return (
    <>
      <ListItemLink
        to="/register"
        text="Register"
        icon={<LocalHospitalOutlinedIcon />}
      />
      {user ? (
        <button onClick={() => logout()}>Logout</button>
      ) : (
        <ListItemLink
          to="/login"
          text="Login"
          icon={<LocalHospitalOutlinedIcon />}
        />
      )}
    </>
  );
};
